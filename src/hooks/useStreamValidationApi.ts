import { streamValidateVideoById } from '@/lib/synbox-flask/api'
import { VideoInfo } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useStreamValidationApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [vidInfo, setVidInfo] = useState<VideoInfo | null>(null)
  const [showVidInfo, setShowVidInfo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const streamTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const retryCountRef = useRef(0)
  const currentIdRef = useRef<string | null>(null)
  const mutateRef = useRef<((id: string) => void) | null>(null)

  const MAX_RETRIES = 3
  const STREAM_TIMEOUT = 30000 // 30 seconds

  const resetStream = useCallback(() => {
    setIsStreaming(false)
    setUpdateMessages([])
    setVidInfo(null)
    setShowVidInfo(false)
    setError(null)
    retryCountRef.current = 0
    
    // Clean up any existing timeouts or abort controllers
    if (streamTimeoutRef.current) {
      clearTimeout(streamTimeoutRef.current)
      streamTimeoutRef.current = null
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }, [])

  const handleError = useCallback((err: unknown) => {
    console.error('Stream error:', err)
    if (err instanceof Error) {
      setError(err.message)
    } else if (typeof err === 'string') {
      setError(err)
    } else {
      setError('An unknown error occurred')
    }
    setIsStreaming(false)
  }, [])

  const handleVideoInfo = useCallback((info: unknown) => {
    console.log('Received video info:', info)
    try {
      if (!info || typeof info !== 'object') {
        throw new Error('Invalid video info format')
      }
      setVidInfo(info as VideoInfo)
      
      // Reset timeout when we receive valid data
      if (streamTimeoutRef.current) {
        clearTimeout(streamTimeoutRef.current)
      }
    } catch (err) {
      console.error('Error processing video info:', err)
      handleError(err)
    }
  }, [handleError])

  const startStreamTimeout = useCallback(() => {
    if (streamTimeoutRef.current) {
      clearTimeout(streamTimeoutRef.current)
    }
    
    streamTimeoutRef.current = setTimeout(() => {
      console.warn('Stream timeout reached')
      if (retryCountRef.current < MAX_RETRIES && currentIdRef.current && mutateRef.current) {
        retryCountRef.current++
        console.log(`Retrying stream (attempt ${retryCountRef.current})...`)
        mutateRef.current(currentIdRef.current)
      } else {
        handleError('Stream timeout reached after multiple retries')
      }
    }, STREAM_TIMEOUT)
  }, [handleError])

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      resetStream()
      currentIdRef.current = id
      setIsStreaming(true)
      
      // Create new AbortController for this stream
      abortControllerRef.current = new AbortController()
      startStreamTimeout()

      try {
        await streamValidateVideoById(
          id,
          (message) => {
            console.log('Stream update:', message)
            setUpdateMessages((prev) => [...prev, message])
          },
          (info) => {
            console.log('Received info:', info)
            handleVideoInfo(info)
          },
          (err) => {
            console.error('Stream error:', err)
            handleError(err)
          },
          () => {
            console.log('Stream completed successfully')
            if (streamTimeoutRef.current) {
              clearTimeout(streamTimeoutRef.current)
            }
            setIsStreaming(false)
          },
          abortControllerRef.current.signal
        )
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('Stream was aborted')
        } else {
          console.error('Mutation error:', err)
          handleError(err)
        }
        throw err
      }
    },
    onError: (err: unknown) => {
      console.error('Mutation error:', err)
      handleError(err)
    }
  })

  // Store mutation.mutate in ref to avoid dependency cycles
  useEffect(() => {
    mutateRef.current = mutation.mutate
  }, [mutation.mutate])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamTimeoutRef.current) {
        clearTimeout(streamTimeoutRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

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