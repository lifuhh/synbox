/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SubtitleInfo } from '@/types';

const BE_ADDRESS = import.meta.env.VITE_SYNBOX_BE_URL
// const BE_ADDRESS = import.meta.env.VITE_SYNBOX_TEST_BE_URL



export const streamValidateVideoById = async (
  videoId: string,
  onUpdate: (message: string) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  signal?: AbortSignal
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
    const response = await fetch(`${BE_ADDRESS}/transcribev2`, {
      method: 'POST',
      body: JSON.stringify({ id: videoId, subtitle_info: subtitleInfo }),
      headers: {
        Accept: 'application/x-ndjson, application/json, text/plain',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
      },
      signal: signal || controller.signal,
      keepalive: true,
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
            processTranscriptionContent(content, onUpdate, onLyricsInfo, onError, onAiGenerated);
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
          processTranscriptionContent(content, onUpdate, onLyricsInfo, onError, onAiGenerated);
        } catch (e) {
          console.error('Error parsing line:', line);
          console.error('Parse error:', e);
          continue;
        }
      }
    }
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

export const streamAnnotateVideoById = async (
  videoId: string,
  lyrics: string[],
  timestampedLyrics: unknown[],
  onUpdate: (message: string) => void,
  onAnnotationInfo: (info: any) => void,
  onError: (error: string) => void,
  onTaskUpdate: (task: string) => void,
  signal?: AbortSignal
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

  try {
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
        'Connection': 'keep-alive',
      },
      signal: signal || controller.signal,
      keepalive: true,
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
            processAnnotationContent(content, onUpdate, onAnnotationInfo, onError, onTaskUpdate);
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
          processAnnotationContent(content, onUpdate, onAnnotationInfo, onError, onTaskUpdate);
        } catch (e) {
          console.error('Error parsing line:', line);
          console.error('Parse error:', e);
          continue;
        }
      }
    }
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


function processTranscriptionContent(
  content: any,
  onUpdate: (message: string) => void,
  onLyricsInfo: (info: any) => void,
  onError: (error: string) => void,
  onAiGenerated: (isAiGenerated: boolean) => void,
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
    case 'transcription':
      onLyricsInfo(content.data);
      break;
    case 'ai_generated':
      onAiGenerated(content.data);
      break;
    case 'error':
      onError(content.data);
      break;
    default:
      console.warn('Unknown message type:', content.type);
  }
}

function processAnnotationContent(
  content: any,
  onUpdate: (message: string) => void,
  onAnnotationInfo: (info: any) => void,
  onError: (error: string) => void,
  onTaskUpdate: (task: string) => void,
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
    case 'eng_translation':
    case 'chi_translation':
    case 'romaji_lyrics':
    case 'kanji_annotations':
      onAnnotationInfo(content);
      break;
    case 'task_update':
      onTaskUpdate(content.data);
      break;
    case 'error':
      onError(content.data);
      break;
    default:
      console.warn('Unknown message type:', content.type);
  }
}