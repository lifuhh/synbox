import { streamTranscribeVideoById } from '@/lib/synbox-flask/api'
import { SubtitleInfo } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

interface TranscriptionMutationVariables {
  vidId: string
  subtitleInfo: SubtitleInfo
}

export const useStreamTranscriptionApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [lyricsInfo, setLyricsInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isAiGenerated, setIsAiGenerated] = useState(false)

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
      setUpdateMessages([])
      setLyricsInfo(null)
      setIsAiGenerated(false)
    },
    onSettled: () => {
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
    lyricsInfo,
    error,
    mutate: mutation.mutate,
    isAiGenerated,
  }
}
