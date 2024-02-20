import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { ChangeEvent, ForwardedRef, MouseEvent } from 'react'
import ReactPlayer from 'react-player'

interface PlayerBottomBarProps {
  handlePlay: () => void
  handlePause: () => void
  handlePlayPause: () => void
  handleSeekMouseDown: () => void
  handleSeekChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSeekMouseUp: (e: MouseEvent<HTMLInputElement>) => void
  handleProgress: (state: { played: number; loaded: number }) => void
  handleToggleLoop: () => void
  handleVolumeChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleToggleMuted: () => void
  playerRef: ForwardedRef<ReactPlayer>
}

const PlayerBottomBar: React.FC<PlayerBottomBarProps> = ({
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
  return (
    <div className='fixed bottom-0 inset-x-0 bg-gray border-t border-gray-100 dark:border-gray-800'>
      <div className='mx-4 grid items-center grid-cols-3 py-2'>
        <div className='flex items-center gap-1 md:gap-4'>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ChevronLeftIcon className='w-6 h-6' />
            <span className='sr-only'>Previous track</span>
          </Button>
          <Button
            className='rounded-full'
            size='icon'
            variant='ghost'
            onClick={handlePlayPause}>
            <PlayIcon className='w-6 h-6' />
            <span className='sr-only'>Play</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ChevronRightIcon className='w-6 h-6' />
            <span className='sr-only'>Next track</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <RepeatIcon className='w-4 h-4' />
            <span className='sr-only'>Repeat</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ShuffleIcon className='w-4 h-4' />
            <span className='sr-only'>Shuffle</span>
          </Button>
        </div>
        {/* Progress Bar */}
        <div className='flex items-center justify-center'>
          <Slider defaultValue={[0]} max={100} step={1} className='' />
        </div>
        <div className='flex items-center justify-end gap-1 md:gap-4'>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <RepeatIcon className='w-4 h-4' />
            <span className='sr-only'>Repeat</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ShuffleIcon className='w-4 h-4' />
            <span className='sr-only'>Shuffle</span>
          </Button>
          {/* Volume Control */}
          <Slider defaultValue={[0]} max={100} step={1} className='w-36' />
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
