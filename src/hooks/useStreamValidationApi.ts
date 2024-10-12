import { streamValidateVideoById } from '@/lib/synbox-flask/api'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

export const useStreamValidationApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [vidInfo, setVidInfo] = useState<any>(null)
  const [showVidInfo, setShowVidInfo] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetStream = useCallback(() => {
    setUpdateMessages([])
    setVidInfo(null)
    setShowVidInfo(false)
    setError(null)
  }, [])

  const mutation = useMutation({
    mutationFn: (id: string) =>
      streamValidateVideoById(
        id,
        (message) => setUpdateMessages((prev) => [...prev, message]),
        (info) => setVidInfo(info),
        (err) => setError(err),
        () => setIsStreaming(false), // New callback for "success" message
      ),
    onMutate: () => {
      setIsStreaming(true)
      setError(null)
      resetStream()
    },
    onSettled: () => {
      // No need for a timeout here anymore
      setIsStreaming(false)
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
