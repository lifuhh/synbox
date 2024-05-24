import LyricsDisplay from '@/components/lyrics-display/LyricsDisplayOverlay'
import { MemoizedPlayerBottomBar } from '@/components/playerbottombar/PlayerBottomBar'
import VideoPlayer from '@/components/shared/VideoPlayer'
import { useAppContext } from '@/context/AppContext'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { useParams } from 'react-router-dom'

const PlayerPage = () => {
  console.log('PlayerPage re-rendered...')
  const { playerControlsVisible, muted, setPlayerMuted, volume, isFullscreen } =
    useAppContext()

  //* Video ID state
  const { videoId } = useParams() // Extract videoId from route parameters
  const [stateVideoId, setStateVideoId] = useState<string | null>(null)

  //* Video Player state
  const [playing, setPlaying] = useState<boolean>(muted ? false : true)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [played, setPlayed] = useState<number>(0)
  const [loaded, setLoaded] = useState<number>(0)
  const [loop, setLoop] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const playerRef = useRef<BaseReactPlayer<ReactPlayer> | null>(null)

  const testRafId = useRef<number>(0)
  const testCounter = useRef<number>(0)

  //* Lyrics-related state
  const [romajiEnabled, setRomajiEnabled] = useState<boolean>(true)
  const [lyricsVisibility, setLyricsVisibility] = useState<boolean>(true)

  //TODO: wrong - fix this
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

  const handleToggleRomajiDisplay = useCallback(() => {
    setRomajiEnabled((prevRomajiEnabled) => !prevRomajiEnabled)
  }, [])

  const handleToggleLyricsVisibility = useCallback((visibility: boolean) => {
    setLyricsVisibility(visibility)
  }, [])

  const handlePlay = useCallback(() => {
    console.log('onPlay')
    setPlaying(true)
    // setTestStartTime(performance.now())
  }, [])

  //? requestAnimationFrame tester - to change to use accordingly for lyrics
  useEffect(() => {
    //! RAF gives a timestamp actually
    const testAnimationFrameCallback = (timestamp: number) => {
      // console.log(timestamp)
      testCounter.current++
      if (playerRef.current) {
        const videoPlayedTime = playerRef.current.getCurrentTime().toFixed(3)
        if (testCounter.current % 60 === 0) console.log({ videoPlayedTime })

        testRafId.current = requestAnimationFrame(testAnimationFrameCallback)
      }
    }

    if (playing) {
      testRafId.current = requestAnimationFrame(testAnimationFrameCallback)
    } else {
      cancelAnimationFrame(testRafId.current)
    }

    return () => {
      cancelAnimationFrame(testRafId.current)
    }
  }, [playing])

  const handlePause = useCallback(() => {
    console.log('onPause')
    setPlaying(false)
  }, [])

  const handleStart = useCallback(() => {
    console.log('video started playing')
    setPlaying(true)
    console.log(performance.now())
  }, [])

  const handleSeekChange = useCallback(
    (value: number) => {
      const newPlayedTime = parseInt((value * duration).toFixed(0))

      setPlayed(newPlayedTime)
      if (playerRef.current) {
        playerRef.current.seekTo(newPlayedTime)
      }
    },
    [duration],
  )

  const handleSeekMouseDown = useCallback(() => {
    // Implementation for seeking if needed
    setSeeking(true)
  }, [])

  const handleSeekMouseUp = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      if (playerRef.current) {
        setSeeking(false)
        playerRef.current.seekTo(parseFloat(e.currentTarget.value))
      }
    },
    [],
  )

  const handleProgress = useCallback(() => {
    if (!playerRef.current) return null

    const secondsLapsed = playerRef.current.getCurrentTime()

    //? This fires every second
    // console.log({ secondsLapsed })

    const curPlayed = Math.floor(parseInt(secondsLapsed.toFixed(0)))

    // console.log('This is handle progress + curPlayed: + ' + curPlayed)

    setPlayed(curPlayed)
    // setLoaded(loaded)
  }, [])

  //* When ended, go to next track [to be implemented]
  const handleEnded = useCallback(() => {
    console.log('onEnded')
    setPlaying(loop)
  }, [loop])

  const handleDuration = useCallback((duration: number) => {
    console.log('onDuration', duration)
    setDuration(duration)
  }, [])

  return (
    <>
      {/* Lyrics Display Controller */}
      {/* {lyricsVisibility ? <LyricsDisplay romajiEnabled={romajiEnabled} /> : ''} */}
      <div
        className={`relative aspect-video h-full w-full border-2 border-primary border-opacity-5 ${
          playerControlsVisible ? '' : 'cursor-none'
        } ${isFullscreen ? 'mt-14' : ''} `}>
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
            handleStart={handleStart}
            handleEnded={handleEnded}
          />
        )}
      </div>
      <MemoizedPlayerBottomBar
        playing={playing}
        loop={loop}
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
        handleToggleRomajiDisplay={handleToggleRomajiDisplay}
        handleToggleLyricsVisibility={handleToggleLyricsVisibility}
      />
    </>
  )
}
export default PlayerPage
