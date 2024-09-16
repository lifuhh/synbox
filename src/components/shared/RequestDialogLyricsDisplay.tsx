import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

interface Lyric {
  start_time: number
  end_time: number
  duration: number
  lyric: string
}

interface RequestDialogLyricsDisplayProps {
  lyrics: string[]
  timestampedLyrics: Lyric[]
  isAiGenerated: boolean
  onLyricsChange: (
    updatedLyrics: string[],
    updatedTimestampedLyrics: Lyric[],
  ) => void
}

const RequestDialogLyricsDisplay = ({
  lyrics,
  timestampedLyrics,
  isAiGenerated,
  onLyricsChange,
}: RequestDialogLyricsDisplayProps) => {
  const [lyricsState, setLyricsState] = useState<Lyric[]>([])
  const [editMode, setEditMode] = useState(false)
  const [tempLyrics, setTempLyrics] = useState<Lyric[]>([])

  console.log('Lyrics arrived stage 2: ')
  console.log(lyrics)

  useEffect(() => {
    setLyricsState(timestampedLyrics)
  }, [timestampedLyrics])

  const handleDelete = (index: number) => {
    setTempLyrics(tempLyrics.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    setLyricsState(tempLyrics)
    setEditMode(false)
    const updatedLyrics = tempLyrics.map((lyric) => lyric.lyric)
    onLyricsChange(updatedLyrics, tempLyrics)
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

  const handleLyricEdit = (index: number, newLyric: string) => {
    const updatedLyrics = tempLyrics.map((lyric, i) =>
      i === index ? { ...lyric, lyric: newLyric } : lyric,
    )
    setTempLyrics(updatedLyrics)
  }

  return (
    <div className='mt-4 w-full'>
      <h4 className='mb-2 font-bold'>Lyrics:</h4>
      <div className='max-h-[40vh] w-full overflow-y-auto'>
        {(editMode ? tempLyrics : lyricsState).map((lyric, index) => (
          <div
            key={index}
            className='mb-2 flex w-full items-center justify-between'>
            <span className='mr-2 text-sm'>
              [{formatTime(lyric.start_time)} - {formatTime(lyric.end_time)}]{' '}
            </span>
            {editMode ? (
              <input
                type='text'
                value={lyric.lyric}
                onChange={(e) => handleLyricEdit(index, e.target.value)}
                className='flex-grow'
              />
            ) : (
              <span>{lyric.lyric}</span>
            )}
            {isAiGenerated && editMode && (
              <Button
                onClick={() => handleDelete(index)}
                variant='destructive'
                size='sm'>
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
      {isAiGenerated && (
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
      )}
      {isAiGenerated && (
        <p className='mt-2 text-sm text-yellow-600'>
          These lyrics are AI-generated. Please review and edit if necessary.
        </p>
      )}
    </div>
  )
}

export default RequestDialogLyricsDisplay
