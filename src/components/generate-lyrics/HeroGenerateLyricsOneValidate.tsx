import {
  useGetLyricsBySongId,
  useGetYoutubeVideoInfo,
  useStreamValidateVideoById,
  useValidateVideoById,
} from '@/lib/react-query/queriesAndMutations'
import { formatCountToString, formatDuration } from '@/utils'
import { useDisclosure } from '@mantine/hooks'
import { useCallback, useEffect, useState } from 'react'
import JSONPretty from 'react-json-pretty'
import { useNavigate } from 'react-router-dom'
import Loader from '../shared/Loader'
import RequestDialog from '../shared/RequestDialog'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'

const FlaskBEAddress = import.meta.env.VITE_SYNBOX_BE_URL

interface HeroGenerateLyricsValidationProps {
  subStage: number
  setSubStage: (stage: number) => void
  videoId: string
  setInputVideoId: (videoId: string) => void
  setProcessingStage: (stage: number) => void
}

const HeroGenerateLyricsOneValidate = ({
  subStage,
  setSubStage,
  setProcessingStage,
  videoId,
  setInputVideoId,
}: HeroGenerateLyricsValidationProps) => {
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loaderVisible, loaderVisibilityHandler] = useDisclosure(false)

  const [isStreaming, setIsStreaming] = useState(false)
  const [messages, setMessages] = useState(false)
  const [accumulatedMessages, setAccumulatedMessages] = useState<any[]>([])

  const handleGenerate = () => {
    //
    console.log('hi')
  }

  //TODO: Auto redirect for if there's lyrics, set this up in the future
  // const lyrics = null
  // useEffect(() => {
  //   // If lyrics exist, navigate to /v/{videoId}
  //   if (lyrics) {
  //     setTimeout(() => {
  //       setProcessingStage(1)
  //       setInputVideoId('')
  //       navigate(`/v/${videoId}`)
  //     }, 2000) // 2 seconds delay
  //   }
  // }, [lyrics, navigate, videoId, setProcessingStage, setInputVideoId])

  //TODO: Prevent exiting the page when the video is still validating
  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  //     if (isLoading) {
  //       event.preventDefault()
  //       event.returnValue = '' // Standard way to trigger a confirmation dialog
  //     }
  //   }

  //   window.addEventListener('beforeunload', handleBeforeUnload)

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [isLoading])

  return (
    <div className='items-top bg-grid-white/[0.90] relative flex w-full overflow-y-auto rounded-md bg-dark-1/[0.15] pt-10 antialiased md:min-h-[25rem]  md:justify-center'>
      <div className='flex-between w-full flex-col'>
        <Dialog open={dialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleGenerate}
              variant='default'
              role='combobox'
              className='mt-4 w-1/3 border-2 border-primary-500/40 py-6 hover:border-primary-500/90 hover:bg-gray-200/20 md:w-4/12 lg:w-1/4'>
              Start
            </Button>
          </DialogTrigger>
          <RequestDialog
            setDialogOpen={setDialogOpen}
            loaderVisible={loaderVisible}
            loaderVisibilityHandler={loaderVisibilityHandler}
          />
        </Dialog>
        <Button onClick={handleBackButton} className='mt-4'>
          Back
        </Button>
      </div>
    </div>
  )
}
export default HeroGenerateLyricsOneValidate
