import FavouritesButton from './FavouritesButton'
import SearchBarContainer from '../search/SearchBarContainer'
import NowPlayingDisplayInfo from './NowPlayingDisplayInfo'

const TopBar = () => {
  return (
    <div className='flex-between h-14 w-full pt-2 bg-teal-500 bg-opacity-5 z-50'>
      <NowPlayingDisplayInfo />
      <SearchBarContainer />
      <FavouritesButton />
    </div>
  )
}
export default TopBar
