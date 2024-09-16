import { Button } from '@/components/ui/button'
import { useUploadHardCodedLyrics } from '@/lib/react-query/queriesAndMutations'
import React, { useState } from 'react'

interface RequestDialogUploadDisplayProps {
  id: string
  lyrics: string[]
  timestampedLyrics: any[]
  engTranslation: string[]
  chiTranslation: string[]
  romajiLyrics: string[]
  kanjiAnnotations: string[]
}

const RequestDialogUploadDisplay = ({
  id,
  lyrics,
  timestampedLyrics,
  engTranslation,
  chiTranslation,
  romajiLyrics,
  kanjiAnnotations,
}: RequestDialogUploadDisplayProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { mutate: uploadHardCodedLyrics } = useUploadHardCodedLyrics()

  console.log('Data:', id)
  console.log('Lyrics:', lyrics)
  console.log('Timestamp Lyrics', timestampedLyrics)

  const convertToRuby = (annotatedLine: string) => {
    const rubyLines = annotatedLine.replace(
      /([一-龯々]+)\[([^\]]+)\]/g,
      (match, kanji, reading) => {
        return `<ruby>${kanji}<rp>(</rp><rt>${reading}</rt><rp>)</rp></ruby>`
      },
    )
    return rubyLines.replace(/\[[^\]]+\]/g, '')
  }

  const handleUpload = () => {
    setIsUploading(true)
    setError(null)

    if (!Array.isArray(timestampedLyrics) || timestampedLyrics.length === 0) {
      setError('Timestamped lyrics are missing or invalid')
      setIsUploading(false)
      return
    }

    try {
      const formatTime = (seconds: number): string => {
        const pad = (num: number) => num.toString().padStart(2, '0')
        const roundedSeconds = Math.round(seconds * 1000) / 1000 // Round to 3 decimal places
        const hours = Math.floor(roundedSeconds / 3600)
        const minutes = Math.floor((roundedSeconds % 3600) / 60)
        const secs = Math.floor(roundedSeconds % 60)
        const milliseconds = Math.floor((roundedSeconds % 1) * 1000)
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)},${milliseconds.toString().padStart(3, '0')}`
      }

      const adjustedTimestampedLyrics = timestampedLyrics.map(
        (item, index) => ({
          id: (index + 1).toString(),
          startTime: formatTime(item.start_time),
          startSeconds: item.start_time,
          endTime: formatTime(item.end_time),
          endSeconds: item.end_time,
          text: item.lyric,
        }),
      )

      const labelledLyrics = adjustedTimestampedLyrics.map((item, index) => ({
        ...item,
        text: convertToRuby(kanjiAnnotations[index] || item.text),
      }))

      const lyricsData = {
        full_lyrics: JSON.stringify(adjustedTimestampedLyrics),
        plain_lyrics: JSON.stringify(lyrics),
        romaji: JSON.stringify(romajiLyrics),
        eng_translation: JSON.stringify(engTranslation),
        chi_translation: JSON.stringify(chiTranslation),
        labelled_full_lyrics: JSON.stringify(labelledLyrics),
      }

      uploadHardCodedLyrics(
        { songId: id, lyricsData },
        {
          onSuccess: () => {
            setIsUploading(false)
            // Handle successful upload (e.g., show a success message, close dialog)
          },
          onError: (error) => {
            setIsUploading(false)
            setError('Upload failed: ' + error.message)
            console.error('Upload failed:', error)
          },
        },
      )
    } catch (err) {
      setIsUploading(false)
      setError(
        'An error occurred while processing the data: ' +
          (err as Error).message,
      )
      console.error('Error processing data:', err)
    }
  }

  return (
    <div className='mt-4 w-full'>
      <h3 className='mb-4 text-xl font-bold'>Step 4: Upload Lyrics</h3>
      <p className='mb-4'>
        All data has been processed. Click the button below to upload the lyrics
        and translations.
      </p>
      {error && <p className='mb-4 text-red-500'>{error}</p>}
      <Button
        onClick={handleUpload}
        disabled={isUploading}
        className='invisible-ring bg-blue-500 text-white hover:bg-blue-600'>
        {isUploading ? 'Uploading...' : 'Upload Lyrics'}
      </Button>
    </div>
  )
}

export default RequestDialogUploadDisplay
