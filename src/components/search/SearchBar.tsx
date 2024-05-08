import { Input } from '@/components/ui/input'
import { useGetYoutubeSearchResults } from '@/lib/react-query/queriesAndMutations'
import { formattedSearchResult } from '@/types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import SearchResultsFrame from './SearchResultsFrame'
import SearchResultsItem from './SearchResultsItem'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: songList, isFetching: isSearchFetching } =
    useGetYoutubeSearchResults(searchTerm)

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // console.log('search enter pressed & triggered')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    // Clear results when search term is empty
    if (e.target.value === '') {
      //
    }
  }

  const handleListItemClick = () => {
    setSearchTerm('')
  }

  return (
    <div className='flex items-center justify-between rounded-lg bg-gray-100 py-1 dark:bg-gray-800 md:w-96'>
      <SearchIcon className='m-2 text-primary' sx={{ fontSize: 26 }} />
      <Input
        className='mr-3 w-full flex-1 bg-transparent text-black focus:ring-2 focus:ring-pink-600'
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

export default SearchBar
