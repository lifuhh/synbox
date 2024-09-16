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

import { Button } from '@/components/ui/button'
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import FavouritesDropdownItem from './FavouritesDropdownItem'

import { Divider } from '@mantine/core'
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined'

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
                <BookmarksIcon className='fill-white' />
                <span className='sr-only'>Toggle Bookmarks</span>
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>
            <p>My Bookmarks</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          align='end'
          sideOffset={10}
          className='h-[600px] w-[400px] overflow-auto border-[1px] border-primary bg-dark-1 bg-opacity-95'>
          <DropdownMenuLabel>Bookmarked Songs</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <FavouritesDropdownItem />
          <FavouritesDropdownItem />
          <FavouritesDropdownItem />
          {/* <Divider my='xs' /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}
export default FavouritesDropdownButton
