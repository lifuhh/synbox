import FavouritesButton from '../favourites/FavouritesButton'
import NowPlayingDisplay from './NowPlayingDisplay'
import SearchBarViewToggler from './SearchBarViewToggler'

const TopBar = () => {
  return (
    <div className='flex justify-between items-start fixed top-0 left-0 w-full z-10'>
      <NowPlayingDisplay />
      <div className='flex-grow mx-5'>
        <SearchBarViewToggler />
      </div>
      <FavouritesButton />
    </div>
  )
}
export default TopBar
