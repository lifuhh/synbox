import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SearchBarToggleViewIcon } from '../svgicons'
import SearchBar from './SearchBar'

//
//
//

const SearchBarViewToggler = ({
  shouldDismissSearchBar,
  setIsSearchBarHidden,
  setShouldDismissSearchBar,
}: {
  setIsSearchBarHidden: React.Dispatch<React.SetStateAction<boolean>>
  shouldDismissSearchBar: boolean
  setShouldDismissSearchBar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
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
    // Only focus when isHidden is false (search bar is visible)
    if (!isHidden && inputToggleFocusRef.current) {
      inputToggleFocusRef.current.focus()
    } else if (isHidden && inputToggleFocusRef.current) {
      inputToggleFocusRef.current.blur() // Unfocus the search input when it is hidden
    }
  }, [isHidden])

  useEffect(() => {
    if (location.pathname.includes('/v/')) {
      setIsHidden(true) // Show the search bar when on the PlayerPage route
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
    <div
      className={`flex flex-col justify-center items-center w-full px-10`}
      id='searchbartoggler'>
      <div
        className={`w-full flex justify-center items-center pt-2 ${
          isHidden ? 'slide-up-animation' : 'slide-down-animation'
        } `}>
        <SearchBar ref={inputToggleFocusRef} />
      </div>
      <div
        className={` pt-2 ${
          isHidden
            ? 'slide-search-toggle-icon-up-animation'
            : 'slide-search-toggle-icon-down-animation'
        } `}>
        <Button size='icon' variant='ghost' onClick={handleSearchBarViewToggle}>
          <SearchBarToggleViewIcon className='h-10 w-10 text-gray-500 dark:text-gray-400' />
          <span className='sr-only'>Search View Toggle</span>
        </Button>
      </div>
    </div>
  )
}

export default SearchBarViewToggler
