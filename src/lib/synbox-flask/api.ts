import { SubtitleInfo } from '@/types'
import { validateJSON } from '@/utils'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const FlaskBEAddress = import.meta.env.VITE_SYNBOX_BE_URL

interface StreamData {
  type: 'update' | 'data' | 'vid_info'
  data: string | number
}

export const streamValidateVideoById = async (
  videoId: string,
  onUpdate: (message: string) => void,
  onVidInfo: (info: any) => void,
  onError: (error: string) => void,
) => {
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
) => {
  console.log('This is stream transcribe api call')
  console.log(videoId)
  console.log(JSON.stringify(subtitleInfo))

  const response = await fetch(`http://127.0.0.1:8080/transcribev2`, {
    method: 'POST',
    body: JSON.stringify({ id: videoId, subtitle_info: subtitleInfo }),
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
        }
      }
    })
  }
}


export const streamAnnotateVideoById = async (
videoId: string,
lyrics: string[],
timestampedLyrics: string[],
onUpdate: (message: string) => void,
onLyricsInfo: (info: any) => void,
onError: (error: string) => void,
) => {

  const response = await fetch(`http://127.0.0.1:8080/transcribev2`, {
    method: 'POST',
    body: JSON.stringify({ id: videoId, lyrics: lyrics, timestamped_lyrics: timestampedLyrics }),
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



}