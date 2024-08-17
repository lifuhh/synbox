import { validateJSON } from '@/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useStreamingApi = (videoId: string) => {
  const [isStreaming, setIsStreaming] = useState(false)
  const [updateMessages, setUpdateMessages] = useState<string[]>([])
  const [vidInfo, setVidInfo] = useState<any>(null)
  const [showVidInfo, setShowVidInfo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMounted = useRef(true)

  const resetStream = useCallback(() => {
    if (isMounted.current) {
      setIsStreaming(false)
      setUpdateMessages([])
      setVidInfo(null)
      setShowVidInfo(false)
      setError(null)
    }
  }, [])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!videoId) return

    const fetchData = async () => {
      if (isMounted.current) {
        setIsStreaming(true)
        setError(null)
      }
      try {
        const response = await fetch(`http://127.0.0.1:8080/validate`, {
          method: 'POST',
          body: JSON.stringify({ id: videoId }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error('Network response was not ok')
        if (!response.body)
          throw new Error('ReadableStream not yet supported in this browser')

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          if (!isMounted.current) {
            reader.cancel()
            break
          }

          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          lines.forEach((line) => {
            if (validateJSON(line)) {
              const content = JSON.parse(line)
              if (content['type'] === 'update' || content['type'] === 'data') {
                if (isMounted.current) {
                  setUpdateMessages((prev) => [...prev, content['data']])
                }
              } else if (content['type'] === 'vid_info') {
                if (isMounted.current) {
                  setVidInfo(content['data'])
                  setTimeout(() => {
                    if (isMounted.current) {
                      setShowVidInfo(true)
                      setIsStreaming(false)
                    }
                  }, 1000)
                }
              } else if (content['type'] === 'error') {
                if (isMounted.current) {
                  setError(content['data'])
                  setIsStreaming(false)
                }
              }
            }
          })
        }
      } catch (error) {
        if (isMounted.current) {
          console.error('Error:', error)
          setError('An unexpected error occurred')
          setIsStreaming(false)
        }
      } finally {
        if (isMounted.current) {
          setIsStreaming(false)
        }
      }
    }

    fetchData()
  }, [videoId])

  return {
    isStreaming,
    updateMessages,
    vidInfo,
    showVidInfo,
    error,
    resetStream,
  }
}
