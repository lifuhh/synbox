import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Button } from '../ui/button'

const FavouritesDropdownItem = () => {
  const author = 'Ayase / YOASOBI'
  const thumbnailUrl = 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg'
  const title = 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)'
  const videoId = 'VyvhvlYvRnc'

  return (
    <DropdownMenuItem>
      <div className='playlist-item flex h-full w-full items-center justify-center'>
        <img
          src={thumbnailUrl}
          className='rounded-xs h-14 w-auto object-cover'
        />
        <div className='marquee unselectable px-2'>
          <span>{title}</span>
        </div>
        <Button variant='ghost' className='ml-2 px-2 hover:bg-primary'>
          <RemoveCircleOutlineIcon />
        </Button>
      </div>
    </DropdownMenuItem>
  )
}
export default FavouritesDropdownItem
