import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

interface Lyric {
  start_time: number
  end_time: number
  duration: number
  lyric: string
}

interface RequestDialogLyricsDisplayProps {
  lyrics: {
    lyrics: string[]
    timestamped_lyrics: Lyric[]
  }
}

const RequestDialogLyricsDisplay: React.FC<RequestDialogLyricsDisplayProps> = ({
  lyrics,
}) => {
  const [lyricsState, setLyricsState] = useState<Lyric[]>([])
  const [editMode, setEditMode] = useState(false)
  const [tempLyrics, setTempLyrics] = useState<Lyric[]>([])

  useEffect(() => {
    setLyricsState(lyrics.timestamped_lyrics)
  }, [lyrics])

  const handleDelete = (index: number) => {
    setTempLyrics(tempLyrics.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    setLyricsState(tempLyrics)
    setEditMode(false)
    console.log('Updated lyrics:', tempLyrics)
    // You can add logic here to send the updated lyrics back to the parent component or API
  }

  const handleCancel = () => {
    setTempLyrics(lyricsState)
    setEditMode(false)
  }

  const handleEdit = () => {
    setTempLyrics([...lyricsState])
    setEditMode(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='flex max-h-[40vh] w-full flex-col items-center overflow-y-auto text-center'>
      {(editMode ? tempLyrics : lyricsState).map((lyric, index) => (
        <div
          key={index}
          className='mb-2 flex w-full items-center justify-between text-center'>
          <span className='mr-2 text-sm'>
            [{formatTime(lyric.start_time)} - {formatTime(lyric.end_time)}]{' '}
            {lyric.lyric}
          </span>
          {editMode && (
            <Button
              onClick={() => handleDelete(index)}
              variant='destructive'
              size='sm'>
              Delete
            </Button>
          )}
        </div>
      ))}
      <div className='mt-4 flex gap-2'>
        {!editMode ? (
          <Button onClick={handleEdit} variant='default'>
            Edit Lyrics
          </Button>
        ) : (
          <>
            <Button onClick={handleSave} variant='default'>
              Save Lyrics
            </Button>
            <Button onClick={handleCancel} variant='secondary'>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default RequestDialogLyricsDisplay
