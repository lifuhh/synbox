import PlayerBottomBar from '@/components/shared/PlayerBottomBar'
import VideoPlayer from '@/components/shared/VideoPlayer'
import { ChangeEvent, useCallback, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer, { BaseReactPlayerProps } from 'react-player/base'
import { useLocation } from 'react-router-dom'

const PlayerPage = () => {
  const location = useLocation()

  const [videoId, setVideoId] = useState<string | null>(
    location.state?.videoId || null
  )
  const [playing, setPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0)
  const [muted, setMuted] = useState<boolean>(true)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [played, setPlayed] = useState<number>(0)
  const [loaded, setLoaded] = useState<number>(0)
  const [loop, setLoop] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const playerRef = useRef<BaseReactPlayer<ReactPlayer> | null>(null)

  const load = (vidId: string) => {
    setVideoId(vidId)
    setPlayed(0)
    setLoaded(0)
  }

  const handlePlayPause = useCallback(() => {
    setPlaying(!playing)
  }, [playing])

  const handleToggleLoop = useCallback(() => {
    setLoop(!loop)
  }, [loop]) // Add dependencies if any

  const handleVolumeChange = useCallback((value: number) => {
    setMuted(value === 0)
    setVolume(value)
  }, [])

  const handleToggleMuted = useCallback(() => {
    setMuted((prevMuted) => !prevMuted)
  }, [])

  const handlePlay = () => {
    console.log('onPlay')
    setPlaying(true)
  }

  const handlePause = () => {
    console.log('onPause')
    setPlaying(false)
  }

  const handleSeekChange = (value: number) => {
    const newPlayedTime = parseInt((value * duration).toFixed(0))

    setPlayed(newPlayedTime)
    if (playerRef.current) {
      playerRef.current.seekTo(newPlayedTime)
    }
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

  const handleProgress = () => {
    if (!playerRef.current) return null

    const secondsLapsed = playerRef.current.getCurrentTime()

    const curPlayed = Math.floor(parseInt(secondsLapsed.toFixed(0)))

    console.log('This is handle progress + curPlayed: + ' + curPlayed)

    setPlayed(curPlayed)
    // setLoaded(loaded)
  }

  //* When ended, go to next track [to be implemented]
  const handleEnded = () => {
    console.log('onEnded')
    // setPlaying(loop)
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
            handlePlay={handlePlay}
            handleProgress={handleProgress}
            handleDuration={handleDuration}
          />
        )}
      </div>
      <PlayerBottomBar
        playing={playing}
        loop={loop}
        volume={volume}
        muted={muted}
        played={played}
        duration={duration}
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
