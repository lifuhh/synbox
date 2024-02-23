import { Button } from '@/components/ui/button'
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

const CaptionDropdownButton = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
  const [showPanel, setShowPanel] = useState<Checked>(false)

  const handleUploadClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    // Additional logic for handling the upload click can go here
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <SampleCaptionsIcon className='w-4 h-4' />
            <span className='sr-only'>Captions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 m-1 bg-primary'>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Choose Lyrics</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className=' bg-primary pb-2'>
                  <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}>
                    Official
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DialogTrigger asChild>
                    <DropdownMenuItem onClick={handleUploadClick}>
                      Upload Lyrics
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem>Edit Lyrics</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className=' bg-black' />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Choose Translation
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className=' bg-primary'>
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Chinese</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Upload Translation</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <LyricsUploadDialog />
    </Dialog>
  )
}
export default CaptionDropdownButton

function SampleCaptionsIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <rect x='1' y='4' width='22' height='16' rx='2' ry='2'></rect>
      <path d='M8 12c0 1.1.9 2 2 2h1v-4h-1c-1.1 0-2 .9-2 2z'></path>
      <path d='M14 12c0 1.1.9 2 2 2h1v-4h-1c-1.1 0-2 .9-2 2z'></path>
    </svg>
  )
}
