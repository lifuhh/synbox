import VolumeMuteIcon from '@mui/icons-material/VolumeMute'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

import { useAppContext } from '@/context/AppContext'
import { useCallback, useState } from 'react'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'

import { mutedAtom } from '@/context/atoms'
import { useAtom } from 'jotai'

const VolumeControl = () => {
  const { volume, setVolume } = useAppContext()
  const [muted, setMuted] = useAtom(mutedAtom)

  const handleToggleMuted = useCallback(() => {
    setMuted(!muted)
  }, [muted, setMuted])

  const handleVolumeChange = useCallback(
    (value: number) => {
      // setMuted(value === 0)
      setVolume(value)
    },
    [setVolume],
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
          className={` duration-5000 z-10 w-32 transform transition-opacity ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
          value={[volume]}
        />
      )}
    </div>
  )
}
export default VolumeControl
