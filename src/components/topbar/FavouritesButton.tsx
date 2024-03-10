import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '../ui/button'

const FavouritesButton = () => {
  return (
    <div className='flex align-middle justify-end w-48'>
      <Button className='p-2 mx-2 text-white'>
        <MenuIcon sx={{ fontSize: 32 }} />
      </Button>
    </div>
  )
}
export default FavouritesButton
