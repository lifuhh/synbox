import { ForwardedRef } from 'react'
import ReactPlayer from 'react-player'

interface VideoPlayerProps {
  videoId: string // The video ID to play
  playing: boolean // Whether the video is currently playing
  loop: boolean // Whether the video should loop on end
  volume: number // The volume level of the video (0-1)
  muted: boolean // Whether the video is muted
  handlePlay: () => void
  handleDuration: (duration: number) => void
  handleProgress: () => void
  playerRef: ForwardedRef<ReactPlayer>
  // Add methods for handling playback control (play, pause, seek)
  // and volume control (setVolume, toggleMute)
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  loop,
  playing,
  handlePlay,
  handleDuration,
  handleProgress,
  volume,
  muted,
  playerRef,
}) => {
  const handleEnded = () => {
    console.log('onEnded')
  }

  const handlePlayerReady = () => {}

  const handlePause = () => {
    console.log('VideoPlayer.tsx player has been paused')
  }

  const handleReady = () => {
    handlePlay()
  }

  return (
    <div className='w-[90vw] h-[50.85vw] bg-transparent fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='w-full h-full border-4 border-green-200'>
        <ReactPlayer
          ref={playerRef}
          config={{
            youtube: {
              playerVars: {
                rel: 0,
              },
            },
          }}
          width='100%'
          height='100%'
          url={`https://www.youtube.com/watch?v=${videoId}&cc_load_policy=3`}
          muted={muted}
          volume={volume}
          playing={playing}
          loop={loop}
          controls={false}
          onReady={handleReady}
          onStart={() => console.log('onStart')}
          onPlay={handlePlay}
          onSeek={(e) => console.log('onSeek', e)}
          onEnded={handleEnded}
          onError={(e) => console.log('onError', e)}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPause={handlePause}
        />
        {/* OVERLAY DIV to prevent user direct interaction with player */}
        {/* //TODO: Add some kind of good quality UX to notify users to unmute video */}
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 flex justify-center items-center text-white'></div>
      </div>
    </div>
  )
}
export default VideoPlayer
