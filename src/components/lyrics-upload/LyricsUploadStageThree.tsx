import { formatLyricsLineSrt, stageThreeKanjiPairExtractor } from '@/utils'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import LyricTextLine from '../lyrics-display/LyricTextLine'

interface LyricsUploadStageThreeProps {
  stageTwoLyrics: { [key: string]: string }
}

const LyricsUploadStageThree: React.FC<LyricsUploadStageThreeProps> = ({
  stageTwoLyrics,
}) => {
  const form = useForm()

  const [parsedStageThreeLyrics, setParsedStageThreeLyrics] = useState<
    string[]
  >([])

  const [allKanjiPairs, setAllKanjiPairs] = useState<{
    [key: string]: [string, string, number]
  }>({})

  useEffect(() => {
    if (!stageTwoLyrics) return

    const size: number = Object.keys(stageTwoLyrics).length / 2
    const allParsedLyrics: string[] = []

    for (let i = 0; i < size; i++) {
      const parsedLyrics = formatLyricsLineSrt(
        stageTwoLyrics[`A-${i}`],
        stageTwoLyrics[`B-${i}`]
      )
      allParsedLyrics.push(parsedLyrics)
    }

    setParsedStageThreeLyrics(allParsedLyrics)
    const processedKanjiLabels = stageThreeKanjiPairExtractor(allParsedLyrics)
    setAllKanjiPairs(processedKanjiLabels)
  }, [stageTwoLyrics])

  const handleChange = () => {
    // console.log('This is a change')
  }

  return (
    <Form {...form}>
      <form className='space-y-8 max-h-80 overflow-auto border-2 border-blue-600'>
        {allKanjiPairs &&
          Object.keys(allKanjiPairs).map((key) => {
            const [kanji, romaji, index] = allKanjiPairs[key]

            return (
              <>
                <FormItem key={'p3a' + key}>
                  <FormLabel>
                    {index}: {kanji}
                  </FormLabel>
                  <FormControl>
                    <div key={'p3b' + key} className='w-full bg-amber-300'>
                      <Input value={romaji} onChange={handleChange} />
                    </div>
                  </FormControl>
                </FormItem>
                <div key={'p3c' + key}>
                  <LyricTextLine
                    className='text-2vw'
                    htmlContent={parsedStageThreeLyrics[index]}
                  />
                </div>
              </>
            )
          })}
      </form>
    </Form>
  )
}
export default LyricsUploadStageThree
