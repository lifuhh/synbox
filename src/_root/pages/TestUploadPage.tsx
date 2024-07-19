import { useUploadHardCodedLyrics } from '@/lib/react-query/queriesAndMutations'
import { Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import srtParser2 from 'srt-parser-2'

interface HardCodedLyricsData {
  full_lyrics: string
  plain_lyrics: string
  romaji: string
  eng_translation: string
  chi_translation: string
  labelled_full_lyrics: string
}

const TestUploadPage = () => {
  const { mutate: uploadHardCodedLyrics } = useUploadHardCodedLyrics()

  const [data, setData] = useState<HardCodedLyricsData>({
    full_lyrics: '',
    plain_lyrics: '',
    romaji: '',
    eng_translation: '',
    chi_translation: '',
  })

  const convertToRuby = (annotatedLine) => {
    return annotatedLine.replace(
      /([一-龯々]+)\[([^\]]+)\]/g,
      (match, kanji, reading) => {
        return `<ruby>${kanji}<rp>(</rp><rt>${reading}</rt><rp>)</rp></ruby>`
      },
    )
  }

  const id = '4DxL6IKmXx4'

  useEffect(() => {
    const fetchSrt = async () => {
      const response = await fetch(
        '/src/components/generate-lyrics/test_data/to_upload/orig.srt',
      )
      const srtText = await response.text()
      const srtParser = new srtParser2()
      const parsedLyrics = srtParser.fromSrt(srtText)
      const parsedPlainLyrics = parsedLyrics.map((item) => item.text)

      const responseEng = await fetch(
        '/src/components/generate-lyrics/test_data/to_upload/eng.txt',
      )
      const engText = await responseEng.text()
      const engLines = engText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      const responseChi = await fetch(
        '/src/components/generate-lyrics/test_data/to_upload/chi.txt',
      )
      const chiText = await responseChi.text()
      const chiLines = chiText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      const responseRomaji = await fetch(
        '/src/components/generate-lyrics/test_data/to_upload/romaji.txt',
      )
      const romajiText = await responseRomaji.text()
      const romajiLines = romajiText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      //* Kanji Processing Section
      const kanjiAnno = await fetch(
        '/src/components/generate-lyrics/test_data/to_upload/kanji.txt',
      )
      const kanjiAnnoText = await kanjiAnno.text()
      let labelledLyrics = []

      if (kanjiAnnoText.trim().length > 0) {
        const kanjiAnnoLines = kanjiAnnoText
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)

        const annotationsObject = {}
        kanjiAnnoLines.forEach((line, index) => {
          // Use the original line as the value
          annotationsObject[parsedPlainLyrics[index]] = line
        })

        labelledLyrics = parsedLyrics.map((item) => ({
          ...item,
          text: convertToRuby(annotationsObject[item.text] || item.text),
        }))
      } else {
        labelledLyrics = [] // Set to an empty string if the file is empty
      }

      // const kanjiAnnoLines = kanjiAnnoText
      //   .split('\n')
      //   .map((line) => line.trim())
      //   .filter((line) => line.length > 0)

      // const annotationsObject: { [key: string]: string } = {}
      // kanjiAnnoLines.forEach((line, index) => {
      //   // Use the original line as the value
      //   annotationsObject[parsedPlainLyrics[index]] = line
      // })

      // const labelledLyrics = parsedLyrics.map((item) => ({
      //   ...item,
      //   text: convertToRuby(annotationsObject[item.text] || item.text),
      // }))

      // console.log(labelledLyrics)

      setData({
        ...data,
        plain_lyrics: JSON.stringify(parsedPlainLyrics),
        romaji: JSON.stringify(romajiLines),
        full_lyrics: JSON.stringify(parsedLyrics),
        eng_translation: JSON.stringify(engLines),
        chi_translation: JSON.stringify(chiLines),
        labelled_full_lyrics: JSON.stringify(labelledLyrics),
      })
    }

    fetchSrt()
  })

  const testPageUploader = (e: React.MouseEvent) => {
    e.preventDefault()
    uploadHardCodedLyrics({ songId: id, lyricsData: data })
  }

  return (
    <div className='flex-between mx-auto my-auto flex flex-col'>
      <div className='flex w-full justify-center gap-10'>
        <Button variant='outline' onClick={testPageUploader}>
          Upload
        </Button>
      </div>
    </div>
  )
}
export default TestUploadPage
