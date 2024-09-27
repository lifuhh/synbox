/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { useStreamTranscriptionApi } from '@/hooks/useStreamTranscriptionApi'
import { Loader, Text } from '@mantine/core'
import React, { useCallback, useEffect, useState } from 'react'
import RequestDialogLyricsDisplay from './RequestDialogLyricsDisplay'

interface LyricsInfo {
  lyrics: string[]
  timestamped_lyrics: any[]
}

interface RequestDialogStepTwoDisplayProps {
  vidInfo: any
  onLyricsUpdate: (lyrics: string[], timestampedLyrics: any[]) => void
}

const RequestDialogStepTwoDisplay = ({
  vidInfo,
  onLyricsUpdate,
}: RequestDialogStepTwoDisplayProps) => {
  const [showLoader, setShowLoader] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
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
    showLyricsInfo,
    setShowLyricsInfo,
    error,
    resetStream,
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
      const timer = setTimeout(() => setShowLyricsInfo(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [lyricsInfo, setShowLyricsInfo, onLyricsUpdate])

  useEffect(() => {
    return () => {
      console.log('RequestDialog Step Two: unmounting, resetting stream')
      resetStream()
    }
  }, [resetStream])

  useEffect(() => {
    if (lyricsInfo && !showLyricsInfo) {
      setShowLoader(true)
    } else if (showLyricsInfo) {
      setShowLoader(false)
    }
  }, [lyricsInfo, showLyricsInfo])

  const handleRetry = useCallback(() => {
    if (retryCount < 2) {
      setRetryCount((prevCount) => prevCount + 1)
      resetStream()
      mutate({ vidId, subtitleInfo })
    }
  }, [retryCount, resetStream, mutate, vidId, subtitleInfo])

  const handleLyricsChange = useCallback(
    (updatedLyrics: string[]) => {
      setCurrentLyrics(updatedLyrics)

      const updatedTimestampedLyrics = currentTimestampedLyrics.map(
        (item, index) => ({
          ...item,
          lyric: updatedLyrics[index] || '',
        }),
      )
      setCurrentTimestampedLyrics(updatedTimestampedLyrics)

      onLyricsUpdate(updatedLyrics, updatedTimestampedLyrics)
    },
    [currentTimestampedLyrics, onLyricsUpdate],
  )

  return (
    <div className='mt-4 h-full w-full'>
      {isAiGenerated && (
        <div className='w-full items-center'>
          <Text className='text-md w-full'>
            These Lyrics are AI-Generated. Please check for errors.
          </Text>
        </div>
      )}
      <h3 className='text-xl font-bold'>Step 2</h3>
      <>
        {isStreaming && !showLoader && !showLyricsInfo && (
          <Loader color='yellow' type='dots' />
        )}

        {!showLoader &&
          !showLyricsInfo &&
          updateMessages.map((message, index) => <p key={index}>{message}</p>)}

        {showLoader && (
          <div className='my-4'>
            <Loader color='yellow' type='dots' />
          </div>
        )}

        {showLyricsInfo && currentLyrics.length > 0 && (
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

        {error && (
          <div className='mt-4 text-red-500'>
            <p>Error: {error}</p>
            {retryCount < 2 && (
              <Button
                onClick={handleRetry}
                variant='secondary'
                className='mt-2'>
                Retry ({2 - retryCount} attempts left)
              </Button>
            )}
          </div>
        )}
      </>
    </div>
  )
}

export default RequestDialogStepTwoDisplay
