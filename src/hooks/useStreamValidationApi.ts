import { streamValidateVideoById } from '@/lib/synbox-flask/api'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useStreamValidationApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [vidInfo, setVidInfo] = useState<any>(null)
  const [showVidInfo, setShowVidInfo] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use a ref to store the timeout ID
  const settledTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetStream = useCallback(() => {
    setUpdateMessages([])
    setVidInfo(null)
    setShowVidInfo(false)
    setError(null)
  }, [])

  // Clear the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (settledTimeoutRef.current) {
        clearTimeout(settledTimeoutRef.current)
      }
    }
  }, [])

  const mutation = useMutation({
    mutationFn: (id: string) =>
      streamValidateVideoById(
        id,
        (message) => setUpdateMessages((prev) => [...prev, message]),
        (info) => setVidInfo(info),
        (err) => setError(err),
      ),
    onMutate: () => {
      setIsStreaming(true)
      setError(null)
      resetStream()
    },
    onSettled: () => {
      // Clear any existing timeout
      if (settledTimeoutRef.current) {
        clearTimeout(settledTimeoutRef.current)
      }
      // Set a new timeout
      settledTimeoutRef.current = setTimeout(() => {
        setIsStreaming(false)
      }, 1000)
    },
    onError: (error: Error) => {
      setError(error.message)
      setIsStreaming(false)
    },
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
