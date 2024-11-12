import { streamValidateVideoById } from '@/lib/synbox-flask/api'
import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

interface VideoInfo {
  passed: boolean
  audio_file_path: string
  full_vid_info: {
    categories: string[]
    channel_name: string
    description: string
    duration: number
    id: string
    language: string
    likes: number
    playable_in_embed: boolean
    thumbnail: string
    title: string
    uploader: string
    views: number
  }
  error_msg: string | null
  subtitle_info: {
    exist: boolean
    path: string | null
    ext: string | null
  }
  vid_info_for_validation: {
    title: string
    categories: string[]
    description: string
    channel_name: string
    uploader: string
  }
}

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

  const handleVideoInfo = useCallback((info: any) => {
    console.log('Received video info:', info)
    try {
      // Validate required fields
      if (!info?.full_vid_info) {
        throw new Error('Invalid video info format')
      }
      setVidInfo(info)
    } catch (err) {
      console.error('Error processing video info:', err)
      setError(err.message)
    }
  }, [])

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
            setError(err)
          },
          () => {
            console.log('Stream completed')
            setIsStreaming(false)
          }
        )
      } catch (err) {
        console.error('Mutation error:', err)
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
    onError: (error: Error) => {
      console.error('Validation error:', error)
      setError(error.message)
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