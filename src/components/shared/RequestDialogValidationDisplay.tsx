/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { Check, ExternalLink, X } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RequestDialogValidationDisplay = ({ vidInfo }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!vidInfo || !vidInfo.full_vid_info) {
      // Redirect to homepage if vidInfo or full_vid_info is missing
      navigate('/')
    }
  }, [vidInfo, navigate])

  // If vidInfo or full_vid_info is missing, don't render anything
  if (!vidInfo || !vidInfo.full_vid_info) {
    return null
  }

  const {
    full_vid_info: { title, id, thumbnail, likes, uploader, channel_name },
    passed,
    subtitle_info: { exist: subtitlesExist, cleaned: subtitlesCleaned },
  } = vidInfo

  //? Reference for adding a button to youtube given video ID
  const youtubeUrl = `https://www.youtube.com/watch?v=${id}`

  return (
    <div className='overflow-visible px-6'>
      <div className='flex flex-col items-center'>
        <h1 className='unselectable pb-4 text-lg font-bold'>Song Info</h1>
        {/* <img
          src={thumbnail}
          alt={title}
          className='mb-4 aspect-video w-full max-w-lg rounded-lg object-cover shadow-md'
        /> */}
        <div
          className='mb-4 aspect-video w-full max-w-lg rounded-lg bg-cover bg-center shadow-md'
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
        <h4 className='mb-2 text-center text-xl font-semibold'>{title}</h4>

        <div className='flex w-full max-w-2xl flex-col gap-y-2 px-3 pt-8 md:pt-4'>
          {/* <InfoItem label='Video ID' value={id} /> */}
          <InfoItem label='Channel' value={channel_name && channel_name} />
          {/* <InfoItem label='Uploader' value={uploader} /> */}
          <InfoItem label='Likes' value={likes && likes.toLocaleString()} />
          <div>
            {/* <InfoItem
              label='Lyrics'
              value={
                subtitlesExist ? (
                  <Check className='text-green-500' />
                ) : (
                  <X className='text-red-500' />
                )
              }
            /> */}
            {/* <InfoItem
              label='Cleansed'
              value={
                subtitlesExist ? (
                  subtitlesCleaned ? (
                    <span className='flex items-center'>
                      <Check className='mr-1 text-green-500' />
                      Cleaned
                    </span>
                  ) : (
                    <Check className='text-green-500' />
                  )
                ) : (
                  <X className='text-red-500' />
                )
              }
            /> */}
          </div>
          {/* <InfoItem
            label='Validation'
            value={passed ? 'Passed' : 'Failed'}
            valueClassName={passed ? 'text-green-500' : 'text-red-500'}
          /> */}
        </div>

        {/* //? Reference for adding a button to youtube given video ID */}
        {/* <Button
          variant='outline'
          className='mb-4'
          onClick={() =>
            window.open(youtubeUrl, '_blank', 'noopener,noreferrer')
          }>
          <ExternalLink className='mr-2 h-4 w-4' />
          View on YouTube
        </Button> */}
      </div>
    </div>
  )
}

const InfoItem = ({ label, value, valueClassName = '' }) => (
  <div className='flex flex-col'>
    <span className='text-sm text-gray-500'>{label}</span>
    <span className={`font-medium ${valueClassName} pt-[1px]`}>
      {typeof value === 'object' ? value : value || 'N/A'}
    </span>
  </div>
)

export default RequestDialogValidationDisplay
