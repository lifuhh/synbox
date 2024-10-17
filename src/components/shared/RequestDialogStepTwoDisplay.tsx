import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useStreamTranscriptionApi } from '@/hooks/useStreamTranscriptionApi'
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
}

const RequestDialogStepTwoDisplay: React.FC<
  RequestDialogStepTwoDisplayProps
> = ({ vidInfo, onLyricsUpdate }) => {
  const [currentLyrics, setCurrentLyrics] = useState<string[]>([])
  const [currentTimestampedLyrics, setCurrentTimestampedLyrics] = useState<
    Lyric[]
  >([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!vidInfo || !vidInfo.full_vid_info) {
      // Redirect to homepage if vidInfo or full_vid_info is missing
      navigate('/')
    }
  }, [vidInfo, navigate])

  // If vidInfo or full_vid_info is missing, don't render anything
  if (!vidInfo || !vidInfo.full_vid_info) {
    return null
  }

  const { full_vid_info: fullVidInfo, subtitle_info: subtitleInfo } = vidInfo
  const { id: vidId } = fullVidInfo

  const {
    isStreaming,
    updateMessages,
    lyricsInfo,
    error,
    mutate,
    isAiGenerated,
  } = useStreamTranscriptionApi()

  // for resetting when vid id changes
  useEffect(() => {
    setCurrentLyrics([])
    setCurrentTimestampedLyrics([])
  }, [vidId])

  useEffect(() => {
    if (vidId && subtitleInfo) {
      mutate({ vidId, subtitleInfo })
    }
  }, [vidId, subtitleInfo, mutate])

  useEffect(() => {
    if (lyricsInfo) {
      setCurrentLyrics(lyricsInfo.lyrics)
      setCurrentTimestampedLyrics(lyricsInfo.timestamped_lyrics)
      onLyricsUpdate(lyricsInfo.lyrics, lyricsInfo.timestamped_lyrics)
    }
  }, [lyricsInfo, onLyricsUpdate])

  const handleLyricsChange = (
    updatedLyrics: string[],
    updatedTimestampedLyrics: Lyric[],
  ) => {
    setCurrentLyrics(updatedLyrics)
    setCurrentTimestampedLyrics(updatedTimestampedLyrics)
    onLyricsUpdate(updatedLyrics, updatedTimestampedLyrics)
  }

  const LyricsSkeleton = () => (
    <div className='mt-4 w-full'>
      <Skeleton className='mb-2 h-7 w-32' />
      <div className='h-[40vh] w-full rounded-md border bg-background p-4'>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className='mb-2 flex w-full items-center justify-between rounded-lg bg-secondary p-2'>
            <Skeleton className='mr-2 h-5 w-24' />
            <Skeleton className='h-5 flex-grow' />
          </div>
        ))}
      </div>
      <div className='mt-4 flex gap-2'>
        <Skeleton className='h-10 w-32' />
      </div>
      <Skeleton className='mt-2 h-5 w-full' />
    </div>
  )

  return (
    <div className='mt-4 h-full w-full'>
      <UpdateMessagesDisplay
        isStreaming={isStreaming}
        showLoader={isStreaming}
        updateMessages={updateMessages}
        loaderColor='yellow'
        loaderType='dots'
      />

      {error && (
        <div className='mb-4 text-center text-red-500'>
          <p>Error: {error}</p>
          <Button
            onClick={() => mutate({ vidId, subtitleInfo })}
            variant='secondary'
            className='mt-2'>
            Retry
          </Button>
        </div>
      )}

      <div className='min-h-[300px]'>
        {isStreaming ? (
          <LyricsSkeleton />
        ) : currentLyrics.length > 0 && currentTimestampedLyrics.length > 0 ? (
          <RequestDialogLyricsDisplay
            lyrics={currentLyrics}
            timestampedLyrics={currentTimestampedLyrics}
            isAiGenerated={isAiGenerated}
            onLyricsChange={handleLyricsChange}
          />
        ) : null}
      </div>
    </div>
  )
}

export default RequestDialogStepTwoDisplay
