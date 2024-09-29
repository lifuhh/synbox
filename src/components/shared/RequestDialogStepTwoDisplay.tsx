import { Button } from '@/components/ui/button'
import { useStreamTranscriptionApi } from '@/hooks/useStreamTranscriptionApi'
import { Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import RequestDialogLyricsDisplay from './RequestDialogLyricsDisplay'

interface LyricsInfo {
  lyrics: string[]
  timestamped_lyrics: any[]
}

interface RequestDialogStepTwoDisplayProps {
  vidInfo: any
  onLyricsUpdate: (lyrics: string[], timestampedLyrics: any[]) => void
}

const RequestDialogStepTwoDisplay: React.FC<
  RequestDialogStepTwoDisplayProps
> = ({ vidInfo, onLyricsUpdate }) => {
  const [currentLyrics, setCurrentLyrics] = useState<string[]>([])
  const [currentTimestampedLyrics, setCurrentTimestampedLyrics] = useState<
    any[]
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

  const handleLyricsChange = (updatedLyrics: string[]) => {
    setCurrentLyrics(updatedLyrics)

    const updatedTimestampedLyrics = currentTimestampedLyrics.map(
      (item, index) => ({
        ...item,
        lyric: updatedLyrics[index] || '',
      }),
    )
    setCurrentTimestampedLyrics(updatedTimestampedLyrics)

    onLyricsUpdate(updatedLyrics, updatedTimestampedLyrics)
  }

  return (
    <div className='mt-4 h-full w-full'>
      <h3 className='text-xl font-bold'>Step 2 - Transcription</h3>
      {isStreaming && (
        <div className='my-4'>
          <Loader color='yellow' type='dots' />
          <p>Transcribing lyrics...</p>
        </div>
      )}

      {updateMessages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}

      {error && (
        <div className='mt-4 text-red-500'>
          <p>Error: {error}</p>
          <Button
            onClick={() => mutate({ vidId, subtitleInfo })}
            variant='secondary'
            className='mt-2'>
            Retry
          </Button>
        </div>
      )}

      {lyricsInfo && (
        <>
          {isAiGenerated && (
            <div className='mb-4 rounded border border-yellow-400 bg-yellow-100 p-2'>
              <p className='text-sm text-yellow-700'>
                These lyrics are AI-generated and may contain errors. Please
                review and edit as necessary.
              </p>
            </div>
          )}
          <RequestDialogLyricsDisplay
            lyrics={currentLyrics}
            timestampedLyrics={currentTimestampedLyrics}
            isAiGenerated={isAiGenerated}
            onLyricsChange={handleLyricsChange}
          />
        </>
      )}
    </div>
  )
}

export default RequestDialogStepTwoDisplay
