import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { formatTimeDisplay } from '@/utils'
import {
  ForwardedRef,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import LyricsDropdownButton from '../lyrics-display/LyricsDropdownButton'

import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RepeatIcon from '@mui/icons-material/Repeat'
import RepeatOnIcon from '@mui/icons-material/RepeatOn'
import SettingsIcon from '@mui/icons-material/Settings'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
// import ClosedCaptionOffIcon from '@mui/icons-material/ClosedCaptionOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import SubtitlesIcon from '@mui/icons-material/Subtitles'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff'
import React from 'react'
import VolumeControl from './VolumeControl'

import { useAppContext } from '@/context/AppContext'

interface PlayerBottomBarProps {
  playing: boolean
  loop: boolean
  played: number
  duration: number
  romajiEnabled: boolean
  handlePlay: () => void
  handlePause: () => void
  handlePlayPause: () => void
  handleSeekMouseDown: () => void
  handleSeekChange: (value: number) => void
  handleSeekMouseUp: (e: MouseEvent<HTMLInputElement>) => void
  handleProgress: (state: { played: number; loaded: number }) => void
  handleToggleLoop: () => void
  handleToggleRomajiVisibility: () => void
  handleToggleTranslationVisibility: () => void
  handleToggleLyricsVisibility: (visibility: boolean) => void
  playerRef: React.MutableRefObject<ReactPlayer | null>
}

const PlayerBottomBar: React.FC<PlayerBottomBarProps> = ({
  playing,
  loop,
  played,
  duration,
  romajiEnabled,
  playerRef,
  handlePlay,
  handlePause,
  handlePlayPause,
  handleSeekMouseDown,
  handleSeekChange,
  handleSeekMouseUp,
  handleProgress,
  handleToggleLoop,
  handleToggleRomajiVisibility,
  handleToggleTranslationVisibility,
  handleToggleLyricsVisibility,
}) => {
  const bottomBarRef = useRef<HTMLDivElement>(null)
  // console.log('Player Bottom Bar re-rendered...')
  const {
    playerControlsVisible,
    isFullscreen,
    setIsFullscreen,
    setBottomBarHeight,
  } = useAppContext()

  const getCurrentPlayedPercentage = useCallback(() => {
    if (isNaN(played) || isNaN(duration) || duration === 0) {
      return 0
    }

    return parseFloat((played / duration).toFixed(3))
  }, [duration, played])

  const formattedPlayed = useMemo(() => formatTimeDisplay(played), [played])
  const formattedDuration = useMemo(
    () => formatTimeDisplay(duration),
    [duration],
  )

  //? Calculate Bottom Bar Height
  useEffect(() => {
    if (bottomBarRef.current && setBottomBarHeight) {
      setBottomBarHeight(bottomBarRef.current.offsetHeight)
    }
  }, [bottomBarRef, setBottomBarHeight])

  //? Screenfull lib to handle toggling of full screen
  const handleFullscreen = useCallback(() => {
    if (screenfull.isEnabled) {
      screenfull.toggle()

      if (screenfull.isFullscreen) {
        setIsFullscreen(false)
      } else {
        setIsFullscreen(true)
      }
    }
  }, [setIsFullscreen])

  //TODO: Supposed to toggle playpause when user hits space - doesnt work - why? fix
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault()
        // Check if the pressed key is the spacebar
        handlePlayPause() // Toggle play/pause
      }
    }
    // Add event listener for 'keydown' event on the document
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlePlayPause])

  return (
    // <div
    //   className={`fixed inset-x-0 bottom-0 bg-dark-3
    //   ${
    //     playing
    //       ? isFullscreen
    //         ? 'bg-opacity-0'
    //         : 'bg-opacity-15'
    //       : 'bg-opacity-100'
    //   }
    //   controls ${playerControlsVisible ? 'visible bg-opacity-15' : 'hidden'}

    //   `}>
    <div
      ref={bottomBarRef}
      className={`controls fixed inset-x-0 bottom-0 bg-dark-3 ${playerControlsVisible ? 'visible' : 'hidden'}`}>
      <div className='h-1 cursor-pointer'>
        <Slider
          defaultValue={[0]}
          max={0.999999}
          step={0.000001}
          value={[getCurrentPlayedPercentage()]}
          onValueChange={(value) => handleSeekChange(value[0])}
        />
      </div>
      <div className='flex items-center justify-between py-2 sm:mx-2'>
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
            {playing ? (
              <PauseIcon sx={{ fontSize: 32 }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 32 }} />
            )}
            <span className='sr-only'>Play</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <SkipNextIcon sx={{ fontSize: 32 }} />
            <span className='sr-only'>Next track</span>
          </Button>

          <VolumeControl />
          <div className='flex-between unselectable ml-2'>
            <span className='hidden w-12 text-center sm:inline'>
              {formattedPlayed}
            </span>
            <span className='hidden w-4 text-center sm:inline'>{'/'}</span>
            <span className='hidden text-center sm:inline'>
              {formattedDuration}
            </span>
          </div>
        </div>

        <div className='ml-6 flex items-center justify-end gap-1 md:gap-2'>
          {/* //! Shuffle Play */}
          <Button
            className='rounded-full'
            size='icon'
            variant='ghost'
            onClick={handleToggleLoop}>
            {loop ? (
              <RepeatOnIcon sx={{ fontSize: 32 }} />
            ) : (
              <RepeatIcon sx={{ fontSize: 32 }} />
            )}
            <span className='sr-only'>Shuffle</span>
          </Button>
          {/* //! Subtitles Selection & Upload */}
          <LyricsDropdownButton
            handleToggleLyricsVisibility={handleToggleLyricsVisibility}
          />
          {/* //! Translation Selection */}
          <Button
            className='rounded-full'
            size='icon'
            variant='ghost'
            onClick={handleToggleRomajiVisibility}>
            {romajiEnabled ? (
              <SubtitlesIcon className='h-4 w-4' sx={{ fontSize: 32 }} />
            ) : (
              <SubtitlesOffIcon className='h-4 w-4' sx={{ fontSize: 32 }} />
            )}
            <span className='sr-only'>Toggle Romaji</span>
          </Button>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <SettingsIcon className='h-4 w-4' sx={{ fontSize: 32 }} />
            <span className='sr-only'>Settings</span>
          </Button>
          {/* //*TODO: Handle Dismissing Top Bar & Bottom Bar to make more space  */}
          <Button
            className='rounded-full'
            size='icon'
            variant='ghost'
            onClick={handleFullscreen}>
            {isFullscreen ? (
              <FullscreenExitIcon className='h-4 w-4' sx={{ fontSize: 32 }} />
            ) : (
              <FullscreenIcon className='h-4 w-4' sx={{ fontSize: 32 }} />
            )}
            <span className='sr-only'>Fullscreen</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export const MemoizedPlayerBottomBar = React.memo(PlayerBottomBar)
