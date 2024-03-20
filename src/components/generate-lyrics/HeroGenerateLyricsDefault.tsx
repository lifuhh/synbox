import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { YouTubeUrlValidation } from '@/lib/validation'
import { extractVideoId } from '@/utils'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { Spotlight } from '../ui/Spotlight'

interface HeroGenerateLyricsDefaultProps {
  loading: boolean
  setLoading: (loading: boolean) => void
}

const HeroGenerateLyricsDefault = ({
  loading,
  setLoading,
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
        result.error.errors.map((error) => error.message).join(', ')
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
      console.log('Valid YouTube URL:', extractVideoId(inputValue))
    } else {
      // If the submit button is clicked without a valid URL, show an error
      setErrorMessage('Please enter a valid YouTube URL before submitting.')
    }
  }

  return (
    <div className='md:h-[25rem] w-full rounded-md flex items-top md:justify-center pt-10 bg-dark-1/[0.15] antialiased bg-grid-white/[0.90] relative  overflow-hidden'>
      <Spotlight className='-top-8 left-10 md:left-60 md:-top-20' fill='pink' />

      <div className='p-4 max-w-7xl  mx-auto z-10 w-full gap-4 lg:gap-0 flex-between xl:flex-around flex-col xl:h-96'>
        <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-2 no-select'>
          {/* AI-Powered Japanese Karaoke */}
          Placeholder
        </h1>
        <div className='sm:mx-auto w-full sm:w-4/5 flex-between gap-4 overflow-visible relative'>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder='Paste YouTube URL here'
            // border-2 border-primary-500/40 hover:border-primary-500/90
            // focus:ring-0 focus:ring-violet-300
            // focus:outline-none focus:ring-0 focus:ring-teal-300
            className={`py-6 focus:ring-transparent hover:border-secondary border-2 border-white ${
              inputValue.length > 0
                ? validationSuccess
                  ? 'focus:border-green-500'
                  : 'focus:border-red-700'
                : 'focus:border-secondary'
            } `}
          />
          <div className='absolute -bottom-20 left-0 pt-2 w-full h-20'>
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
            className='w-[120px] py-6 border-2 border-primary-500/40 hover:border-primary-500/90 hover:bg-gray-200/20'>
            Sing This!
          </Button>
        </div>

        {/* Display error message or success message */}

        <p className='lg:w-7/10 mt-4 font-normal text-base text-neutral-300 no-select text-center mx-auto'>
          Step into a Karaoke haven with Synbox, effortlessly bringing any
          Japanese song from YouTube to life. Just paste a link, and if the song
          lacks lyrics, Synbox's use of OpenAI's Whisper generates synchronized
          karaoke lyrics with romaji. For a deeper dive, we offer varied
          translations to enrich your understanding and singing experience.
          Synbox is the perfect stage for all Japanese music lovers, regardless
          of language proficiency.
        </p>
      </div>
    </div>
  )
}
export default HeroGenerateLyricsDefault
