import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/AppContext'
import {
  globalControlsVisibilityAtom,
  lyricsControlVisibilityAtom,
} from '@/context/atoms'
import { useAtom, useAtomValue } from 'jotai'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'

const FloatingGlobalVisibilityToggle = () => {
  const { playerControlsVisible, bottomBarHeight } = useAppContext()
  const [globalControlsVisible, setGlobalControlsVisible] = useAtom(
    globalControlsVisibilityAtom,
  )
  const lyricsControlVisible = useAtomValue(lyricsControlVisibilityAtom)

  // Determine if the button should be visible
  const isButtonVisible =
    !globalControlsVisible || (lyricsControlVisible && playerControlsVisible)

  if (!isButtonVisible) {
    return null
  }

  return (
    <Button
      className={`absolute right-4 transition-all duration-200
        ${isButtonVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      style={{
        bottom: `${bottomBarHeight + 16}px`,
      }}
      size='icon'
      variant='default'
      onClick={() => setGlobalControlsVisible(!globalControlsVisible)}>
      {globalControlsVisible ? <EyeIcon /> : <EyeOffIcon />}
    </Button>
  )
}

export default FloatingGlobalVisibilityToggle
