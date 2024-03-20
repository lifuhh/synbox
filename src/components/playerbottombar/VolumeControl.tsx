import VolumeMuteIcon from '@mui/icons-material/VolumeMute'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

import { useAppContext } from '@/context/AppContext'
import { useCallback, useState } from 'react'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'

const VolumeControl = () => {
  const { muted, setPlayerMuted, volume, setVolume } = useAppContext()

  const handleToggleMuted = useCallback(() => {
    setPlayerMuted(!muted)
  }, [muted, setPlayerMuted])

  const handleVolumeChange = useCallback(
    (value: number) => {
      // setMuted(value === 0)
      setVolume(value)
    },
    [setVolume]
  )
  const [isHovering, setIsHovering] = useState<boolean>(false)

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='flex-around cursor-pointer'>
      <Button
        className='rounded-full'
        size='icon'
        variant='ghost'
        onClick={handleToggleMuted}>
        {muted ? (
          <VolumeOffIcon sx={{ fontSize: 32 }} />
        ) : volume == 0 ? (
          <VolumeMuteIcon sx={{ fontSize: 32 }} />
        ) : (
          <VolumeUpIcon sx={{ fontSize: 32 }} />
        )}
        <span className='sr-only'>Shuffle</span>
      </Button>
      {isHovering && (
        <Slider
          defaultValue={[0]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={(value) => handleVolumeChange(value[0])}
          className={` w-32 z-10 transform transition-opacity duration-5000 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          value={[volume]}
        />
      )}
    </div>
  )
}
export default VolumeControl
