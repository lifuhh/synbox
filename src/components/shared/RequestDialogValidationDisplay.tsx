/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button'
import { Check, ExternalLink, X } from 'lucide-react'

const RequestDialogValidationDisplay = ({ vidInfo }) => {
  const {
    full_vid_info: { title, id, thumbnail, likes, uploader, channel_name },
    passed,
    subtitle_info: { exist: subtitlesExist },
  } = vidInfo

  //? Reference for adding a button to youtube given video ID
  // const youtubeUrl = `https://www.youtube.com/watch?v=${id}`

  return (
    <div className='mt-4 max-h-[calc(100vh-200px)] overflow-y-auto'>
      <div className='flex flex-col items-center'>
        <img
          src={thumbnail}
          alt={title}
          className='mb-4 w-full max-w-md rounded-lg shadow-md'
        />
        <h4 className='mb-2 text-center text-xl font-semibold'>{title}</h4>

        <div className='grid w-full max-w-2xl grid-rows-3 gap-x-8 gap-y-4 pb-4'>
          {/* <InfoItem label='Video ID' value={id} /> */}
          <InfoItem label='Channel' value={channel_name} />
          {/* <InfoItem label='Uploader' value={uploader} /> */}
          <InfoItem label='Likes' value={likes.toLocaleString()} />
          <InfoItem
            label='Subtitles'
            value={
              subtitlesExist ? (
                <Check className='text-green-500' />
              ) : (
                <X className='text-red-500' />
              )
            }
          />
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
    <span className={`font-medium ${valueClassName}`}>
      {typeof value === 'object' ? value : value || 'N/A'}
    </span>
  </div>
)

export default RequestDialogValidationDisplay
