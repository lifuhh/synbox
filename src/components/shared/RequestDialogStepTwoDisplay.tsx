import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useStreamTranscriptionApi } from '@/hooks/useStreamTranscriptionApi'
import { ChevronDown, ChevronUp, PartyPopper } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RequestDialogLyricsDisplay from './RequestDialogLyricsDisplay'
import UpdateMessagesDisplay from './UpdateMessagesDisplay'

interface Lyric {
  start_time: number
  end_time: number
  duration: number
  lyric: string
}

interface RequestDialogStepTwoDisplayProps {
  vidInfo: any
  onLyricsUpdate: (lyrics: string[], timestampedLyrics: Lyric[]) => void
  onStreamingStatusChange: (status: boolean) => void
  forceAiTranscription?: boolean
}

const RequestDialogStepTwoDisplay: React.FC<
  RequestDialogStepTwoDisplayProps
> = ({
  vidInfo,
  onLyricsUpdate,
  onStreamingStatusChange,
  forceAiTranscription,
}) => {
  const [currentLyrics, setCurrentLyrics] = useState<string[]>([])
  const [currentTimestampedLyrics, setCurrentTimestampedLyrics] = useState<
    Lyric[]
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const [transcriptionComplete, setTranscriptionComplete] = useState(false)
  const navigate = useNavigate()

  const {
    isStreaming,
    updateMessages,
    lyricsInfo,
    error,
    mutate,
    isAiGenerated,
  } = useStreamTranscriptionApi()

  useEffect(() => {
    onStreamingStatusChange(isStreaming)
  }, [isStreaming, onStreamingStatusChange])

  useEffect(() => {
    if (!vidInfo || !vidInfo.full_vid_info) {
      navigate('/')
      return
    }

    const { full_vid_info: fullVidInfo, subtitle_info: subtitleInfo } = vidInfo
    const { id } = fullVidInfo

    setCurrentLyrics([])
    setCurrentTimestampedLyrics([])
    setTranscriptionComplete(false)

    if (id && subtitleInfo) {
      // console.log('Initiating transcription for id:', id)
      mutate({
        id,
        subtitleInfo,
        forceAiTranscription,
      })
    }
  }, [vidInfo, navigate, mutate, forceAiTranscription])

  useEffect(() => {
    if (
      !isStreaming &&
      lyricsInfo &&
      lyricsInfo.lyrics &&
      lyricsInfo.timestamped_lyrics
    ) {
      // console.log('Processing received lyrics info')
      // console.log(lyricsInfo)
      setCurrentLyrics(lyricsInfo.lyrics)
      setCurrentTimestampedLyrics(lyricsInfo.timestamped_lyrics)
      onLyricsUpdate(lyricsInfo.lyrics, lyricsInfo.timestamped_lyrics)
      setTranscriptionComplete(true)
    }
  }, [isStreaming, lyricsInfo, onLyricsUpdate])

  const handleLyricsChange = (
    updatedLyrics: string[],
    updatedTimestampedLyrics: Lyric[],
  ) => {
    setCurrentLyrics(updatedLyrics)
    setCurrentTimestampedLyrics(updatedTimestampedLyrics)
    onLyricsUpdate(updatedLyrics, updatedTimestampedLyrics)
  }

  const handleRetry = () => {
    if (vidInfo && vidInfo.full_vid_info) {
      const { full_vid_info: fullVidInfo, subtitle_info: subtitleInfo } =
        vidInfo
      const { id } = fullVidInfo
      setTranscriptionComplete(false)
      mutate({ id, subtitleInfo, forceAiTranscription })
    }
  }

  const renderContent = () => {
    // Debug log the current render state
    // console.log('Rendering content with state:', {
    //   isStreaming,
    //   error,
    //   transcriptionComplete,
    //   hasLyrics: currentLyrics.length > 0,
    // })

    if (error) {
      return (
        <div className='mb-4 text-center text-red-500'>
          <p>Error: {error}</p>
          <Button onClick={handleRetry} variant='secondary' className='mt-2'>
            Retry
          </Button>
        </div>
      )
    }

    if (isStreaming || (!transcriptionComplete && !error)) {
      return (
        <UpdateMessagesDisplay
          isStreaming={true}
          showLoader={true}
          updateMessages={
            updateMessages.length
              ? [updateMessages[updateMessages.length - 1]]
              : ['Processing...']
          }
          loaderType='dots'
          loaderSize='md'
          textSize='md'
          verticalMargin={2}
        />
      )
    }

    if (transcriptionComplete && currentLyrics.length > 0) {
      return (
        <div className='space-y-4'>
          <div className='gap-8 rounded-lg p-4'>
            <div className='flex items-center justify-center space-x-2'>
              <PartyPopper className='h-5 w-5 text-primary' />
              <h2 className='text-xl text-white'>
                {isAiGenerated ? 'Transcription Completed!' : 'Lyrics Found!'}
              </h2>
            </div>
            <p className='mt-1 text-center text-foreground'>
              {isAiGenerated
                ? 'The song has been successfully transcribed.'
                : 'Song lyrics retrieved successfully.'}
            </p>
          </div>

          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className='w-full'>
            <CollapsibleTrigger asChild>
              <button className='group w-full'>
                <div className='flex w-full items-center justify-center space-x-2 rounded-lg py-2 hover:bg-primary/5'>
                  <h3 className='text-lg font-semibold'>
                    {isAiGenerated ? 'View Generated Lyrics' : 'View Lyrics'}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className='h-5 w-5 text-primary/60' />
                  ) : (
                    <ChevronDown className='h-5 w-5 text-primary/60' />
                  )}
                </div>
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className='space-y-2'>
              <div className='min-h-[300px]'>
                <RequestDialogLyricsDisplay
                  lyrics={currentLyrics}
                  timestampedLyrics={currentTimestampedLyrics}
                  isAiGenerated={isAiGenerated}
                  onLyricsChange={handleLyricsChange}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )
    }

    return null
  }

  return <div className='mt-1 h-full w-full'>{renderContent()}</div>
}

export default RequestDialogStepTwoDisplay
