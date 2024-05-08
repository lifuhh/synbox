import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { Divider } from '@mantine/core'
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined'

import { Button } from '@/components/ui/button'
import FavouritesDropdownItem from './FavouritesDropdownItem'
import { forwardRef } from 'react'

const FavouritesDropdownButton = ({
  buttonVisibility,
}: {
  buttonVisibility: string
}) => {
  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className={` border-primary hover:border-white ${buttonVisibility}`}>
                <QueueMusicOutlinedIcon className='fill-white' />
                <span className='sr-only'>Toggle Playlist</span>
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>
            <p>View Playlist</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          align='end'
          sideOffset={10}
          className='h-[600px] w-[400px] overflow-auto border-[1px] border-primary bg-dark-1 bg-opacity-95'>
          <DropdownMenuLabel>Playing Next</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <FavouritesDropdownItem />
          <FavouritesDropdownItem />
          <FavouritesDropdownItem />
          <Divider my='xs' />
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
export default FavouritesDropdownButton
