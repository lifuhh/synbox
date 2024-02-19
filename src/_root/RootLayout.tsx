import { Outlet } from 'react-router-dom'

import TopBar from '@/components/shared/TopBar'
import { useEffect, useState } from 'react'

const RootLayout = () => {
  const [isSearchBarHidden, setIsSearchBarHidden] = useState(false)
  const [shouldDismissSearchBar, setShouldDismissSearchBar] = useState(false)

  // Listen for clicks outside the search bar area
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (isSearchBarHidden && event.target) {
        const searchBar = document.getElementById('searchbartoggler')
        if (searchBar && !searchBar.contains(event.target as Node)) {
          setShouldDismissSearchBar(true)
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isSearchBarHidden])

  // Listen for the "Esc" key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShouldDismissSearchBar(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Handle the dismissal of the search bar
  useEffect(() => {
    if (shouldDismissSearchBar) {
      setIsSearchBarHidden(true)
    }
  }, [shouldDismissSearchBar])

  return (
    <div className='w-full relative'>
      <TopBar
        shouldDismissSearchBar={shouldDismissSearchBar}
        setShouldDismissSearchBar={setShouldDismissSearchBar}
        setIsSearchBarHidden={setIsSearchBarHidden}
      />
      <section className='flex flex-row flex-1 h-full'>
        {/* Outlet lets us show what's gonna be on the Landing Page later */}
        <Outlet />
      </section>
    </div>
  )
}
export default RootLayout
