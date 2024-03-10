import { Button } from '@/components/ui/button'
import ClosedCaptionIcon from '@mui/icons-material/ClosedCaption'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
import { Dialog, DialogTrigger } from '../ui/dialog'
import LyricsUploadDialog from './LyricsUploadDialog'

type Checked = DropdownMenuCheckboxItemProps['checked']

interface CaptionDropdownButtonProps {
  handleToggleLyricsVisibility: (visibility: boolean) => void
}

// const PlayerBottomBar: React.FC<PlayerBottomBarProps> = ({

const CaptionDropdownButton: React.FC<CaptionDropdownButtonProps> = ({
  handleToggleLyricsVisibility,
}) => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleUploadClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    // Additional logic for handling the upload click can go here
  }

  const handleDialogOpen = (open: boolean) => {
    setDialogOpen(open)
    handleToggleLyricsVisibility(open)

    if (!open) {
      handleToggleLyricsVisibility(true)
    }
  }

  const handleDropdownOpen = (open: boolean) => {
    setDropdownOpen(open)
    if (!dialogOpen) {
      handleToggleLyricsVisibility(!open)
    } else {
      handleToggleLyricsVisibility(false)
    }
  }

  return (
    // <div className='cursor-pointer items-center flex flex-between'>
    <Dialog onOpenChange={handleDialogOpen} open={dialogOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={handleDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className='rounded-full'
            size='icon'
            variant='ghost'
            // onFocus={() => handleToggleLyricsVisibility(true)}
            // onBlur={() => handleToggleLyricsVisibility(false)}
          >
            <ClosedCaptionIcon sx={{ fontSize: 32 }} />
            <span className='sr-only'>Captions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 mb-3 ml-32 bg-primary cursor-pointer'>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='cursor-pointer'>
                Choose Lyrics
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className=' bg-primary mr-1 -my-2'>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      onClick={handleUploadClick}
                      className='cursor-pointer flex align-middle justify-center'>
                      Upload Lyrics
                    </DropdownMenuItem>
                  </DialogTrigger>
                  {/* //TODO: Edit Lyrics is advanced feature >> also adjust margin accordingly after adding */}
                  {/* <DropdownMenuItem className='cursor-pointer'>
                    Edit Lyrics
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator className='bg-secondary' />
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                    className='cursor-pointer'>
                    Official
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className=' bg-secondary' />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className='cursor-pointer'>
                Choose Translation
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className=' bg-primary mr-1 -my-20 pt-1.5'>
                  <DropdownMenuItem className='cursor-pointer'>
                    English
                  </DropdownMenuItem>
                  <DropdownMenuItem className='cursor-pointer'>
                    Chinese
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className='bg-secondary' />
                  <DropdownMenuItem className='cursor-pointer'>
                    Upload Translation
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LyricsUploadDialog />
    </Dialog>
    // </div>
  )
}
export default CaptionDropdownButton

