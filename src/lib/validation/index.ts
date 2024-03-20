import { z } from 'zod'

const YouTubeUrlRegex: RegExp =
  /(?:v=|\/)([0-9A-Za-z_-]{11})|youtu\.be\/([0-9A-Za-z_-]{11})/

export const YouTubeUrlValidation = z.string().trim().regex(YouTubeUrlRegex, {
  message: 'Invalid YouTube URL',
})
