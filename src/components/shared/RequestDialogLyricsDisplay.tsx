import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Edit2, Save, Trash2, X } from 'lucide-react'
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

const RequestDialogLyricsDisplay: React.FC<RequestDialogLyricsDisplayProps> = ({
  lyrics,
  timestampedLyrics,
  isAiGenerated,
  onLyricsChange,
}) => {
  const [lyricsState, setLyricsState] = useState<Lyric[]>([])
  const [editMode, setEditMode] = useState(false)
  const [tempLyrics, setTempLyrics] = useState<Lyric[]>([])

  useEffect(() => {
    setLyricsState(timestampedLyrics)
    setTempLyrics(timestampedLyrics)
  }, [timestampedLyrics])

  const handleDelete = (index: number) => {
    if (isAiGenerated) {
      const updatedLyrics = tempLyrics.filter((_, i) => i !== index)
      setTempLyrics(updatedLyrics)
      onLyricsChange(
        updatedLyrics.map((lyric) => lyric.lyric),
        updatedLyrics,
      )
    }
  }

  const handleSave = () => {
    setLyricsState(tempLyrics)
    setEditMode(false)
    onLyricsChange(
      tempLyrics.map((lyric) => lyric.lyric),
      tempLyrics,
    )
  }

  const handleCancel = () => {
    setTempLyrics(lyricsState)
    setEditMode(false)
  }

  const handleEdit = () => {
    if (isAiGenerated) {
      setTempLyrics([...lyricsState])
      setEditMode(true)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  const handleLyricEdit = (index: number, newLyric: string) => {
    if (isAiGenerated) {
      const updatedLyrics = tempLyrics.map((lyric, i) =>
        i === index ? { ...lyric, lyric: newLyric } : lyric,
      )
      setTempLyrics(updatedLyrics)
    }
  }

  return (
    <div className='mt-4 w-full'>
      <h4 className='mb-2 text-lg font-bold'>Lyrics</h4>
      <ScrollArea className='h-[40vh] w-full rounded-md border p-4'>
        {(editMode ? tempLyrics : lyricsState).map((lyric, index) => (
          <div
            key={index}
            className='mb-2 flex w-full items-center justify-between rounded-lg bg-secondary p-2 hover:bg-secondary/80'>
            <span className='text-secondary-foreground mr-2 text-sm font-medium'>
              [{formatTime(lyric.start_time)} - {formatTime(lyric.end_time)}]
            </span>
            {isAiGenerated && editMode ? (
              <Input
                value={lyric.lyric}
                onChange={(e) => handleLyricEdit(index, e.target.value)}
                className='flex-grow bg-background'
              />
            ) : (
              <span className='flex-grow'>{lyric.lyric}</span>
            )}
            {isAiGenerated && editMode && (
              <Button
                onClick={() => handleDelete(index)}
                variant='ghost'
                size='sm'
                className='ml-2'>
                <Trash2 className='h-4 w-4' />
              </Button>
            )}
          </div>
        ))}
      </ScrollArea>
      {isAiGenerated && (
        <div className='mt-4 flex gap-2'>
          {!editMode ? (
            <Button onClick={handleEdit} variant='default'>
              <Edit2 className='mr-2 h-4 w-4' />
              Edit Lyrics
            </Button>
          ) : (
            <>
              <Button onClick={handleSave} variant='default'>
                <Save className='mr-2 h-4 w-4' />
                Save Lyrics
              </Button>
              <Button onClick={handleCancel} variant='secondary'>
                <X className='mr-2 h-4 w-4' />
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
