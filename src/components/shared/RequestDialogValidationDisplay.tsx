import { Button } from '@/components/ui/button'
import { VideoInfo } from '@/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface DisplayVideoData {
  title: string
  id: string
  thumbnail: string
  likes?: number
  channel_name?: string
  passed: boolean
  subtitleInfo: {
    exist: boolean
    path: string | null
    ext: string | null
  }
}

const RequestDialogValidationDisplay = ({
  vidInfo,
}: {
  vidInfo: VideoInfo | null
}) => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [videoData, setVideoData] = useState<DisplayVideoData | null>(null)

  useEffect(() => {
    console.log(
      'RequestDialogValidationDisplay mounted with vidInfo:',
      JSON.stringify(vidInfo, null, 2),
    )

    try {
      if (!vidInfo) {
        console.error('vidInfo is null or undefined')
        setError('Video information is missing')
        return
      }

      if (!vidInfo.full_vid_info) {
        console.error('full_vid_info is missing from vidInfo:', vidInfo)
        setError('Complete video information is missing')
        return
      }

      const {
        full_vid_info: { title, id, thumbnail, likes, channel_name },
        passed,
        subtitle_info,
      } = vidInfo

      setVideoData({
        title,
        id,
        thumbnail,
        likes,
        channel_name,
        passed,
        subtitleInfo: subtitle_info,
      })

      console.log('Successfully parsed video info:', {
        title,
        id,
        thumbnail,
      })
    } catch (error: unknown) {
      console.error('Error processing vidInfo:', error)
      setError(
        `Error processing video information: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
      )
    }
  }, [vidInfo])

  if (error) {
    return (
      <div className='p-4 text-red-500'>
        <h3 className='mb-2 font-bold'>Error Loading Video Information</h3>
        <p>{error}</p>
        <Button
          onClick={() => navigate('/')}
          className='mt-4'
          variant='destructive'>
          Return Home
        </Button>
      </div>
    )
  }

  if (!videoData) {
    return (
      <div className='p-4 text-gray-500'>
        <p>Loading video information...</p>
      </div>
    )
  }

  const { title, thumbnail, likes, channel_name } = videoData

  return (
    <div className='overflow-visible px-6'>
      <div className='flex flex-col items-center'>
        <h1 className='unselectable pb-4 text-lg font-bold'>Song Info</h1>
        {thumbnail && (
          <div
            className='mb-4 aspect-video w-full max-w-lg rounded-lg bg-cover bg-center shadow-md'
            style={{ backgroundImage: `url(${thumbnail})` }}
            onError={(e: React.SyntheticEvent<HTMLDivElement, Event>) => {
              console.error('Error loading thumbnail')
              const target = e.currentTarget
              target.style.backgroundImage = 'none'
              target.style.backgroundColor = '#e5e7eb'
            }}
          />
        )}
        <h4 className='mb-2 text-center text-xl font-semibold'>{title}</h4>

        <div className='flex w-full max-w-2xl flex-col gap-y-2 px-3 pt-8 md:pt-4'>
          <InfoItem
            label='Channel'
            value={channel_name}
            fallback='Unknown Channel'
          />
          <InfoItem
            label='Likes'
            value={likes ? likes.toLocaleString() : 'N/A'}
          />
        </div>
      </div>
    </div>
  )
}

interface InfoItemProps {
  label: string
  value?: string | number | null
  valueClassName?: string
  fallback?: string
}

const InfoItem = ({
  label,
  value,
  valueClassName = '',
  fallback = 'N/A',
}: InfoItemProps) => (
  <div className='flex flex-col'>
    <span className='text-sm text-gray-500'>{label}</span>
    <span className={`font-medium ${valueClassName} pt-[1px]`}>
      {typeof value === 'object' ? value : value || fallback}
    </span>
  </div>
)

export default RequestDialogValidationDisplay
