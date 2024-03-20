//! THIS FILE IS TO BE DELETED

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { UploadedSrtLine } from '@/types'
import { Button, Stepper } from '@mantine/core'
import { useState } from 'react'

//* This component should manage the state and decide what to display
const LyricsUploadDialog = () => {
  const [lyricsGenerationStep, setLyricsGenerationStep] = useState<number>(0)
  const [hasGeneratedLyrics, setHasGeneratedLyrics] = useState<boolean>(false)
  const [hasGeneratedRomaji, setHasGeneratedRomaji] = useState<boolean>(false)
  const [hasGeneratedTranslationsEN, setHasGeneratedTranslationsEN] =
    useState<boolean>(false)
  const [hasGeneratedTranslationsCH, setHasGeneratedTranslationsCH] =
    useState<boolean>(false)

  const [generatedLyrics, setGeneratedLyrics] = useState<UploadedSrtLine[]>([])
  const [generatedRomaji, setGeneratedRomaji] = useState<string[]>([])
  const [generatedTranslationsEN, setGeneratedTranslationsEN] = useState<
    string[]
  >([])
  const [generatedTranslationsCH, setGeneratedTranslationsCH] = useState<
    string[]
  >([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  async function firstApiCall(): Promise<string> {
    // Do some asynchronous operation to get the lyrics
    const lyrics = 'some lyrics'
    return lyrics
  }
  const secondApiCall = async (firstResult: any) => {
    const lyrics = 'some lyrics'
    return lyrics
  }
  const thirdApiCall = async (secondResult: any) => {
    const lyrics = 'some lyrics'
    return lyrics
  }

  const updateProgressStep = () =>
    setLyricsGenerationStep((current) => (current < 3 ? current + 1 : current))

  const videoId = 'gNieKej1GAM'

  const headerDescription = 'Estimated time: 5 minutes'

  let currentMainComponent, currentProgress

  const handleButtonClick = async () => {
    //TODO: After every API call is fulfilled, do handleNextStep()
    //TODO: then display the output for the user
    try {
      setIsLoading(true)
      setError(null)

      // Make the first API call
      const lyrics = await firstApiCall()
      if (lyrics) {
        setHasGeneratedLyrics(true)
        // setGeneratedLyrics(lyrics)
      }
      updateProgressStep()
      // Make the second API call using the result from the first call
      const romaji = await secondApiCall(lyrics)
      if (romaji) {
        setHasGeneratedRomaji(true)
        // setGeneratedRomaji(romaji)
      }
      updateProgressStep()
      // Make the third API call using the result from the second call
      const translationEN = await thirdApiCall(lyrics)
      if (translationEN) {
        setHasGeneratedTranslationsEN(true)
        // setGeneratedTranslationsEN(translationEN)
      }

      const translationCH = await thirdApiCall(lyrics)
      if (translationCH) {
        setHasGeneratedTranslationsCH(true)
        // setGeneratedTranslationsCH(translationCH)
      }
      updateProgressStep()
    } catch (err) {
      setError('An error occurred while processing your request')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DialogContent className='h-2/3 sm:max-w-[40em] '>
        <DialogHeader>
          <DialogTitle>Placeholder Title</DialogTitle>
          <DialogDescription>{headerDescription}</DialogDescription>
        </DialogHeader>
        <div>Placeholder Content</div>
        <DialogFooter>
          <div className='flex flex-between flex-col align-middle'>
            Placeholder Footer
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
export default LyricsUploadDialog
