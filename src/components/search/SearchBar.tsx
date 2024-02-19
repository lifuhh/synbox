import { Input } from '@/components/ui/input'
import { useGetLandingPagePlaylist } from '@/lib/react-query/queriesAndMutations'
import { forwardRef, useState } from 'react'
import { SearchIcon } from '../svgicons'
import SearchResultsFrame from './SearchResultsFrame'
import SearchResultsItem from './SearchResultsItem'

interface SearchBarProps {
  setIsSearchResultsFrameVisible: (visible: boolean) => void
  inputToggleFocusRef?: React.Ref<HTMLInputElement> // Make the ref optional
}

interface SearchResultProps {
  videoId: string
  title: string
  creator: string
  // Add other properties as needed
}

// const SearchBar = ({
//   setIsSearchResultsFrameVisible,
//   inputToggleFocusRef,
// }: SearchBarProps)

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ setIsSearchResultsFrameVisible }: SearchBarProps, inputToggleFocusRef) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [triggerSearch, setTriggerSearch] = useState(false)

    const { data: songList, isFetching: isSearchFetching } =
      useGetLandingPagePlaylist(triggerSearch ? searchTerm : '')

    //? Might be useful to have a ref for future use cases
    // const inputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)

      if (triggerSearch) setTriggerSearch(false)

      // Clear results when search term is empty
      if (e.target.value === '') {
        setIsSearchResultsFrameVisible(false)
      }
    }

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault()

      if (e.key === 'Enter') {
        setTriggerSearch(true)
        setIsSearchResultsFrameVisible(true)
      }
    }

    const handleListItemClick = () => {
      setSearchTerm('')
      setTriggerSearch(false)
      setIsSearchResultsFrameVisible(false)
      //TODO: add navigate to player based on selected item
    }

    return (
      <div className='flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg py-2 w-96'>
        <SearchIcon className='h-5 w-5 text-gray-500 dark:text-gray-400 m-2' />
        <Input
          // ref={inputToggleFocusRef}
          className='flex-1 bg-transparent text-black focus:ring-2 w-full mr-3 focus:ring-pink-600'
          placeholder='Search...'
          type='search'
          // value={searchTerm}
          // onChange={handleInputChange}
          onKeyDown={handleSearchSubmit}
        />
        {isSearchFetching && <div>Loading...</div>}
        {songList && songList.length > 0 && (
          <SearchResultsFrame
            isOpen={Boolean(songList && songList.length)}
            onSelect={handleListItemClick}>
            {songList.map((result: SearchResultProps) => (
              <SearchResultsItem
                key={result.videoId}
                videoId={result.videoId}
                title={result.title}
                creator={result.creator}
                onClick={handleListItemClick}
              />
            ))}
          </SearchResultsFrame>
        )}
      </div>
    )
  }
)

export default SearchBar
