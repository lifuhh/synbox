import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { dialogStepAtom } from '@/context/atoms'
import { useGetLyricsBySongId } from '@/lib/react-query/queriesAndMutations'
import { YouTubeUrlOrIdValidation } from '@/lib/validation'
import { extractVideoId } from '@/utils'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import InfoIcon from '@mui/icons-material/Info'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useSetAtom } from 'jotai'
import { Info } from 'lucide-react'
import { useMemo, useState } from 'react'
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
  const [dialogKey, setDialogKey] = useState(0)
  const setDialogStepAtom = useSetAtom(dialogStepAtom)
  const navigate = useNavigate()

  // Remove previousInputRef as it's causing issues with dialog reopening

  const extractedVideoId = useMemo(() => {
    if (!inputValue) return ''

    const result = YouTubeUrlOrIdValidation.safeParse(inputValue)
    if (!result.success) return ''

    const id = extractVideoId(inputValue)
    return id || ''
  }, [inputValue])

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
      setInputVideoId(extractedVideoId)

      if (existingLyrics) {
        navigate(`/v/${extractedVideoId}`, {
          state: { videoId: extractedVideoId },
        })
      } else {
        setDialogStepAtom(0)
        setDialogOpen(false)
        // Increment the key to force dialog recreation
        setDialogKey((prev) => prev + 1)
        requestAnimationFrame(() => {
          setDialogOpen(true)
        })
      }
    }
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
    setDialogStepAtom(0)
  }

  return (
    <div className='items-top bg-grid-white/[0.90] bg-dark-1/[0.15] relative flex w-full overflow-hidden rounded-md pt-10 antialiased md:h-[25rem] md:justify-center'>
      <Spotlight
        className='-top-8 left-10 md:-top-20 md:left-60'
        fill='#580a24'
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
            className={`invisible-ring border-2 bg-input/40 py-6 text-white ${
              inputValue.length > 0
                ? validationSuccess
                  ? 'border-green-500 hover:border-foreground focus:border-green-500'
                  : 'border-red-800 hover:border-foreground focus:border-red-800'
                : 'border-foreground/60 hover:border-foreground/80 focus:border-foreground/90'
            } `}
          />
          <div className='absolute -bottom-20 left-0 h-20 w-full py-6 pt-2 text-center md:text-left lg:py-2'>
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
                onClick={(e) => {
                  if (inputValue?.length === 0) {
                    e.preventDefault()
                    return
                  }
                  handleOpenLandingPageDialog()
                }}
                disabled={
                  errorMessage && errorMessage != ''
                    ? true
                    : false || isCheckingLyrics
                }
                variant='default'
                // role='combobox'
                className='w-full gap-2 border-2 border-primary/90 bg-primary/90 py-6 text-foreground hover:border-primary hover:bg-primary md:w-1/2 lg:w-1/4'>
                {isCheckingLyrics ? (
                  <p className='text-[16px]'>Searching ...</p>
                ) : existingLyrics ? (
                  <p className='text-[16px]'>Play Video</p>
                ) : (
                  <p className='text-[16px]'>Try Now</p>
                )}
                {isCheckingLyrics ? (
                  ''
                ) : existingLyrics ? (
                  <PlayArrowIcon className='h-2 w-2' />
                ) : (
                  <ArrowForwardIcon className='h-2 w-2' />
                )}
              </Button>
            </DialogTrigger>
            <RequestDialog
              key={dialogKey}
              videoId={inputVideoId}
              handleClose={handleDialogClose}
            />
          </Dialog>
        </div>

        <div className='flex items-center justify-center gap-2'>
          <p className='lg:w-7/10 no-select mx-auto mt-4 text-center text-base font-normal text-neutral-300 lg:mt-0'>
            Transform YouTube videos into your personalized Japanese karaoke
            stage, with AI-transcribed, accurately synced lyrics and
            translations
          </p>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className='rounded-full'>
                  <Info className='h-4 w-4 text-neutral-300' />
                </button>
              </TooltipTrigger>
              <TooltipContent
                className=''
                side='bottom'
                sideOffset={10}
                align='end'>
                <p className='text-pretty text-center'>
                  While AI strives for accuracy, occasional discrepancies in
                  transcription or syncing may occur.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

export default HeroGenerateLyricsDefault
