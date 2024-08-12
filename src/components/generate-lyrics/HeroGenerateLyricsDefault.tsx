import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setStreamResultAtom, streamResultAtom } from '@/context/atoms'
import { useStreamValidateVideoById } from '@/lib/react-query/queriesAndMutations'
import { YouTubeUrlOrIdValidation } from '@/lib/validation'
import { extractVideoId } from '@/utils'
import { useDisclosure } from '@mantine/hooks'
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react'
import { useEffect, useState } from 'react'
import RequestDialog from '../shared/RequestDialog'
import { Spotlight } from '../ui/Spotlight'
import { Dialog, DialogTrigger } from '../ui/dialog'

interface HeroGenerateLyricsDefaultProps {
  setProcessingStage: (stage: number) => void
  setInputVideoId: (videoId: string) => void
  inputVideoId: string
}

const HeroGenerateLyricsDefault = ({
  setProcessingStage,
  setInputVideoId,
  inputVideoId,
}: HeroGenerateLyricsDefaultProps) => {
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [validationSuccess, setValidationSuccess] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [loaderVisible, loaderVisibilityHandler] = useDisclosure(false)

  const {
    mutate,
    data: streamData,
    variables: streamVariables,
    isPending: isPendingStream,
    isError: isErrorStream,
    error: streamErrorMsg,
  } = useStreamValidateVideoById()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setValidationSuccess(false) // Reset validation success on new input
    if (value === '') {
      // Clear error message when input is empty
      setErrorMessage('')
      return
    }

    // Validate the input
    const result = YouTubeUrlOrIdValidation.safeParse(value)
    if (!result.success) {
      // If validation fails, display the error message
      setErrorMessage(
        result.error.errors.map((error) => error.message).join(', '),
      )
    } else {
      const extractedVidId = extractVideoId(value)
      if (extractedVidId) {
        setValidationSuccess(true)
        setErrorMessage('')
        setInputVideoId(extractedVidId)
      } else {
        setErrorMessage('Unable to extract a valid video ID')
      }
    }
  }

  const handleSubmit = () => {
    if (validationSuccess) {
      setDialogOpen(true)
      mutate(inputVideoId)
    }
  }

  const streamResult = useAtomValue(streamResultAtom)
  const setStreamResult = useSetAtom(setStreamResultAtom)

  useEffect(() => {
    if (streamData && streamVariables) {
      const id = streamVariables
      const result = { id, streamData }

      console.log('This is result', result)

      // Update the atom state
      setStreamResult(result)
    }
  }, [streamData, streamVariables, setStreamResult])

  return (
    <div className='items-top bg-grid-white/[0.90] relative flex w-full overflow-hidden rounded-md bg-dark-1/[0.15] pt-10 antialiased md:h-[25rem]  md:justify-center'>
      <Spotlight className='-top-8 left-10 md:-top-20 md:left-60' fill='pink' />

      <div className='flex-between xl:flex-around z-10 mx-auto w-full max-w-7xl flex-col gap-4 p-4 lg:gap-0 xl:h-96'>
        <h1 className='no-select bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text pb-2 text-center text-4xl font-bold text-transparent md:text-6xl lg:text-7xl'>
          AI-Powered Japanese Karaoke
          {/* Placeholder */}
        </h1>
        <div className='flex-between relative flex w-full flex-col gap-4 overflow-visible sm:mx-auto sm:w-4/5 md:flex-row'>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Paste YouTube URL here'
            // border-2 border-primary-500/40 hover:border-primary-500/90
            // focus:ring-0 focus:ring-violet-300
            // focus:outline-none focus:ring-0 focus:ring-teal-300
            className={`py-6 focus:ring-transparent ${
              inputValue.length > 0
                ? validationSuccess
                  ? 'hover:border-green-500'
                  : 'hover:border-red-700'
                : 'hover:border-secondary'
            }  border-2 border-white ${
              inputValue.length > 0
                ? validationSuccess
                  ? 'focus:border-green-500'
                  : 'focus:border-red-700'
                : 'focus:border-secondary'
            } `}
          />
          <div className='absolute -bottom-20 left-0 h-20 w-full pt-2'>
            {errorMessage && inputValue?.length > 0 && (
              <div className='text-red-500'>{errorMessage}</div>
            )}
            {validationSuccess && !errorMessage && (
              <div className='text-green-500'>URL is valid!</div>
            )}
          </div>
          <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={inputValue?.length > 0 ? handleSubmit : () => {}}
                disabled={errorMessage && errorMessage != '' ? true : false}
                variant='default'
                role='combobox'
                className='w-1/3 border-2 border-primary-500/40 py-6 hover:border-primary-500/90 hover:bg-gray-200/20 md:w-4/12 lg:w-1/4'>
                Try Now!
              </Button>
            </DialogTrigger>
            <RequestDialog
              videoId={inputVideoId}
              setDialogOpen={setDialogOpen}
              loaderVisible={loaderVisible}
              loaderVisibilityHandler={loaderVisibilityHandler}
            />
          </Dialog>
        </div>

        {/* Display error message or success message */}

        <p className='lg:w-7/10 no-select mx-auto mt-4 text-center text-base font-normal text-neutral-300'>
          Transform YouTube videos into your personalized Japanese karaoke
          stage, with AI-generated, accurately synced lyrics and translations
        </p>
      </div>
    </div>
  )
}
export default HeroGenerateLyricsDefault
