import FavouritesButton from '../favourites/FavouritesButton'
import SearchBarContainer from '../search/SearchBarContainer'
import NowPlayingDisplayInfo from './NowPlayingDisplayInfo'


const TopBar = () => {
  return (
    <div className='flex-between fixed top-0 left-0 w-full z-10'>
      <NowPlayingDisplayInfo />
      <SearchBarContainer />
      <FavouritesButton />
    </div>
  )
}
export default TopBar
