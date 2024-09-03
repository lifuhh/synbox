import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent as OriginalDropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/cn'
import SubtitlesIcon from '@mui/icons-material/Subtitles'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff'
import React, { useState } from 'react'
import LyricsVisibilityToggleGroup from '../lyrics-display/LyricsVisibilityToggleGroup'

const CenteredDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof OriginalDropdownMenuContent>,
  React.ComponentPropsWithoutRef<typeof OriginalDropdownMenuContent>
>(({ className, ...props }, ref) => (
  <OriginalDropdownMenuContent
    ref={ref}
    className={cn(
      'fixed bottom-16 left-1/2 -translate-x-1/2 transform',
      className,
    )}
    {...props}
  />
))

const LyricsControlBottomBarButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleDropdownOpen = (open: boolean) => {
    setDropdownOpen(open)
  }

  const romajiEnabled = true

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={handleDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button className='rounded-full' size='icon' variant='ghost'>
          {romajiEnabled ? (
            <SubtitlesIcon className='h-4 w-4' sx={{ fontSize: 32 }} />
          ) : (
            <SubtitlesOffIcon className='h-4 w-4' sx={{ fontSize: 32 }} />
          )}
          <span className='sr-only'>Toggle Romaji</span>
        </Button>
      </DropdownMenuTrigger>
      <CenteredDropdownMenuContent className='border-none pt-2 shadow-none outline-none'>
        <LyricsVisibilityToggleGroup />
      </CenteredDropdownMenuContent>
    </DropdownMenu>
  )
}

export default LyricsControlBottomBarButton
