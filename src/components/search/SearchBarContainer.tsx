import { Button } from '@/components/ui/button'
import { SearchBarToggleViewIcon } from '../svgicons'
import SearchBar from './SearchBar'

const SearchBarContainer = () => {
  return (
    <div className='hidden md:block' id='searchbartoggler'>
      <div className={`flex-center w-full pt-2`}>
        <SearchBar />
      </div>
      <div className={`absolute top-20 z-10`}>
        <Button size='icon' variant='ghost' onClick={() => {}}>
          <SearchBarToggleViewIcon className=' h-10 w-10 text-gray-500 dark:text-gray-400 pt-2' />
          <span className='sr-only'>Search View Toggle</span>
        </Button>
      </div>
    </div>
  )
}

export default SearchBarContainer
