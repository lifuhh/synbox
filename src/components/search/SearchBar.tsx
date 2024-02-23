import { Input } from '@/components/ui/input'
import { useGetYoutubeSearchResults } from '@/lib/react-query/queriesAndMutations'
import { formattedSearchResult } from '@/types'
import { forwardRef, useRef, useState } from 'react'
import { SearchIcon } from '../svgicons'
import SearchResultsFrame from './SearchResultsFrame'
import SearchResultsItem from './SearchResultsItem'

interface SearchBarProps {
  setIsSearchResultsFrameVisible: (visible: boolean) => void
  inputToggleFocusRef?: React.Ref<HTMLInputElement> // Make the ref optional
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ setIsSearchResultsFrameVisible }: SearchBarProps, inputToggleFocusRef) => {
    const [searchTerm, setSearchTerm] = useState('')
    const searchTrigger = useRef(0)

    const { data: songList, isFetching: isSearchFetching } =
      useGetYoutubeSearchResults(searchTerm, searchTrigger.current)

    //? Might be useful to have a ref for future use cases
    // const inputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)

      // Clear results when search term is empty
      if (e.target.value === '') {
        setIsSearchResultsFrameVisible(false)
      }
    }

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        console.log('search triggered')
        searchTrigger.current++
        setIsSearchResultsFrameVisible(true)
      }
    }

    const handleListItemClick = () => {
      setSearchTerm('')
      setIsSearchResultsFrameVisible(false)
      //TODO: add navigate to player based on selected item
    }

    return (
      <div className='flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg py-2 w-96'>
        <SearchIcon className='h-5 w-5 text-gray-500 dark:text-gray-400 m-2' />
        <Input
          ref={inputToggleFocusRef}
          className='flex-1 bg-transparent text-black focus:ring-2 w-full mr-3 focus:ring-pink-600'
          placeholder='Search...'
          type='search'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleSearchSubmit}
        />
        {isSearchFetching && <div>Loading...</div>}
        {songList && songList.length > 0 && (
          <SearchResultsFrame
            isOpen={Boolean(songList && songList.length)}
            onSelect={handleListItemClick}>
            {songList.map((result: formattedSearchResult) => (
              <SearchResultsItem
                thumbnailUrl={result.thumbnailUrl}
                key={result.videoId}
                videoId={result.videoId}
                title={result.title}
                creator={result.channel}
              />
            ))}
          </SearchResultsFrame>
        )}
      </div>
    )
  }
)

export default SearchBar
