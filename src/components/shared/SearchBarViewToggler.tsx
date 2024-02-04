import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { SearchBarToggleViewIcon } from '../svgicons'
import SearchBar from './SearchBar'

const SearchBarViewToggler = () => {
  const [isHidden, setIsHidden] = useState(false)
  const inputToggleFocusRef = useRef<HTMLInputElement>(null)

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

  return (
    <div className={`flex flex-col justify-center items-center w-full px-10`}>
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
