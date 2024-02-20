import { ForwardedRef } from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  videoId: string // The video ID to play
  playing: boolean // Whether the video is currently playing
  loop: boolean // Whether the video should loop on end
  volume: number // The volume level of the video (0-1)
  muted: boolean // Whether the video is muted
  playerRef: ForwardedRef<ReactPlayer>
  // Add methods for handling playback control (play, pause, seek)
  // and volume control (setVolume, toggleMute)
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  loop,
  playing,
  volume,
  muted,
  playerRef,
}) => {
  console.log('this is video id')
  console.log(videoId)

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
          ref={playerRef}
          width='100%'
          height='100%'
          url={`https://www.youtube.com/watch?v=${videoId}`}
          muted={muted}
          volume={volume}
          playing={playing}
          loop={loop}
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
export default VideoPlayer
