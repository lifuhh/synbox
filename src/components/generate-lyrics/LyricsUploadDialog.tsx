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
import GenerateLyricsButton from './GenerateLyricsButton'
import GeneratedResultsDisplay from './GeneratedResultsDisplay'

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

  const firstApiCall = async () => {}
  const secondApiCall = async (firstResult: any) => {}
  const thirdApiCall = async (secondResult: any) => {}

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
        setGeneratedLyrics(lyrics)
      }
      updateProgressStep()
      // Make the second API call using the result from the first call
      const romaji = await secondApiCall(lyrics)
      if (romaji) {
        setHasGeneratedRomaji(true)
        setGeneratedRomaji(romaji)
      }
      updateProgressStep()
      // Make the third API call using the result from the second call
      const translationEN = await thirdApiCall(lyrics)
      if (translationEN) {
        setHasGeneratedTranslationsEN(true)
        setGeneratedTranslationsEN(translationEN)
      }

      const translationCH = await thirdApiCall(lyrics)
      if (translationCH) {
        setHasGeneratedTranslationsCH(true)
        setGeneratedTranslationsCH(translationCH)
      }
      updateProgressStep()
    } catch (err) {
      setError('An error occurred while processing your request')
    } finally {
      setIsLoading(false)
    }
  }

  if (lyricsGenerationStep === 0) {
    currentMainComponent = (
      <GenerateLyricsButton handleButtonClick={handleButtonClick} />
    )
  } else if (lyricsGenerationStep === 1) {
    currentMainComponent = (
      <GeneratedResultsDisplay
        hasGeneratedLyrics={hasGeneratedLyrics}
        hasGeneratedRomaji={hasGeneratedRomaji}
        hasGeneratedTranslationsEN={hasGeneratedTranslationsEN}
        hasGeneratedTranslationsCH={hasGeneratedTranslationsCH}
        generatedLyrics={generatedLyrics}
        generatedRomaji={generatedRomaji}
        generatedTranslationsEN={generatedTranslationsEN}
        generatedTranslationsCH={generatedTranslationsCH}
      />
    )
    currentProgress = 'Generating Lyrics...'
  } else if (lyricsGenerationStep === 2) {
    currentMainComponent = <h1>Stage {lyricsGenerationStep}</h1>

    currentProgress = 'Generating romaji...'
  } else if (lyricsGenerationStep === 3) {
    currentMainComponent = <h1>Stage {lyricsGenerationStep}</h1>

    currentProgress = 'Generating Translations...'
  }

  return (
    <>
      <DialogContent className='h-2/3 sm:max-w-[700px] '>
        <DialogHeader>
          <DialogTitle >
            <Stepper
              active={lyricsGenerationStep}
              onStepClick={setLyricsGenerationStep}
              allowNextStepsSelect={false}
              color='pink'>
              <Stepper.Step label='Start' description='Lyrics'>
                Click the button to let us work the magic!
              </Stepper.Step>
              <Stepper.Step label='Generating' description='Translations'>
                Step 1: Generating Lyrics and Timestamps
              </Stepper.Step>
              <Stepper.Step label='Step 2' description='Uploading to Database'>
                Step 3: Generate and create translations
              </Stepper.Step>
              <Stepper.Completed>
                Completed! Close the dialog and enjoy!
                {/* DISPLAY SUCCESS UPLOAD / FAILED UPLOAD INFO */}
              </Stepper.Completed>
            </Stepper>
          </DialogTitle>
          <DialogDescription>{headerDescription}</DialogDescription>
        </DialogHeader>
        {currentMainComponent}
        <DialogFooter>
          <div className='flex flex-between flex-col align-middle'>
            {currentProgress}
          </div>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
export default LyricsUploadDialog
