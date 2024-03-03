import { Input } from '@/components/ui/input'
import { useGetYoutubeSearchResults } from '@/lib/react-query/queriesAndMutations'
import { formattedSearchResult } from '@/types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRef, useState } from 'react'
import { SearchIcon } from '../svgicons'
import SearchResultsFrame from './SearchResultsFrame'
import SearchResultsItem from './SearchResultsItem'


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const { data: songList, isFetching: isSearchFetching } =
      useGetYoutubeSearchResults(searchTerm)



    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        console.log('search enter pressed & triggered')
      }
    }

    const handleListItemClick = () => {
      setSearchTerm('')
    }

    return (
      <div className='flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg py-2 w-96'>
        <SearchIcon className='h-5 w-5 text-gray-500 dark:text-gray-400 m-2' />
        <Input
          className='flex-1 bg-transparent text-black focus:ring-2 w-full mr-3 focus:ring-pink-600'
          placeholder='Search...'
          type='search'
          value={searchTerm}
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

export default SearchBar
