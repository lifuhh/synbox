import { useAppContext } from '@/context/AppContext'
import { mutedAtom } from '@/context/atoms'
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

const VolumeControl: React.FC<VolumeControlProps> = ({
  onMouseEnter,
  onMouseLeave,
  getButtonStyle,
  timeDisplay,
}) => {
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
          {muted ? (
            <VolumeOffIcon sx={{ fontSize: 32 }} />
          ) : volume == 0 ? (
            <VolumeMuteIcon sx={{ fontSize: 32 }} />
          ) : (
            <VolumeUpIcon sx={{ fontSize: 32 }} />
          )}
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
      <div className='transition-all duration-300 ease-in-out'>
        {timeDisplay}
      </div>
    </div>
  )
}

export default VolumeControl
