import PlayerBottomBar from '@/components/shared/PlayerBottomBar'
import VideoPlayer from '@/components/shared/VideoPlayer'
import { ChangeEvent, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router-dom'

const PlayerPage = () => {
  const location = useLocation()

  const [videoId, setVideoId] = useState<string | null>(
    location.state?.videoId || null
  )
  const [playing, setPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0)
  const [muted, setMuted] = useState<boolean>(false)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [played, setPlayed] = useState<number>(0)
  const [loaded, setLoaded] = useState<number>(0)
  const [loop, setLoop] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const playerRef = useRef<ReactPlayer | null>(null)

  const load = (vidId: string) => {
    setVideoId(vidId)
    setPlayed(0)
    setLoaded(0)
  }

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const handleToggleLoop = () => {
    setLoop(!loop)
  }

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  const handleToggleMuted = () => {
    setMuted(!muted)
  }

  const handlePlay = () => {
    console.log('onPlay')
    setPlaying(true)
  }

  const handlePause = () => {
    console.log('onPause')
    setPlaying(false)
  }

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value))
  }

  const handleSeekMouseDown = () => {
    // Implementation for seeking if needed
    setSeeking(true)
  }

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      setSeeking(false)
      playerRef.current.seekTo(parseFloat(e.currentTarget.value))
    }
  }

  const handleProgress = (state: { played: number; loaded: number }) => {
    console.log('onProgress', state)
    // Assuming no seeking state to manage, directly setting played and loaded
    setPlayed(state.played)
    setLoaded(state.loaded)
  }

  //* When ended, go to next track [to be implemented]
  const handleEnded = () => {
    console.log('onEnded')
    setPlaying(loop)
  }

  const handleDuration = (duration: number) => {
    console.log('onDuration', duration)
    setDuration(duration)
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center my-20'>
        {videoId && (
          <VideoPlayer
            videoId={videoId}
            playerRef={playerRef}
            loop={loop}
            playing={playing}
            volume={volume}
            muted={muted}
          />
        )}
      </div>
      <PlayerBottomBar
        playerRef={playerRef}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handlePlayPause={handlePlayPause}
        handleSeekMouseDown={handleSeekMouseDown}
        handleSeekChange={handleSeekChange}
        handleSeekMouseUp={handleSeekMouseUp}
        handleProgress={handleProgress}
        handleToggleLoop={handleToggleLoop}
        handleVolumeChange={handleVolumeChange}
        handleToggleMuted={handleToggleMuted}
      />
    </>
  )
}
export default PlayerPage
