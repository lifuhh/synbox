import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Skeleton } from '@/components/ui/skeleton'
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
}

const RequestDialogStepTwoDisplay: React.FC<
  RequestDialogStepTwoDisplayProps
> = ({ vidInfo, onLyricsUpdate }) => {
  const [currentLyrics, setCurrentLyrics] = useState<string[]>([])
  const [currentTimestampedLyrics, setCurrentTimestampedLyrics] = useState<
    Lyric[]
  >([])
  const [isOpen, setIsOpen] = useState(false)
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
    if (!vidInfo || !vidInfo.full_vid_info) {
      navigate('/')
      return
    }

    const { full_vid_info: fullVidInfo, subtitle_info: subtitleInfo } = vidInfo
    const { id: vidId } = fullVidInfo

    setCurrentLyrics([])
    setCurrentTimestampedLyrics([])

    if (vidId && subtitleInfo) {
      mutate({ vidId, subtitleInfo })
    }
  }, [vidInfo, navigate, mutate])

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
      <div className='h-[46vh] w-full overflow-hidden rounded-md border p-2'>
        {[...Array(11)].map((_, index) => (
          <div
            key={index}
            className={`mb-2 flex w-full items-center justify-between rounded-lg ${
              index !== 11 ? 'px-2 py-1' : 'px-2 pb-0 pt-1'
            }`}>
            <Skeleton className='mr-2 h-[28px] w-24' />
            <Skeleton className='h-[28px] flex-grow' />
          </div>
        ))}
      </div>
      <Skeleton className='mt-2 h-5 w-40' />
    </div>
  )

  if (!vidInfo || !vidInfo.full_vid_info) {
    return null
  }

  return (
    <div className='mt-1 h-full w-full'>
      <UpdateMessagesDisplay
        isStreaming={isStreaming}
        showLoader={isStreaming}
        updateMessages={updateMessages}
        loaderType='dots'
        loaderSize='md'
        textSize='md'
        verticalMargin={2}
      />

      {error && (
        <div className='mb-4 text-center text-red-500'>
          <p>Error: {error}</p>
          <Button
            onClick={() => {
              const {
                full_vid_info: fullVidInfo,
                subtitle_info: subtitleInfo,
              } = vidInfo
              const { id: vidId } = fullVidInfo
              mutate({ vidId, subtitleInfo })
            }}
            variant='secondary'
            className='mt-2'>
            Retry
          </Button>
        </div>
      )}

      <div className='min-h-[300px]'>
        {isStreaming ? (
          <LyricsSkeleton />
        ) : currentLyrics ? (
          currentLyrics.length > 0 && currentTimestampedLyrics.length > 0 ? (
            <div className='space-y-4'>
              <div className='rounded-lg border border-primary/20 p-4'>
                <div className='flex items-center justify-center space-x-2'>
                  <PartyPopper className='h-5 w-5 text-primary' />
                  <h2 className='text-xl text-white'>
                    Transcription Completed!
                  </h2>
                </div>
                <p className='mt-1 text-center text-foreground'>
                  The song has been successfully transcribed. You can preview
                  the results below.
                </p>
              </div>

              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className='w-full'>
                <CollapsibleTrigger asChild>
                  <button className='group w-full'>
                    <div className='flex w-full flex-col items-center space-y-2 rounded-lg py-2 hover:bg-primary/5'>
                      <h3 className='text-lg font-semibold'>View Lyrics</h3>
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
                    {' '}
                    {/* Fixed height container */}
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
          ) : null
        ) : null}
      </div>
    </div>
  )
}

export default RequestDialogStepTwoDisplay
