import { streamAnnotateVideoById } from '@/lib/synbox-flask/api'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

interface AnnotationMutationVariables {
  vidId: string
  lyrics: string[]
  timestampedLyrics: string[]
}

export const useStreamAnnotateApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [engTranslation, setEngTranslation] = useState<any>(null)
  const [chiTranslation, setChiTranslation] = useState<any>(null)
  const [romajiAnnotation, setRomajiAnnotation] = useState<any>(null)
  const [kanjiAnnotation, setKanjiAnnotation] = useState<any>(null)

  const [showAnnotation, setShowAnnotation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  //TODO: remove after implementation
  const [lyricsInfo, setLyricsInfo] = useState<any>(null)

  const settledTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetStream = useCallback(() => {
    setUpdateMessages([])
    setEngTranslation(null)
    setChiTranslation(null)
    setRomajiAnnotation(null)
    setKanjiAnnotation(null)
    setShowAnnotation(false)
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
    mutationFn: ({
      vidId,
      lyrics,
      timestampedLyrics,
    }: AnnotationMutationVariables) =>
      streamAnnotateVideoById(
        vidId,
        lyrics,
        timestampedLyrics,
        (message) => setUpdateMessages((prev) => [...prev, message]),
        (info) => setLyricsInfo(info),
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
}
