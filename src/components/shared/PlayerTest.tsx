import { formattedVideoItemForCarousel } from '@/types'
import ReactPlayer from 'react-player/youtube'

interface PlayerTestProps {
  videoDetails: formattedVideoItemForCarousel
}

const PlayerTest = ({ videoDetails }: PlayerTestProps) => {
  console.log('this is video id')
  console.log(videoDetails.videoId)

  const handlePlay = () => {
    console.log('onPlay')
  }

  const handleEnded = () => {
    console.log('onEnded')
  }

  const handleProgress = () => {
    console.log('onProgress')
  }

  const handleDuration = (duration: number) => {
    console.log('onDuration', duration)
  }

  const handlePause = () => {
    console.log('onPause')
  }

  return (
    <div className='w-[90vw] h-[50.625vw] bg-transparent fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='w-full h-full border-4 border-green-200'>
        <ReactPlayer
          width='100%'
          height='100%'
          url={`https://www.youtube.com/watch?v=${videoDetails.videoId}`}
          muted={true}
          playing={true}
          controls={true}
          onReady={() => console.log('ready')}
          onStart={() => console.log('onStart')}
          onPlay={handlePlay}
          onSeek={(e) => console.log('onSeek', e)}
          onEnded={handleEnded}
          onError={(e) => console.log('onError', e)}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPause={handlePause}
        />
      </div>
    </div>
  )
}
export default PlayerTest
