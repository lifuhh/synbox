import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { formatTimeDisplay } from '@/utils'
import { ChangeEvent, ForwardedRef, MouseEvent, useMemo } from 'react'
import ReactPlayer from 'react-player'
import CaptionDropdownButton from '../captions/CaptionDropdownButton'

interface PlayerBottomBarProps {
  playing: boolean
  loop: boolean
  muted: boolean
  volume: number
  played: number
  duration: number
  handlePlay: () => void
  handlePause: () => void
  handlePlayPause: () => void
  handleSeekMouseDown: () => void
  handleSeekChange: (value: number) => void
  handleSeekMouseUp: (e: MouseEvent<HTMLInputElement>) => void
  handleProgress: (state: { played: number; loaded: number }) => void
  handleToggleLoop: () => void
  handleVolumeChange: (value: number) => void
  handleToggleMuted: () => void
  playerRef: ForwardedRef<ReactPlayer>
}

const PlayerBottomBar: React.FC<PlayerBottomBarProps> = ({
  playing,
  loop,
  muted,
  volume,
  played,
  duration,
  playerRef,
  handlePlay,
  handlePause,
  handlePlayPause,
  handleSeekMouseDown,
  handleSeekChange,
  handleSeekMouseUp,
  handleProgress,
  handleToggleLoop,
  handleVolumeChange,
  handleToggleMuted,
}) => {
  console.log('Player Bottom Bar re-rendered...')

  const getCurrentPlayedPercentage = () => {
    return parseFloat((played / duration).toFixed(3))
  }

  const formattedPlayed = useMemo(() => formatTimeDisplay(played), [played])
  const formattedDuration = useMemo(
    () => formatTimeDisplay(duration),
    [duration]
  )

  return (
    <div className='fixed bottom-0 inset-x-0 bg-gray border-t border-gray-100 dark:border-gray-800'>
      <div className='flex items-center justify-between mx-4 py-2'>
        <div className='flex items-center gap-1 md:gap-2 mr-6'>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ChevronLeftIcon className='w-6 h-6' />
            <span className='sr-only'>Previous track</span>
          </Button>
          <Button
            className='rounded-full'
            size='icon'
            variant='ghost'
            onClick={handlePlayPause}>
            {playing ? (
              <PauseIcon className='w-6 h-6' />
            ) : (
              <PlayIcon className='w-6 h-6' />
            )}
            <span className='sr-only'>Play</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ChevronRightIcon className='w-6 h-6' />
            <span className='sr-only'>Next track</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            {/* <RepeatIcon className='w-4 h-4' /> */}
            <VolumeIcon className='w-6 h-6' />

            <span className='sr-only'>Repeat</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ShuffleIcon className='w-4 h-4' />
            <span className='sr-only'>Shuffle</span>
          </Button>
        </div>
        {/* Progress Bar */}
        <div className='flex flex-1 items-center justify-center gap-4'>
          <Slider
            defaultValue={[0]}
            max={0.999999}
            step={0.000001}
            className='flex-1'
            value={[getCurrentPlayedPercentage()]}
            onValueChange={(value) => handleSeekChange(value[0])}
          />
          {/* //TODO: Why the hell are the numbers causing the progress bar to change size?  */}
          <div className='flex-shrink-0 items-center'>
            <div>
              <span className='w-20 truncate'>{formattedPlayed}</span>
              <span className='w-16 '>{' / '}</span>
              <span className='w-20 truncate'>{formattedDuration}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-end gap-1 md:gap-2 ml-6'>
          <CaptionDropdownButton />
          <Button className='rounded-full' size='icon' variant='ghost'>
            <RepeatIcon className='w-4 h-4' />
            <span className='sr-only'>Repeat</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ShuffleIcon className='w-4 h-4' />
            <span className='sr-only'>Shuffle</span>
          </Button>
          {/* Volume Control */}
          <Slider
            defaultValue={[0]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => handleVolumeChange(value[0])}
            className='w-36'
            value={[volume]}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerBottomBar

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m15 18-6-6 6-6' />
    </svg>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m9 18 6-6-6-6' />
    </svg>
  )
}

function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polygon points='5 3 19 12 5 21 5 3' />
    </svg>
  )
}

function PauseIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <rect x='6' y='4' width='4' height='16' rx='1' ry='1' />
      <rect x='14' y='4' width='4' height='16' rx='1' ry='1' />
    </svg>
  )
}

function RepeatIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m17 2 4 4-4 4' />
      <path d='M3 11v-1a4 4 0 0 1 4-4h14' />
      <path d='m7 22-4-4 4-4' />
      <path d='M21 13v1a4 4 0 0 1-4 4H3' />
    </svg>
  )
}

function ShuffleIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22' />
      <path d='m18 2 4 4-4 4' />
      <path d='M2 6h1.9c1.5 0 2.9.9 3.6 2.2' />
      <path d='M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8' />
      <path d='m18 14 4 4-4 4' />
    </svg>
  )
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m22 8-6 4 6 4V8Z' />
      <rect width='14' height='12' x='2' y='6' rx='2' ry='2' />
    </svg>
  )
}

function VolumeIcon(props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='24'
      viewBox='0 0 24 24'
      width='24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z' />
    </svg>
  )
}
