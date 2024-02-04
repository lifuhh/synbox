import { TempSquareIconTest } from '../svgicons'
import { Button } from '../ui/button'

const FavouritesButton = () => {
  return (
    <div className='flex items-center justify-between p-5'>
      <Button
        className='inline-flex items-center justify-center p-2 rounded-md text-yellow-100 '
        aria-label='Toggle menu'>
        <TempSquareIconTest />
      </Button>
    </div>
  )
}
export default FavouritesButton
