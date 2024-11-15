import { SubtitleInfo } from '@/types'
import { validateJSON } from '@/utils'

const BE_ADDRESS = import.meta.env.VITE_SYNBOX_BE_URL
// const BE_ADDRESS = import.meta.env.VITE_SYNBOX_TEST_BE_URL

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
  signal?: AbortSignal
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const response = await fetch(`${BE_ADDRESS}/validate`, {
      method: 'POST',
      body: JSON.stringify({ id: videoId }),
      headers: {
        Accept: 'application/x-ndjson, application/json, text/plain',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
      },
      signal: signal || controller.signal,
      keepalive: true,
      // Add credentials if needed for your setup
      // credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    if (!response.body) {
      throw new Error('ReadableStream not supported');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let hasReceivedData = false;
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        if (!hasReceivedData) {
          throw new Error('Stream ended without receiving any data');
        }
        // Process any remaining data in buffer
        if (buffer.trim()) {
          try {
            const content = JSON.parse(buffer);
            processStreamContent(content, onUpdate, onVidInfo, onError);
          } catch (e) {
            console.error('Error parsing final buffer:', e);
          }
        }
        break;
      }

      hasReceivedData = true;
      buffer += decoder.decode(value, { stream: true });
      
      // Process complete lines
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

      for (const line of lines) {
        if (line.trim() === '') continue;

        try {
          const content = JSON.parse(line);
          processStreamContent(content, onUpdate, onVidInfo, onError);
        } catch (e) {
          console.error('Error parsing line:', line);
          console.error('Parse error:', e);
          continue;
        }
      }
    }

    onSuccess();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        onError('Request timed out');
      } else {
        onError(error.message);
      }
    } else {
      onError('An unknown error occurred');
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

function processStreamContent(
  content: any,
  onUpdate: (message: string) => void,
  onVidInfo: (info: any) => void,
  onError: (error: string) => void
) {
  if (!content || !content.type) {
    console.error('Invalid content received:', content);
    return;
  }

  switch (content.type) {
    case 'update':
    case 'data':
      onUpdate(content.data);
      break;
    case 'vid_info':
      onVidInfo(content.data);
      break;
    case 'error':
      onError(content.data);
      break;
    default:
      console.warn('Unknown message type:', content.type);
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
  // console.log('This is stream transcribe api call')
  // console.log(videoId)
  // console.log(JSON.stringify(subtitleInfo))

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
    console.log("Received chunk:", chunk); // Log raw chunk data
    console.log("Split lines:", lines);

    lines.forEach((line) => {

      // console.log("Received line: ")
      // console.log(line)

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
