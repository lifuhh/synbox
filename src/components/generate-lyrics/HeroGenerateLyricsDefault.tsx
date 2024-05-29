import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { YouTubeUrlValidation } from '@/lib/validation'
import { extractVideoId } from '@/utils'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import { Spotlight } from '../ui/Spotlight'

interface HeroGenerateLyricsDefaultProps {
  setProcessingStage: (stage: number) => void
  setInputVideoId: (videoId: string) => void
}

const HeroGenerateLyricsDefault = ({
  setProcessingStage,
  setInputVideoId,
}: HeroGenerateLyricsDefaultProps) => {
  const [inputValue, setInputValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [validationSuccess, setValidationSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setErrorMessage('') // Reset error message on new input
    setValidationSuccess(false) // Reset validation success on new input

    // Validate the input
    const result = YouTubeUrlValidation.safeParse(value)
    if (!result.success) {
      // If validation fails, display the error message
      setErrorMessage(
        result.error.errors.map((error) => error.message).join(', '),
      )
    } else {
      console.log('Video ID Acquired: ' + extractVideoId(value))
      // If validation succeeds, set success state
      setValidationSuccess(true)
    }
  }

  const handleSubmit = () => {
    if (validationSuccess) {
      // If the URL is valid, you can proceed with your logic here
      // For example, fetching the lyrics or any other action
      const extractedVidId = extractVideoId(inputValue)
      if (extractedVidId) {
        setInputVideoId(extractedVidId)
        console.log('Valid YouTube URL:', extractedVidId)
      }
      setProcessingStage(1)
    } else {
      // If the submit button is clicked without a valid URL, show an error
      setErrorMessage('Please enter a valid YouTube URL before submitting.')
    }
  }

  return (
    <div className='items-top bg-grid-white/[0.90] relative flex w-full overflow-hidden rounded-md bg-dark-1/[0.15] pt-10 antialiased md:h-[25rem]  md:justify-center'>
      <Spotlight className='-top-8 left-10 md:-top-20 md:left-60' fill='pink' />

      <div className='flex-between xl:flex-around z-10 mx-auto w-full max-w-7xl flex-col gap-4 p-4 lg:gap-0 xl:h-96'>
        <h1 className='no-select bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text pb-2 text-center text-4xl font-bold text-transparent md:text-6xl lg:text-7xl'>
          AI-Powered Japanese Karaoke
          {/* Placeholder */}
        </h1>
        <div className='flex-between relative w-full gap-4 overflow-visible sm:mx-auto sm:w-4/5'>
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
          <Button
            onClick={
              validationSuccess
                ? handleSubmit
                : () => console.log('Invalid URL')
            }
            variant='default'
            role='combobox'
            className='w-[120px] border-2 border-primary-500/40 py-6 hover:border-primary-500/90 hover:bg-gray-200/20'>
            Sing This!
          </Button>
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
