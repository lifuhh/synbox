import { UploadedSrtLine } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { useEffect, useState } from 'react'

const formSchema = z.object({
  lyrics: z
    .string()
    .min(1)
    .max(50, { message: 'Lyrics must be between 1 and 50 characters' }),
  romaji: z.string().min(1).max(50),
})
interface LyricsUploadStageTwoProps {
  mainParsedSrt: UploadedSrtLine[]
  mainParsedRomaji: string[]
  setStageTwoLyrics: (stageTwoLyrics: { [key: string]: string }) => void
}

const LyricsUploadStageTwo: React.FC<LyricsUploadStageTwoProps> = ({
  mainParsedSrt,
  mainParsedRomaji,
  setStageTwoLyrics,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const [currentStageTwoLyrics, setCurrentStageTwoLyrics] = useState(() => {
    const initialFormData: { [key: string]: string } = {}
    if (!mainParsedSrt || !mainParsedRomaji) return initialFormData

    if (mainParsedSrt.length === 0 || mainParsedRomaji.length === 0)
      return initialFormData

    mainParsedSrt.forEach((srtChunk, index) => {
      initialFormData[`A-${index}`] = srtChunk.text

      if (index > mainParsedRomaji.length - 1) {
        initialFormData[`B-${index}`] = ''
      } else {
        initialFormData[`B-${index}`] = mainParsedRomaji[index]
      }
    })
    return initialFormData
  })

  useEffect(() => {
    setStageTwoLyrics(currentStageTwoLyrics)
  }, [currentStageTwoLyrics, setStageTwoLyrics])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setCurrentStageTwoLyrics({
      ...currentStageTwoLyrics,
      [key]: e.target.value,
    })

    setStageTwoLyrics({ ...currentStageTwoLyrics, [key]: e.target.value })
  }

  // const handleSubmit = () => {
  // Process formData to update arrayA and arrayB
  // Save the updated arrays

  // console.log(currentStageTwoLyrics)
  // }

  return (
    <Form {...form}>
      <form
        // onSubmit={handleSubmit}
        className='space-y-8 max-h-80 overflow-auto border-2 border-slate-800'>
        {mainParsedSrt &&
          mainParsedSrt.map((srtChunk, index) => {
            return (
              <FormItem key={'p2a' + index}>
                <FormLabel>Lyric Line {index + 1}</FormLabel>
                <FormControl>
                  <div key={'p2b' + index}>
                    <Input
                      value={currentStageTwoLyrics[`A-${index}`]}
                      onChange={(e) => handleChange(e, `A-${index}`)}
                    />
                    <Input
                      value={currentStageTwoLyrics[`B-${index}`]}
                      onChange={(e) => handleChange(e, `B-${index}`)}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )
          })}
      </form>
    </Form>
  )
}
export default LyricsUploadStageTwo
