import { useAppContext } from '@/context/AppContext'
import { mutedAtom } from '@/context/atoms'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

import { useAtom } from 'jotai'
import React, { useCallback, useRef, useState } from 'react'
import { Button } from '../ui/button'
import VolumeControlSlider from './VolumeControlSlider'

interface VolumeControlProps {
  onMouseEnter: (buttonId: string) => void
  onMouseLeave: () => void
  getButtonStyle: (buttonId: string) => React.CSSProperties
  timeDisplay: React.ReactNode
}

const VolumeControl = ({
  onMouseEnter,
  onMouseLeave,
  getButtonStyle,
  timeDisplay,
}: VolumeControlProps) => {
  const { volume, setVolume } = useAppContext()
  const [muted, setMuted] = useAtom(mutedAtom)
  const [isHovering, setIsHovering] = useState(false)
  const volumeControlRef = useRef(null)

  const handleToggleMuted = useCallback(() => {
    setMuted(!muted)
  }, [muted, setMuted])

  const handleVolumeChange = useCallback(
    (value: number) => {
      setVolume(value)
    },
    [setVolume],
  )

  const handleVolumeControlMouseEnter = useCallback(() => {
    setIsHovering(true)
    onMouseEnter('volume')
  }, [onMouseEnter])

  const handleVolumeControlMouseLeave = useCallback(() => {
    setIsHovering(false)
    onMouseLeave()
  }, [onMouseLeave])

  const getVolumeIcon = () => {
    if (muted) {
      return <VolumeOffIcon sx={{ fontSize: 32 }} />
    } else if (volume === 0) {
      return <VolumeMuteIcon sx={{ fontSize: 32 }} />
    } else if (volume < 0.4) {
      return <VolumeDownIcon sx={{ fontSize: 32 }} />
    } else {
      return <VolumeUpIcon sx={{ fontSize: 32 }} />
    }
  }

  return (
    <div className='flex items-center'>
      <div
        ref={volumeControlRef}
        onMouseEnter={handleVolumeControlMouseEnter}
        onMouseLeave={handleVolumeControlMouseLeave}
        className='relative flex cursor-pointer items-center'>
        <Button
          className='rounded-full'
          size='icon'
          variant='ghost'
          onClick={handleToggleMuted}
          style={getButtonStyle('volume')}>
          {getVolumeIcon()}
          <span className='sr-only'>Volume</span>
        </Button>
        <div
          className={`overflow-visible transition-all duration-300 ease-in-out ${
            isHovering ? 'mr-2 w-32 opacity-100' : 'w-0 opacity-0'
          }`}>
          <VolumeControlSlider
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div className='-ml-2 transition-all duration-300 ease-in-out'>
        {timeDisplay}
      </div>
    </div>
  )
}

export default VolumeControl
