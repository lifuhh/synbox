import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import SearchResultTextDisplayer from './SearchResultTextDisplayer'

interface SearchResultsItemProps {
  videoId: string
  title: string
  creator: string
  thumbnailUrl: string
  onSelect: () => void
}

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({
  title,
  creator,
  thumbnailUrl,
  videoId,
  onSelect,
}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    console.log('navigating to ' + videoId)

    navigate(`/v/${videoId}`, { state: { videoId: videoId } })
  }

  const handleUserClick = () => {
    onSelect()
    handleNavigate()
  }

  return (
    <div
      className={`cursor-pointer z-50 flex items-center gap-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800`}
      onClick={handleUserClick}>
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
  )
}
export default SearchResultsItem
