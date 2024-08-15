import { useAppContext } from '@/context/AppContext'
import { mutedAtom } from '@/context/atoms'
import VolumeMuteIcon from '@mui/icons-material/VolumeMute'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import { useAtom } from 'jotai'
import React, { useCallback, useState } from 'react'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'

const VolumeControl = ({
  onMouseEnter,
  onMouseLeave,
  getButtonStyle,
  timeDisplay,
}) => {
  const { volume, setVolume } = useAppContext()
  const [muted, setMuted] = useAtom(mutedAtom)
  const [isHovering, setIsHovering] = useState(false)

  const handleToggleMuted = useCallback(() => {
    setMuted(!muted)
  }, [muted, setMuted])

  const handleVolumeChange = useCallback(
    (value: number) => {
      setVolume(value)
    },
    [setVolume],
  )

  return (
    <div
      onMouseEnter={() => {
        setIsHovering(true)
        onMouseEnter('volume')
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        onMouseLeave()
      }}
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
      <div className='flex items-center'>
        <div
          className={`overflow-visible transition-all duration-300 ease-in-out ${
            isHovering ? 'mr-2 w-32 opacity-100' : 'w-0 opacity-0'
          }`}>
          <Slider
            defaultValue={[0]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(value) => handleVolumeChange(value[0])}
            className='volume-slider w-32'
            value={[volume]}
          />
        </div>
        <div className='transition-all duration-300 ease-in-out'>
          {timeDisplay}
        </div>
      </div>
    </div>
  )
}

export default VolumeControl
