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
      <div className='flex w-full h-full justify-center items-center playlist-item'>
        <img
          src={thumbnailUrl}
          className='h-14 w-auto object-cover rounded-xs'
        />
        <div className='marquee px-2'>
          <span>{title}</span>
        </div>
        <Button variant='ghost' className='px-2 ml-2 hover:bg-primary'>
          <RemoveCircleOutlineIcon />
        </Button>
      </div>
    </DropdownMenuItem>
  )
}
export default FavouritesDropdownItem
