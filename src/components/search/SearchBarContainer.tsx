// import { Button } from '@/components/ui/button'
// import { SearchBarToggleViewIcon } from '../svgicons'
import SearchBar from './SearchBar'

const SearchBarContainer = () => {
  return (
    <>
      <div className='flex-between flex-col max-w-full relative z-20'>
        <SearchBar />
        {/* <Button size='icon' variant='ghost' onClick={() => {}}>
          <SearchBarToggleViewIcon className='absolute top-15 h-10 w-10 text-gray-500 dark:text-gray-400' />
          <span className='sr-only'>Search View Toggle</span>
        </Button> */}
      </div>
    </>
  )
}

export default SearchBarContainer
