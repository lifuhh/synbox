import LyricTextLine from '@/components/lyrics-display/LyricTextLine'
import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/AppContext'
import { useEffect, useMemo, useState } from 'react'
import srtParser2 from 'srt-parser-2'

// 優しい彗星

interface LyricsDisplayProps {
  romajiVisibility: boolean
  translationVisibility: boolean
}
interface LyricsLineType {
  id: string
  startTime: string
  startSeconds: number
  endTime: string
  endSeconds: number
  text: string
}

const LyricsTestPage: React.FC<LyricsDisplayProps> = ({
  romajiVisibility: romajiVisibility,
  translationVisibility: translationVisibility,
}) => {
  const { playerControlsVisible, bottomBarHeight } = useAppContext()
  const [index, setIndex] = useState<number>(6)
  const [lyricsArr, setLyricsArr] = useState<LyricsLineType[]>([])
  const [lyricsArrEng, setLyricsArrEng] = useState<string[]>([])
  const [lyricsArrRomaji, setLyricsArrRomaji] = useState<string[]>([])

  const getOverlayHeight = useMemo(() => {
    return playerControlsVisible ? `calc(100% - ${bottomBarHeight}px)` : '100%'
  }, [playerControlsVisible, bottomBarHeight])

  useEffect(() => {
    const fetchSrt = async () => {
      const response = await fetch(
        '/src/components/generate-lyrics/test_data/yss_orig.srt',
      )
      const srtText = await response.text()
      const srtParser = new srtParser2()
      const parsedLyrics = srtParser.fromSrt(srtText)
      setLyricsArr(parsedLyrics)

      const responseEng = await fetch(
        '/src/components/generate-lyrics/test_data/yss_eng.txt',
      )
      const engText = await responseEng.text()
      const engLines = engText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
      setLyricsArrEng(engLines)

      const responseRomaji = await fetch(
        '/src/components/generate-lyrics/test_data/yss_romaji.txt',
      )
      const romajiText = await responseRomaji.text()
      const romajiLines = romajiText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
      setLyricsArrRomaji(romajiLines)
    }

    fetchSrt()
  }, [])

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const handleNext = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, lyricsArr.length - 1))
  }

  // const engLyricsTest = 'Now, in the quiet night'
  // const chiLyricsTest = '现在，在宁静的夜晚里'
  // const jpLyricsTest =
  // '<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>、<ruby>静<rp>(</rp><rt>しず</rt><rp>)</rp></ruby>かな<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で'
  // const romajiLyricsTest = 'Ima Shizukana yoru no nakade'

  return (
    <section
      className='flex flex-1 flex-col items-center justify-end'
      style={{ height: getOverlayHeight }}>
      {/* //! Japanese Lyrics & Romaji */}
      <LyricTextLine
        htmlContent={lyricsArr ? lyricsArr[index]?.text : ''}
        // romajiContent={lyricsArr ? lyricsArrRomaji[index] : ''}
        className='font_noto_sans_jp_reg font-outline-1 text-3.5vw'
      />

      {/* //! Translation Toggle-able */}
      <LyricTextLine
        htmlContent={lyricsArr ? lyricsArrEng[index] : ''}
        className='font_noto_sans_jp_reg font-outline-1 my-2 text-2.4vw'
      />

      {/* Dummy buttons to navigate lyrics */}
      <div className='my-4 flex space-x-4'>
        <Button
          onClick={handlePrev}
          className='rounded bg-blue-500 px-4 py-2 text-white'>
          {'<<'}
        </Button>
        <Button
          onClick={handleNext}
          className='rounded bg-blue-500 px-4 py-2 text-white'>
          {'>>'}
        </Button>
      </div>
    </section>
  )
}
export default LyricsTestPage
