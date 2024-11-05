import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { dialogStepAtom } from '@/context/atoms'
import { useGetLyricsBySongId } from '@/lib/react-query/queriesAndMutations'
import { YouTubeUrlOrIdValidation } from '@/lib/validation'
import { extractVideoId } from '@/utils'
import { useSetAtom } from 'jotai'
import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RequestDialog from '../shared/RequestDialog'
import { Spotlight } from '../ui/Spotlight'
import { Dialog, DialogTrigger } from '../ui/dialog'

interface HeroGenerateLyricsDefaultProps {
  setProcessingStage: (stage: number) => void
  setInputVideoId: (videoId: string) => void
  inputVideoId: string
}

const HeroGenerateLyricsDefault = ({
  setInputVideoId,
  inputVideoId,
}: HeroGenerateLyricsDefaultProps) => {
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [validationSuccess, setValidationSuccess] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const setDialogStepAtom = useSetAtom(dialogStepAtom)
  const navigate = useNavigate()
  const previousInputRef = useRef<string | null>(null)

  // Use useMemo to derive extractedVideoId to prevent unnecessary recalculations
  const extractedVideoId = useMemo(() => {
    if (!inputValue) return ''

    const result = YouTubeUrlOrIdValidation.safeParse(inputValue)
    if (!result.success) return ''

    return extractVideoId(inputValue) || ''
  }, [inputValue])

  // Only fetch lyrics when we have a valid video ID
  const { data: existingLyrics, isLoading: isCheckingLyrics } =
    useGetLyricsBySongId(validationSuccess ? extractedVideoId : '')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    if (!value) {
      setErrorMessage('')
      setValidationSuccess(false)
      return
    }

    const result = YouTubeUrlOrIdValidation.safeParse(value)
    if (!result.success) {
      setErrorMessage(
        result.error.errors.map((error) => error.message).join(', '),
      )
      setValidationSuccess(false)
    } else {
      const vidId = extractVideoId(value)
      if (vidId) {
        setValidationSuccess(true)
        setErrorMessage('')
      } else {
        setErrorMessage('Invalid URL')
        setValidationSuccess(false)
      }
    }
  }

  const handleOpenLandingPageDialog = () => {
    if (validationSuccess && extractedVideoId) {
      if (previousInputRef.current !== inputValue) {
        setDialogOpen(false)
        setTimeout(() => {
          setInputVideoId(extractedVideoId)
          if (existingLyrics) {
            navigate(`/v/${extractedVideoId}`, {
              state: { videoId: extractedVideoId },
            })
          } else {
            setDialogStepAtom(0)
            setDialogOpen(true)
          }
        }, 0)
      } else {
        setInputVideoId(extractedVideoId)
        if (existingLyrics) {
          navigate(`/v/${extractedVideoId}`, {
            state: { videoId: extractedVideoId },
          })
        } else {
          setDialogStepAtom(0)
          setDialogOpen(true)
        }
      }
      previousInputRef.current = inputValue
    }
  }

  const handleDialogClose = () => {
    if (dialogOpen) setDialogOpen(false)
  }

  return (
    <div className='items-top bg-grid-white/[0.90] relative flex w-full overflow-hidden rounded-md bg-dark-1/[0.15] pt-10 antialiased md:h-[25rem] md:justify-center'>
      <Spotlight
        className='-top-8 left-10 md:-top-20 md:left-60'
        fill='#ff8ab9'
      />

      <div className='flex-between xl:flex-around z-10 mx-auto w-full max-w-7xl flex-col gap-4 p-4 lg:gap-0 xl:h-96'>
        <h1 className='no-select bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text pb-2 text-center text-4xl font-bold text-transparent md:text-6xl lg:text-7xl'>
          AI-Powered Japanese Karaoke
        </h1>
        <div className='flex-between relative flex w-full flex-col gap-4 overflow-visible sm:mx-auto sm:w-4/5 md:flex-row'>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Paste YouTube URL here'
            className={`invisible-ring border-2 py-6 ${
              inputValue.length > 0
                ? validationSuccess
                  ? 'border-green-500 hover:border-green-500 focus:border-green-500'
                  : 'border-primary hover:border-red-700 focus:border-red-700'
                : 'border-white hover:border-white focus:border-white'
            } `}
          />
          <div className='absolute -bottom-20 left-0 h-20 w-full pt-2 text-left'>
            {inputValue.length > 0 && (
              <div className={errorMessage ? 'text-red-500' : 'text-green-500'}>
                {errorMessage
                  ? errorMessage
                  : isCheckingLyrics
                    ? 'Valid URL - Searching for lyrics...'
                    : existingLyrics
                      ? 'Lyrics & translations found!'
                      : validationSuccess
                        ? 'Valid YouTube URL'
                        : ''}
              </div>
            )}
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={
                  inputValue?.length > 0
                    ? handleOpenLandingPageDialog
                    : () => {}
                }
                disabled={
                  inputValue?.length == 0 ||
                  (errorMessage && errorMessage != ''
                    ? true
                    : false || isCheckingLyrics)
                }
                variant='default'
                role='combobox'
                className='w-1/3 border-2 border-primary/40 py-6 md:w-4/12 lg:w-1/4'>
                {isCheckingLyrics
                  ? 'Searching...'
                  : existingLyrics
                    ? 'Watch Now'
                    : 'Try Now'}
              </Button>
            </DialogTrigger>
            <RequestDialog
              videoId={inputVideoId}
              handleClose={handleDialogClose}
            />
          </Dialog>
        </div>

        <p className='lg:w-7/10 no-select mx-auto mt-4 text-center text-base font-normal text-neutral-300 lg:mt-0'>
          Transform YouTube videos into your personalized Japanese karaoke
          stage, with AI-transcribed, accurately synced lyrics and translations.
        </p>
      </div>
    </div>
  )
}

export default HeroGenerateLyricsDefault
