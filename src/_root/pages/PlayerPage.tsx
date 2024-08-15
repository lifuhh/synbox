import LyricsDisplayOverlay from '@/components/lyrics-display/LyricsDisplayOverlay'
import { MemoizedPlayerBottomBar as PlayerBottomBar } from '@/components/playerbottombar/PlayerBottomBar'
import PlayPauseAnimation from '@/components/shared/PlayPauseAnimation'
import VideoPlayer from '@/components/shared/VideoPlayer'
import { useAppContext } from '@/context/AppContext'
import { fullscreenAtom, mutedAtom } from '@/context/atoms'
import { useAtom, useAtomValue } from 'jotai'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { useParams } from 'react-router-dom'

const PlayerPage = () => {
  // console.log('PlayerPage re-rendered...')
  const { volume } = useAppContext()
  const [muted, setMuted] = useAtom(mutedAtom)
  const isFullscreen = useAtomValue(fullscreenAtom)
  // const playerControlsVisible = useAtomValue(playerControlVisibilityAtom)

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

  //* Lyrics-display related state
  const [romajiVisibility, setRomajiVisibility] = useState<boolean>(true)
  const [lyricsVisibility, setLyricsVisibility] = useState<boolean>(true)
  const [translationVisibility, setTranslationVisibility] =
    useState<boolean>(true)

  //TODO: wrong - fix this
  useEffect(() => {
    if (videoId) setStateVideoId(videoId)
  }, [videoId])

  const load = (vidId: string) => {
    setStateVideoId(vidId)
    setPlayed(0)
    setLoaded(0)
  }

  const handlePause = useCallback(() => {
    // console.log('onPause')
    setPlaying(false)
  }, [])

  const handlePlay = useCallback(() => {
    setPlaying(true)
    if (muted) setMuted(false)
    // setTestStartTime(performance.now())
  }, [muted, setMuted])

  const [showPlayPauseAnimation, setShowPlayPauseAnimation] = useState(false)
  const handlePlayPause = useCallback(() => {
    setShowPlayPauseAnimation(true)
    setPlaying(!playing)
  }, [playing])

  const handleAnimationComplete = useCallback(() => {
    setShowPlayPauseAnimation(false)
  }, [])

  // const handlePlayPause = useCallback(() => {
  //   setPlaying(!playing)
  // }, [playing])

  const handleToggleLoop = useCallback(() => {
    setLoop(!loop)
  }, [loop]) // Add dependencies if any

  const handleToggleRomajiVisibility = useCallback(() => {
    setRomajiVisibility((prevRomajiEnabled) => !prevRomajiEnabled)
  }, [])

  const handleToggleTranslationVisibility = useCallback(() => {
    setTranslationVisibility(
      (prevTranslationVisibility) => !prevTranslationVisibility,
    )
  }, [])

  const handleToggleLyricsVisibility = useCallback((visibility: boolean) => {
    setLyricsVisibility(visibility)
  }, [])

  //? `requestAnimationFrame` tester - to change to use accordingly for lyrics
  useEffect(() => {
    //! RAF gives a timestamp actually
    const testAnimationFrameCallback = (timestamp: number) => {
      // console.log(timestamp)
      testCounter.current++
      if (playerRef.current) {
        //? Test code for getting current time every 60 frames in console
        // const videoPlayedTime = playerRef.current.getCurrentTime().toFixed(3)
        // if (testCounter.current % 60 === 0) console.log({ videoPlayedTime })

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

  const handleStart = useCallback(() => {
    // console.log('video started playing')
    setPlaying(true)
    // console.log(performance.now())
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
    const curPlayed = Math.floor(parseInt(secondsLapsed.toFixed(0)))

    setPlayed(curPlayed)
    // setLoaded(loaded)
  }, [])

  //* When ended, go to next track [to be implemented]
  const handleEnded = useCallback(() => {
    // console.log('onEnded')
    setPlaying(loop)
  }, [loop])

  const handleDuration = useCallback((duration: number) => {
    // console.log('onDuration', duration)
    setDuration(duration)
  }, [])

  const handlePlayerPageClick = () => {
    console.log('Handled player page click')
    handlePlayPause()
    if (muted) setMuted(false)
  }

  return (
    <>
      <Helmet>
        <title>Player Page | Synbox</title>
      </Helmet>
      {/* Lyrics Display Controller */}
      {/* {lyricsVisibility ? ( */}
      <LyricsDisplayOverlay
        playerRef={playerRef}
        romajiVisibility={romajiVisibility}
        translationVisibility={translationVisibility}
        playing={playing}
        setPlaying={setPlaying}
      />
      {/* //TODO: Added unselectable to youtube player, need to add at top level to play video if video is paused and user clicks on screen */}
      <div
        //${playing ? 'unselectable' : ''}
        className={`
        
        relative aspect-video h-full w-full border-2 border-primary border-opacity-5 ${isFullscreen ? 'mt-14' : ''} `}>
        {stateVideoId && (
          <VideoPlayer
            videoId={stateVideoId}
            playerRef={playerRef}
            loop={loop}
            playing={playing}
            volume={volume}
            handlePlay={handlePlay}
            handlePlayPause={handlePlayPause}
            handleProgress={handleProgress}
            handleDuration={handleDuration}
            handleStart={handleStart}
            handleEnded={handleEnded}
          />
        )}
        {/* {showPlayPauseAnimation && (
          <PlayPauseAnimation
            isPlaying={playing}
            visible={showPlayPauseAnimation}
            onAnimationComplete={handleAnimationComplete}
          />
        )} */}
      </div>
      <PlayerBottomBar
        playing={playing}
        loop={loop}
        played={played}
        duration={duration}
        playerRef={playerRef}
        romajiEnabled={romajiVisibility}
        handlePlay={handlePlay}
        handlePause={handlePause}
        handlePlayPause={handlePlayPause}
        handleSeekMouseDown={handleSeekMouseDown}
        handleSeekChange={handleSeekChange}
        handleSeekMouseUp={handleSeekMouseUp}
        handleProgress={handleProgress}
        handleToggleLoop={handleToggleLoop}
        handleToggleRomajiVisibility={handleToggleRomajiVisibility}
        handleToggleTranslationVisibility={handleToggleTranslationVisibility}
        handleToggleLyricsVisibility={handleToggleLyricsVisibility}
      />
    </>
  )
}
export default PlayerPage
