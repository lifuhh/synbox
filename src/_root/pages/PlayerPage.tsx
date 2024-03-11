import CaptionDisplay from '@/components/captions/CaptionDisplay'
import PlayerBottomBar from '@/components/playerbottombar/PlayerBottomBar'
import NewVideoPlayer from '@/components/shared/NewVideoPlayer'
import VideoPlayer from '@/components/shared/VideoPlayer'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { useParams } from 'react-router-dom'

const PlayerPage = () => {
  // console.log('Player Page rendered...')
  //* Video ID state
  const { videoId } = useParams() // Extract videoId from route parameters
  const [stateVideoId, setStateVideoId] = useState<string | null>(null)

  //* Video Player state
  const [playing, setPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.2)
  const [muted, setMuted] = useState<boolean>(true)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [played, setPlayed] = useState<number>(0)
  const [loaded, setLoaded] = useState<number>(0)
  const [loop, setLoop] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const playerRef = useRef<BaseReactPlayer<ReactPlayer> | null>(null)

  //* Lyrics-related state
  const [romajiEnabled, setRomajiEnabled] = useState<boolean>(true)
  const [lyricsVisibility, setLyricsVisibility] = useState<boolean>(true)

  useEffect(() => {
    if (videoId) setStateVideoId(videoId)
  }, [videoId])

  const load = (vidId: string) => {
    setStateVideoId(vidId)
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
    // setMuted(value === 0)
    setVolume(value)
  }, [])

  const handleToggleMuted = useCallback(() => {
    setMuted((prevMuted) => !prevMuted)
  }, [])

  const handleToggleRomajiDisplay = useCallback(() => {
    setRomajiEnabled((prevRomajiEnabled) => !prevRomajiEnabled)
  }, [])

  const handleToggleLyricsVisibility = useCallback((visibility: boolean) => {
    setLyricsVisibility(visibility)
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

    // console.log('This is handle progress + curPlayed: + ' + curPlayed)

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
      {/* Caption Display Controller */}
      {lyricsVisibility ? <CaptionDisplay romajiEnabled={romajiEnabled} /> : ''}
      <div className='relative aspect-video w-full max-h-full border-2 border-primary border-opacity-5'>
        {stateVideoId && (
          <VideoPlayer
            videoId={stateVideoId}
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
        romajiEnabled={romajiEnabled}
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
        handleToggleRomajiDisplay={handleToggleRomajiDisplay}
        handleToggleLyricsVisibility={handleToggleLyricsVisibility}
      />
    </>
  )
}
export default PlayerPage
