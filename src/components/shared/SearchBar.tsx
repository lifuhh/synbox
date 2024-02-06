import { Input } from '@/components/ui/input'
import { forwardRef } from 'react'
import { SearchIcon } from '../svgicons'

const SearchBar = forwardRef<HTMLInputElement>((props, inputToggleFocusRef) => {
  return (
    <div
      className='flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg w-full lg:w-2/5 py-2'
      >
      <SearchIcon className='h-5 w-5 text-gray-500 dark:text-gray-400 m-2' />
      <Input
        ref={inputToggleFocusRef}
        // className='ml-2 flex-1 bg-transparent text-black  focus:outline-none focus:ring-2 focus:ring-red'
        className='flex-1 bg-transparent text-black focus:ring-2 focus:ring-white w-3/4 mr-3'
        placeholder='Search...'
        type='search'
      />
    </div>
  )
})

export default SearchBar
