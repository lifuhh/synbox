import { Button } from '@/components/ui/button'
import { useStreamTranscriptionApi } from '@/hooks/useStreamTranscriptionApi'
import { Loader, Text } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react'
import RequestDialogLyricsDisplay from './RequestDialogLyricsDisplay'

const RequestDialogStepTwoDisplay = ({ vidInfo }) => {
  const [showLoader, setShowLoader] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [cachedLyrics, setCachedLyrics] = useState(null)

  const { full_vid_info: fullVidInfo, subtitle_info: subtitleInfo } = vidInfo
  const { id: vidId } = fullVidInfo
  const { exist: subtitleExists, path: subtitlePath } = subtitleInfo['exist']

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

  const handleRetry = useCallback(() => {
    if (retryCount < 2) {
      setRetryCount((prevCount) => prevCount + 1)
      resetStream()
      mutate({ vidId, subtitleInfo })
    }
  }, [retryCount, resetStream, mutate, vidId, subtitleInfo])

  useEffect(() => {
    if (vidId && subtitleInfo && !cachedLyrics) {
      // Check if lyrics are cached in localStorage
      const cachedData = localStorage.getItem(`lyrics_${vidId}`)
      if (cachedData) {
        setCachedLyrics(JSON.parse(cachedData))
        setShowLyricsInfo(true)
      } else {
        mutate({ vidId, subtitleInfo })
      }
    }
  }, [vidId, subtitleInfo, cachedLyrics, mutate, setShowLyricsInfo])

  useEffect(() => {
    if (lyricsInfo) {
      console.log(lyricsInfo)
      // Cache the lyrics in localStorage
      localStorage.setItem(`lyrics_${vidId}`, JSON.stringify(lyricsInfo))
      setCachedLyrics(lyricsInfo)
      const timer = setTimeout(() => setShowLyricsInfo(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [lyricsInfo, setShowLyricsInfo, vidId])

  useEffect(() => {
    return () => {
      console.log('RequestDialog Step Two: unmounting, resetting stream')
      resetStream()
    }
  }, [resetStream])

  useEffect(() => {
    if ((lyricsInfo || cachedLyrics) && !showLyricsInfo) {
      setShowLoader(true)
    } else if (showLyricsInfo) {
      setShowLoader(false)
    }
  }, [lyricsInfo, cachedLyrics, showLyricsInfo])

  return (
    <div className='mt-4 w-full'>
      {/* //TODO: Add check isAiGenerated  */}
      {true && (
        <div className='w-full items-center'>
          <Text className='text-md w-full'>
            These Lyrics are AI-Generated. Please check for errors.
          </Text>
        </div>
      )}
      <h3 className='text-xl font-bold'>Step 2</h3>
      {/* {isAiGenerated && <h1 className=' text-md'>Next</h1>} */}
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

        {showLyricsInfo && (lyricsInfo || cachedLyrics) && (
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
              lyrics={lyricsInfo || cachedLyrics}
              isAiGenerated={isAiGenerated}
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
