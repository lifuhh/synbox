import FavouritesButton from '../favourites/FavouritesButton'
import SearchBarViewToggler from '../search/SearchBarViewToggler'
import NowPlayingDisplay from './NowPlayingDisplay'

//TODO: Fix topbar css..

const TopBar = ({
  setIsSearchBarHidden,
  shouldDismissSearchBar,
  setShouldDismissSearchBar,
}: {
  shouldDismissSearchBar: boolean
  setIsSearchBarHidden: React.Dispatch<React.SetStateAction<boolean>>
  setShouldDismissSearchBar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className='flex items-center fixed top-0 left-0 w-full z-10'>
      <NowPlayingDisplay />
      <SearchBarViewToggler
        setIsSearchBarHidden={setIsSearchBarHidden}
        shouldDismissSearchBar={shouldDismissSearchBar}
        setShouldDismissSearchBar={setShouldDismissSearchBar}
      />
      <FavouritesButton />
    </div>
  )
}
export default TopBar
