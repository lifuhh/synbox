import { useGetLyricsBySongId } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

interface RequestDialogFinalDisplayProps {
  vidInfo: {
    full_vid_info: {
      title: string
      id: string
      thumbnail: string
    }
  }
}

const RequestDialogFinalDisplay = ({
  vidInfo,
}: RequestDialogFinalDisplayProps) => {
  const navigate = useNavigate()

  const videoId = vidInfo?.full_vid_info?.id

  const { data: lyrics, isLoading: isLoadingLyrics } =
    useGetLyricsBySongId(videoId)

  useEffect(() => {
    if (!vidInfo || !vidInfo.full_vid_info) {
      navigate('/')
    }
  }, [vidInfo, navigate])

  if (!vidInfo || !vidInfo.full_vid_info) {
    return null
  }

  const {
    full_vid_info: { title, thumbnail },
  } = vidInfo

  const handlePlayClick = () => {
    navigate(`/v/${videoId}`, {
      state: { videoId: videoId },
    })
  }

  return (
    <div className='overflow-visible px-6'>
      <div className='flex flex-col items-center'>
        {/* <h1 className='unselectable pb-4 text-lg font-bold'>Enjoy the Song!</h1> */}
        <img
          src={thumbnail}
          alt={title}
          className='mb-4 w-full max-w-lg rounded-lg object-cover shadow-md'
        />
        <h4 className='mb-2 text-center text-xl font-semibold'>{title}</h4>
        {isLoadingLyrics ? (
          <p>Preparing your video...</p>
        ) : lyrics ? (
          <Button
            onClick={handlePlayClick}
            variant='default'
            className='mt-4 w-32'>
            Play
          </Button>
        ) : (
          <p className='text-yellow-500'>
            Lyrics data not found. Please try again later.
          </p>
        )}
      </div>
    </div>
  )
}

export default RequestDialogFinalDisplay
