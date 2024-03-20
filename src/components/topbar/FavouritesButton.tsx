import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '../ui/button'

const FavouritesButton = () => {
  return (
    // <div className='flex w-48 align-end justify-end'>
    <Button className='p-2 mx-4 text-white'>
      <MenuIcon sx={{ fontSize: 32 }} />
    </Button>
    // </div>
  )
}
export default FavouritesButton
