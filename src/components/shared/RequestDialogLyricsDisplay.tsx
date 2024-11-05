import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Edit2, RotateCcw, Save, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

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
  timestampedLyrics,
  isAiGenerated,
  onLyricsChange,
}) => {
  const [editMode, setEditMode] = useState(false)
  const [localLyrics, setLocalLyrics] = useState<Lyric[]>(timestampedLyrics)

  const handleDelete = (index: number) => {
    if (isAiGenerated) {
      const updatedLyrics = localLyrics.filter((_, i) => i !== index)
      setLocalLyrics(updatedLyrics)
      onLyricsChange(
        updatedLyrics.map((lyric) => lyric.lyric),
        updatedLyrics,
      )
    }
  }

  const handleSave = () => {
    setEditMode(false)
    onLyricsChange(
      localLyrics.map((lyric) => lyric.lyric),
      localLyrics,
    )
  }

  const handleCancel = () => {
    setLocalLyrics(timestampedLyrics)
    setEditMode(false)
  }

  const handleEdit = () => {
    if (isAiGenerated) {
      setEditMode(true)
    }
  }

  const handleLyricEdit = (index: number, newLyric: string) => {
    const updatedLyrics = localLyrics.map((lyric, i) =>
      i === index ? { ...lyric, lyric: newLyric } : lyric,
    )
    setLocalLyrics(updatedLyrics)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className='w-full'>
      <TooltipProvider>
        <h4 className='mb-2 text-lg font-bold'>Lyrics</h4>
        <ScrollArea
          className={`lyrics-scroll-area w-full rounded-md border bg-background p-4 ${isAiGenerated ? 'h-[40vh]' : 'h-[50vh]'}`}>
          {localLyrics.map((lyric, index) => (
            <div
              key={index}
              className='unselectable mb-2 flex w-full items-center justify-between rounded-lg bg-primary/40 p-2 hover:bg-secondary/80'>
              <span className='text-secondary-foreground mr-2 text-sm font-medium'>
                [{formatTime(lyric.start_time)} - {formatTime(lyric.end_time)}]
              </span>
              {isAiGenerated && editMode ? (
                <Input
                  value={lyric.lyric}
                  onChange={(e) => handleLyricEdit(index, e.target.value)}
                  className='unselectable flex-grow bg-background'
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
          <div className='flex-between mt-4 flex gap-2'>
            {!editMode ? (
              <>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger className='ml-1.5 cursor-default'>
                    <Button
                      onClick={handleEdit}
                      disabled={true}
                      variant='default'>
                      <Edit2 className='mr-2 h-4 w-4' />
                      Edit Lyrics
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side='bottom'
                    align='start'
                    className=' border-white bg-secondary p-2 text-white'>
                    Feature under development, please retry or report issue if
                    the transcription is bad
                  </TooltipContent>
                </Tooltip>
                <Button>Report Issue</Button>
              </>
            ) : (
              <>
                <Button onClick={handleSave} variant='default'>
                  <Save className='mr-2 h-4 w-4' />
                  Save Changes
                </Button>
                <Button onClick={handleCancel} variant='secondary'>
                  <RotateCcw className='mr-2 h-4 w-4' />
                  Reset Changes
                </Button>
              </>
            )}
          </div>
        )}
        {isAiGenerated ? (
          <p className='mt-2 text-sm text-yellow-600'>
            Lyrics are AI-transcribed, please edit to remove hallucinated lines
            if necessary.
          </p>
        ) : (
          <p className='mt-2 text-sm text-green-500'>
            Lyrics are originally uploaded by the channel.
          </p>
        )}
      </TooltipProvider>
    </div>
  )
}

export default RequestDialogLyricsDisplay
