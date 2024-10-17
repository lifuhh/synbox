import { Button } from '@/components/ui/button'
import { useAppContext } from '@/context/AppContext'
import {
  globalControlsVisibilityAtom,
  lyricsControlVisibilityAtom,
} from '@/context/atoms'
import { useAtom, useAtomValue } from 'jotai'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

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
    <TooltipProvider delayDuration={0} skipDelayDuration={1000}>
      <Tooltip>
        <TooltipTrigger className='ml-1.5 cursor-default' asChild>
          <Button
            className={`absolute right-4 transition-all duration-200 
        ${isButtonVisible ? 'invisible-ring cursor-pointer opacity-100' : 'pointer-events-none  opacity-0'}`}
            style={{
              bottom: `${bottomBarHeight + 16}px`,
            }}
            size='icon'
            variant='default'
            onClick={() => setGlobalControlsVisible(!globalControlsVisible)}>
            {globalControlsVisible ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className='unhighlightable border-none bg-primary'
          align='end'
          hideWhenDetached={true}>
          {globalControlsVisible
            ? 'Hide Video Controls'
            : 'Show Video Controls'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default FloatingGlobalVisibilityToggle
