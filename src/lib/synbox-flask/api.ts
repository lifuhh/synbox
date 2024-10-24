import { SubtitleInfo } from '@/types'
import { validateJSON } from '@/utils'

// const BE_ADDRESS = import.meta.env.VITE_SYNBOX_BE_URL
const BE_ADDRESS = import.meta.env.VITE_SYNBOX_TEST_BE_URL

interface StreamData {
  type: 'update' | 'data' | 'vid_info'
  data: string | number
}

export const streamValidateVideoById = async (
  videoId: string,
  onUpdate: (message: string) => void,
  onVidInfo: (info: any) => void,
  onError: (error: string) => void,
  onSuccess: () => void,
) => {
  const response = await fetch(`${BE_ADDRESS}/validate`, {
    method: 'POST',
    body: JSON.stringify({ id: videoId }),
    headers: {
      Accept: 'application/x-ndjson, application/json, text/plain',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) throw new Error('Network response was not ok')
  if (!response.body)
    throw new Error('ReadableStream not yet supported in this browser')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    lines.forEach((line) => {
      if (validateJSON(line)) {
        const content = JSON.parse(line)
        if (content['type'] === 'update' || content['type'] === 'data') {
          onUpdate(content['data'])
        } else if (content['type'] === 'vid_info') {
          onVidInfo(content['data'])
        } else if (content['type'] === 'error') {
          onError(content['data'])
        } else if (content['type'] === 'success') {
          onSuccess()
        }
      }
    })
  }
}

export const streamTranscribeVideoById = async (
  videoId: string,
  subtitleInfo: SubtitleInfo,
  onUpdate: (message: string) => void,
  onLyricsInfo: (info: any) => void,
  onError: (error: string) => void,
  onAiGenerated: (isAiGenerated: boolean) => void,
) => {
  console.log('This is stream transcribe api call')
  console.log(videoId)
  console.log(JSON.stringify(subtitleInfo))

  const response = await fetch(`${BE_ADDRESS}/transcribev2`, {
    method: 'POST',
    body: JSON.stringify({ id: videoId, subtitle_info: subtitleInfo }),
    headers: {
      Accept: 'application/x-ndjson, application/json, text/plain',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) throw new Error('Network response was not ok')
  if (!response.body)
    throw new Error('ReadableStream not yet supported in this browser')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    lines.forEach((line) => {
      if (validateJSON(line)) {
        const content = JSON.parse(line)
        if (content['type'] === 'update' || content['type'] === 'data') {
          onUpdate(content['data'])
        } else if (content['type'] === 'transcription') {
          onLyricsInfo(content['data'])
        } else if (content['type'] === 'error') {
          onError(content['data'])
        } else if (content['type'] === 'ai_generated') {
          onAiGenerated(content['data'])
        }
      }
    })
  }
}

export const streamAnnotateVideoById = async (
  videoId: string,
  lyrics: string[],
  timestampedLyrics: unknown[],
  onUpdate: (message: string) => void,
  onAnnotationInfo: (info: any) => void,
  onError: (error: string) => void,
  onTaskUpdate: (task: string) => void, // New callback for task updates
) => {
  const response = await fetch(`${BE_ADDRESS}/translate-annotate`, {
    method: 'POST',
    body: JSON.stringify({
      id: videoId,
      lyrics: lyrics,
      timestamped_lyrics: timestampedLyrics,
    }),
    headers: {
      Accept: 'application/x-ndjson, application/json, text/plain',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) throw new Error('Network response was not ok')
  if (!response.body)
    throw new Error('ReadableStream not yet supported in this browser')

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()

    if (done) break

    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')
    buffer = lines.pop() || '' // Keep the last incomplete line in the buffer

    for (const line of lines) {
      if (line.trim() === '') continue // Skip empty lines

      if (validateJSON(line)) {
        const content = JSON.parse(line)
        switch (content['type']) {
          case 'update':
          case 'data':
            onUpdate(content['data'])
            break
          case 'eng_translation':
          case 'chi_translation':
          case 'romaji_lyrics':
          case 'kanji_annotations':
            onAnnotationInfo(content)
            break
          case 'error':
            onError(content['data'])
            break
          case 'task_update':
            onTaskUpdate(content['data']) // Handle task updates
            break
          default:
            console.warn('Unknown message type:', content['type'])
        }
      } else {
        console.error('Invalid JSON:', line)
      }
    }
  }

  // Process any remaining data in the buffer
  if (buffer.trim() !== '') {
    try {
      const content = JSON.parse(buffer)
      switch (content['type']) {
        case 'update':
        case 'data':
          onUpdate(content['data'])
          break
        case 'eng_translation':
        case 'chi_translation':
        case 'romaji_lyrics':
        case 'kanji_annotations':
          onAnnotationInfo(content)
          break
        case 'error':
          onError(content['data'])
          break
        case 'task_update':
          onTaskUpdate(content['data']) // Handle task updates
          break
        default:
          console.warn('Unknown message type:', content['type'])
      }
    } catch (e) {
      console.error('Error parsing final buffer:', e)
    }
  }
}
