import { streamValidateVideoById } from '@/lib/synbox-flask/api'
import { VideoInfo } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'



export const useStreamValidationApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [vidInfo, setVidInfo] = useState<VideoInfo | null>(null)
  const [showVidInfo, setShowVidInfo] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetStream = useCallback(() => {
    setIsStreaming(false)
    setUpdateMessages([])
    setVidInfo(null)
    setShowVidInfo(false)
    setError(null)
  }, [])

  const handleError = useCallback((err: unknown) => {
    if (err instanceof Error) {
      setError(err.message)
    } else if (typeof err === 'string') {
      setError(err)
    } else {
      setError('An unknown error occurred')
    }
  }, [])

  const handleVideoInfo = useCallback((info: unknown) => {
    console.log('Received video info:', info)
    try {
      // Type check the incoming data
      if (!info || typeof info !== 'object') {
        throw new Error('Invalid video info format')
      }
      
      // Type assertion after validation
      setVidInfo(info as VideoInfo)
    } catch (err) {
      console.error('Error processing video info:', err)
      handleError(err)
    }
  }, [handleError])

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await streamValidateVideoById(
          id,
          (message) => {
            console.log('Stream update:', message)
            setUpdateMessages((prev) => [...prev, message])
          },
          handleVideoInfo,
          (err) => {
            console.error('Stream error:', err)
            handleError(err)
          },
          () => {
            console.log('Stream completed')
            setIsStreaming(false)
          }
        )
      } catch (err) {
        console.error('Mutation error:', err)
        handleError(err)
        throw err
      }
    },
    onMutate: () => {
      console.log('Starting validation...')
      resetStream()
      setIsStreaming(true)
    },
    onSettled: () => {
      console.log('Validation settled')
      setIsStreaming(false)
    },
    onError: (err: unknown) => {
      console.error('Validation error:', err)
      handleError(err)
      setIsStreaming(false)
    }
  })

  return {
    isStreaming,
    updateMessages,
    vidInfo,
    showVidInfo,
    setShowVidInfo,
    error,
    resetStream,
    mutate: mutation.mutate,
  }
}