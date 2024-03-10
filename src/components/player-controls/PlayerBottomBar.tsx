import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { formatTimeDisplay } from '@/utils'
import { ChangeEvent, ForwardedRef, MouseEvent, useMemo } from 'react'
import ReactPlayer from 'react-player'
import CaptionDropdownButton from '../captions/CaptionDropdownButton'

import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import ShuffleOnIcon from '@mui/icons-material/ShuffleOn'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
// import ClosedCaptionOffIcon from '@mui/icons-material/ClosedCaptionOff';
import SubtitlesIcon from '@mui/icons-material/Subtitles'
// import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff'
import { cn } from '@/lib/utils'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import UploadIcon from '@mui/icons-material/Upload'
import VolumeControl from './VolumeControl'

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
    <div className='fixed bottom-0 inset-x-0 bg-gray border-t border-gray-100 dark:border-gray-800 bg-primary-500 bg-opacity-10'>
      <div className='h-1'>
        <Slider
          defaultValue={[0]}
          max={0.999999}
          step={0.000001}
          value={[getCurrentPlayedPercentage()]}
          onValueChange={(value) => handleSeekChange(value[0])}
        />
      </div>
      <div className='flex items-center justify-between sm:mx-2 py-2'>
        <div className='flex items-center lg:mr-6'>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <SkipPreviousIcon />
            <span className='sr-only'>Previous track</span>
          </Button>
          <Button
            className='rounded-full'
            size='icon'
            variant='ghost'
            onClick={handlePlayPause}>
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
            <span className='sr-only'>Play</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <SkipNextIcon />
            <span className='sr-only'>Next track</span>
          </Button>

          <VolumeControl
            volume={volume}
            muted={muted}
            handleVolumeChange={handleVolumeChange}
            handleToggleMuted={handleToggleMuted}
          />
          <div className='flex-between ml-2'>
            <span className='text-center hidden sm:inline'>
              {formattedPlayed}
            </span>
            <span className='text-center w-4 hidden sm:inline'>{' / '}</span>
            <span className='text-center hidden sm:inline'>
              {formattedDuration}
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        {/* <div className='flex flex-1 items-center justify-center gap-4'></div> */}
        <div className='flex items-center justify-end gap-1 md:gap-2 ml-6'>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ShuffleIcon />
            <span className='sr-only'>Shuffle</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <ClosedCaptionIcon />
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <SubtitlesIcon className='w-4 h-4' />
            <span className='sr-only'>Repeat</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <FullscreenIcon className='w-4 h-4' />
            <span className='sr-only'>Repeat</span>
          </Button>
          {/* Volume Control */}
        </div>
      </div>
    </div>
  )
}

export default PlayerBottomBar
