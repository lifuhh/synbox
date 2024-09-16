import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import SearchResultTextDisplayer from './SearchResultTextDisplayer'

interface SearchResultsItemProps {
  videoId: string
  title: string
  creator: string
  thumbnailUrl: string
}

const SearchResultsItem = ({
  title,
  creator,
  thumbnailUrl,
  videoId,
}: SearchResultsItemProps) => {
  return (
    <Link to={`/v/${videoId}`}>
      <div
        className={`z-50 flex cursor-pointer items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-gray-800`}>
        <img
          alt='Avatar'
          className='rounded-full'
          height={40}
          src={thumbnailUrl}
          style={{
            aspectRatio: '40/40',
            objectFit: 'cover',
          }}
          width={40}
        />
        <SearchResultTextDisplayer
          title={title}
          misc={creator}
          fontSize='16px'
          color='blue'
          fontFamily='Helvetica'
        />
        <Button className='ml-auto' size='sm' variant='outline'>
          Add
        </Button>
      </div>
    </Link>
  )
}
export default SearchResultsItem
