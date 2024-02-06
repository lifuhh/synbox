import FavouritesButton from '../favourites/FavouritesButton'
import NowPlayingDisplay from './NowPlayingDisplay'
import SearchBarViewToggler from './SearchBarViewToggler'

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
    <div className='flex justify-between items-start fixed top-0 left-0 w-full z-10'>
      <NowPlayingDisplay />
      <div className='flex-grow mx-5'>
        <SearchBarViewToggler
          setIsSearchBarHidden={setIsSearchBarHidden}
          shouldDismissSearchBar={shouldDismissSearchBar}
          setShouldDismissSearchBar={setShouldDismissSearchBar}
        />
      </div>
      <FavouritesButton />
    </div>
  )
}
export default TopBar
