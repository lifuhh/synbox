import { NavigateFunction } from 'react-router-dom'

interface VideoRouteConfig {
  navigate: NavigateFunction
  videoId: string | undefined
  setIsLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setStateVideoId: (videoId: string | null) => void
  onSuccess?: () => void
}

export const handleVideoRoute = async ({
  navigate,
  videoId,
  setIsLoading,
  setError,
  setStateVideoId,
  onSuccess
}: VideoRouteConfig): Promise<void> => {
  if (!videoId) {
    navigate('/', { replace: true })
    return
  }

  try {
    setIsLoading(true)
    setError(null)

    // Validate video ID format
    if (!videoId.match(/^[a-zA-Z0-9_-]{11}$/)) {
      throw new Error('Invalid video ID format')
    }

    // Handle URL formats
    let cleanVideoId = videoId
    
    // Handle full YouTube URLs
    if (videoId.includes('youtube.com') || videoId.includes('youtu.be')) {
      const url = new URL(videoId)
      if (url.hostname.includes('youtu.be')) {
        cleanVideoId = url.pathname.slice(1)
      } else {
        cleanVideoId = url.searchParams.get('v') || ''
      }
    }

    // Double-check cleaned ID
    if (!cleanVideoId.match(/^[a-zA-Z0-9_-]{11}$/)) {
      throw new Error('Invalid video ID format after cleaning')
    }

    setStateVideoId(cleanVideoId)
    onSuccess?.()

  } catch (err) {
    console.error('Error processing video route:', err)
    setError(err instanceof Error ? err.message : 'Failed to load video')
    // Don't navigate immediately on error, let the component handle it
    setStateVideoId(null)
  } finally {
    setIsLoading(false)
  }
}

// Utility function to validate video ID
export const isValidVideoId = (id: string): boolean => {
  return /^[a-zA-Z0-9_-]{11}$/.test(id)
}

// Utility function to extract video ID from various URL formats
export const extractVideoId = (url: string): string | null => {
  try {
    // Handle already clean IDs
    if (isValidVideoId(url)) {
      return url
    }

    // Handle full URLs
    const urlObj = new URL(url)
    
    // Handle youtu.be format
    if (urlObj.hostname.includes('youtu.be')) {
      const id = urlObj.pathname.slice(1)
      return isValidVideoId(id) ? id : null
    }
    
    // Handle youtube.com format
    if (urlObj.hostname.includes('youtube.com')) {
      const id = urlObj.searchParams.get('v')
      return id && isValidVideoId(id) ? id : null
    }

    return null
  } catch {
    return null
  }
}