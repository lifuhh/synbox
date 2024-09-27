import { streamTranscribeVideoById } from '@/lib/synbox-flask/api'
import { SubtitleInfo } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

interface TranscriptionMutationVariables {
  vidId: string
  subtitleInfo: SubtitleInfo
}

export const useStreamTranscriptionApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [lyricsInfo, setLyricsInfo] = useState<any>(null)
  const [showLyricsInfo, setShowLyricsInfo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAiGenerated, setIsAiGenerated] = useState(false)

  const settledTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetStream = useCallback(() => {
    setUpdateMessages([])
    setLyricsInfo(null)
    setShowLyricsInfo(false)
    setError(null)
    setIsAiGenerated(false)
  }, [])

  useEffect(() => {
    return () => {
      if (settledTimeoutRef.current) {
        clearTimeout(settledTimeoutRef.current)
      }
    }
  }, [])

  const mutation = useMutation({
    mutationFn: ({ vidId, subtitleInfo }: TranscriptionMutationVariables) =>
      streamTranscribeVideoById(
        vidId,
        subtitleInfo,
        (message) => setUpdateMessages((prev) => [...prev, message]),
        (info) => setLyricsInfo(info),
        (err) => setError(err),
        (aiGenerated) => setIsAiGenerated(aiGenerated),
      ),
    onMutate: () => {
      setIsStreaming(true)
      setError(null)
      resetStream()
    },
    onSettled: () => {
      if (settledTimeoutRef.current) {
        clearTimeout(settledTimeoutRef.current)
      }
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
    lyricsInfo,
    showLyricsInfo,
    setShowLyricsInfo,
    error,
    resetStream,
    mutate: mutation.mutate,
    isAiGenerated,
  }
}
