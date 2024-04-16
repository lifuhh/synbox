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
import { Button } from '../ui/button'
import FavouritesDropdownItem from './FavouritesDropdownItem'

const FavouritesDropdownButton = ({
  buttonVisibility,
}: {
  buttonVisibility: boolean
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {' '}
              <Button
                variant='outline'
                size='icon'
                className={` border-primary hover:border-white ${buttonVisibility}`}>
                {/* <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' /> */}
                {/* <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' /> */}
                <QueueMusicOutlinedIcon className='fill-white' />

                <span className='sr-only'>Toggle Playlist</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Playlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={10}
        className='bg-dark-1 bg-opacity-95 border-primary w-[400px] h-[600px] border-[1px] overflow-auto'>
        <DropdownMenuLabel>Playing Next</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <FavouritesDropdownItem />
        <FavouritesDropdownItem />
        <FavouritesDropdownItem />
        <Divider my='xs' />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default FavouritesDropdownButton
