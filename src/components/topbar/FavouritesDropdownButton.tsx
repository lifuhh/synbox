import { Button } from '@/components/ui/button'
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
import BookmarksIcon from '@mui/icons-material/Bookmarks'
import { Bookmark } from 'lucide-react'
import React from 'react'
import FavouritesDropdownItem from './FavouritesDropdownItem'

const FavouritesDropdownButton = ({ buttonVisibility }) => {
  const sampleItems = [
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'yzTuBuRdAyA',
      title: 'Ado Gira Gira',
      author: 'The Beatles',
      thumbnailUrl: 'https://i.ytimg.com/vi/yzTuBuRdAyA/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'yzTuBuRdAyA',
      title: 'Ado Gira Gira',
      author: 'The Beatles',
      thumbnailUrl: 'https://i.ytimg.com/vi/yzTuBuRdAyA/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'yzTuBuRdAyA',
      title: 'Ado Gira Gira',
      author: 'The Beatles',
      thumbnailUrl: 'https://i.ytimg.com/vi/yzTuBuRdAyA/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'yzTuBuRdAyA',
      title: 'Ado Gira Gira',
      author: 'The Beatles',
      thumbnailUrl: 'https://i.ytimg.com/vi/yzTuBuRdAyA/hqdefault.jpg',
    },
  ]

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant='secondary'
                size='icon'
                className={`border-primary hover:border-white ${buttonVisibility}`}>
                <BookmarksIcon className='h-6 w-6' />
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
          className='max-h-[600px] w-[400px] max-w-[400px] overflow-auto border border-primary bg-background/95'>
          <DropdownMenuLabel className='m-2 mb-0 text-xl'>
            Saved Songs
          </DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          {sampleItems.map((item) => (
            <FavouritesDropdownItem key={item.videoId} {...item} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

export default FavouritesDropdownButton
