import { streamAnnotateVideoById } from '@/lib/synbox-flask/api'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

interface AnnotationMutationVariables {
  vidId: string
  lyrics: string[]
  timestampedLyrics: unknown[]
}

export const useStreamAnnotateApi = () => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [engTranslation, setEngTranslation] = useState<string[] | null>(null)
  const [chiTranslation, setChiTranslation] = useState<string[] | null>(null)
  const [romajiLyrics, setRomajiLyrics] = useState<string[] | null>(null)
  const [kanjiAnnotations, setKanjiAnnotations] = useState<string[] | null>(
    null,
  )
  const [showAnnotation, setShowAnnotation] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTask, setCurrentTask] = useState<string | null>(null)

  const settledTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetStream = useCallback(() => {
    setUpdateMessages([])
    setEngTranslation(null)
    setChiTranslation(null)
    setRomajiLyrics(null)
    setKanjiAnnotations(null)
    setShowAnnotation(false)
    setError(null)
    setCurrentTask(null)
  }, [])

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
        (info) => {
          setCurrentTask(info.type)
          switch (info.type) {
            case 'eng_translation':
              setEngTranslation(info.data)
              break
            case 'chi_translation':
              setChiTranslation(info.data)
              break
            case 'romaji_lyrics':
              setRomajiLyrics(info.data)
              break
            case 'kanji_annotations':
              setKanjiAnnotations(info.data)
              break
          }
        },
        (err) => setError(err),
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
        setShowAnnotation(true)
        setCurrentTask(null)
      }, 1000)
    },
    onError: (error: Error) => {
      setError(error.message)
      setIsStreaming(false)
      setCurrentTask(null)
    },
  })

  return {
    isStreaming,
    updateMessages,
    engTranslation,
    chiTranslation,
    romajiLyrics,
    kanjiAnnotations,
    showAnnotation,
    setShowAnnotation,
    error,
    resetStream,
    mutate: mutation.mutate,
    currentTask,
  }
}
