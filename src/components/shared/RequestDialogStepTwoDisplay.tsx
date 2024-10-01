import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { useStreamTranscriptionApi } from '@/hooks/useStreamTranscriptionApi'
import { Loader } from '@mantine/core'
import { Edit2, Save, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RequestDialogLyricsDisplay from './RequestDialogLyricsDisplay'

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

  const LyricsSkeleton = () => (
    <div className='mt-4 w-full'>
      <Skeleton className='mb-2 h-7 w-32' /> {/* "Lyrics" heading */}
      <div className='h-[40vh] w-full rounded-md border bg-background p-4'>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className='mb-2 flex w-full items-center justify-between rounded-lg bg-secondary p-2'>
            <Skeleton className='mr-2 h-5 w-24' /> {/* Timestamp */}
            <Skeleton className='h-5 flex-grow' /> {/* Lyric text */}
          </div>
        ))}
      </div>
      <div className='mt-4 flex gap-2'>
        <Skeleton className='h-10 w-32' /> {/* Edit button */}
      </div>
      <Skeleton className='mt-2 h-5 w-full' /> {/* AI-generated message */}
    </div>
  )

  const handleLyricsChange = (
    updatedLyrics: string[],
    updatedTimestampedLyrics: Lyric[],
  ) => {
    setCurrentLyrics(updatedLyrics)
    setCurrentTimestampedLyrics(updatedTimestampedLyrics)
    onLyricsUpdate(updatedLyrics, updatedTimestampedLyrics)
  }

  return (
  <div className='mt-4 h-full w-full'>
      <div className='mb-8 flex min-h-[10px] flex-col items-center justify-center'>
        {isStreaming ? (
          <div className='text-center'>
            <Loader color='yellow' type='dots' size='xl' />
            <p className='mt-2'>Transcribing lyrics...</p>
          </div>
        ) : (
          updateMessages.map((message, index) => (
            <p key={index} className='text-center'>
              {message}
            </p>
          ))
        )}
      </div>

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
        ) : lyricsInfo ? (
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
