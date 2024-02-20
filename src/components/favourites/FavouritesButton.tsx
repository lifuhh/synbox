import { TempSquareIconTest } from '../svgicons'

const FavouritesButton = () => {
  return (
    <div className='flex flex-shrink-0 items-center w-48'>
      <button
        className='inline-flex items-center justify-center p-2 rounded-md text-yellow-100'
        aria-label='Toggle menu'>
        <TempSquareIconTest />
      </button>
    </div>
  )
}
export default FavouritesButton
