import { Button } from '@/components/ui/button'
import { createContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBarToggleViewIcon } from '../svgicons'
import SearchBar from './SearchBar'

const SearchResultsFrameContext = createContext(false)

const SearchBarViewToggler = ({
  shouldDismissSearchBar,
  setIsSearchBarHidden,
  setShouldDismissSearchBar,
}: {
  setIsSearchBarHidden: React.Dispatch<React.SetStateAction<boolean>>
  shouldDismissSearchBar: boolean
  setShouldDismissSearchBar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [isSearchResultsFrameVisible, setIsSearchResultsFrameVisible] =
    useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const inputToggleFocusRef = useRef<HTMLInputElement>(null)

  const location = useLocation()

  const handleSearchBarViewToggle = () => {
    setIsHidden(!isHidden)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault()
        setIsHidden((current) => !current) // Toggle based on the current state directly
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, []) //

  useEffect(() => {
    // Focus the search bar when it shows up
    if (!isHidden && inputToggleFocusRef.current) {
      inputToggleFocusRef.current.focus()
    } else if (isHidden && inputToggleFocusRef.current) {
      inputToggleFocusRef.current.blur() // Unfocus the search input when it is hidden
    }
  }, [isHidden])

  useEffect(() => {
    if (location.pathname.includes('/v/')) {
      setIsHidden(true) // Hide the search bar when on the player route
    }

    if (location.pathname === '/') {
      setIsHidden(false) // Show the search bar when on the root route
    }
  }, [location.pathname])

  useEffect(() => {
    if (shouldDismissSearchBar) {
      setIsHidden(true)
      setIsSearchBarHidden(true) // Update the state in RootLayout
      setShouldDismissSearchBar(false)
    }
  }, [setShouldDismissSearchBar, shouldDismissSearchBar, setIsSearchBarHidden])

  return (
    <SearchResultsFrameContext.Provider value={isSearchResultsFrameVisible}>
      <div
        className={`flex flex-col justify-center items-center w-full pt-2 ml-20  `}
        id='searchbartoggler'>
        <div
          className={` ${
            isHidden ? 'slide-up-animation' : 'slide-down-animation'
          } `}>
          <SearchBar setIsSearchResultsFrameVisible={setIsSearchResultsFrameVisible} />
        </div>
        <div
          className={`absolute top-20 z-10 ${isSearchResultsFrameVisible ? 'hidden' : 'visible'} ${
            isHidden
              ? 'slide-search-toggle-icon-up-animation'
              : 'slide-search-toggle-icon-down-animation'
          } `}>
          <Button
            size='icon'
            variant='ghost'
            onClick={handleSearchBarViewToggle}>
            <SearchBarToggleViewIcon className=' h-10 w-10 text-gray-500 dark:text-gray-400' />
            <span className='sr-only'>Search View Toggle</span>
          </Button>
        </div>
      </div>
    </SearchResultsFrameContext.Provider>
  )
}

export default SearchBarViewToggler
