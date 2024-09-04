import LyricsDisplayOverlay from '@/components/lyrics-display/LyricsDisplayOverlay'
import { MemoizedPlayerBottomBar } from '@/components/playerbottombar/PlayerBottomBar'
import VideoPlayer from '@/components/shared/VideoPlayer'
import { useAppContext } from '@/context/AppContext'
import {
  fullscreenAtom,
  lyricsControlVisibilityAtom,
  lyricsVisibilityAtom,
  mutedAtom,
  romajiVisibilityAtom,
  translationVisibilityAtom,
  userInteractedWithSettingsAtom,
} from '@/context/atoms'
import { useAtom, useAtomValue } from 'jotai'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { useParams } from 'react-router-dom'

const PlayerPage = () => {
  // console.log('PlayerPage re-rendered...')
  const { volume, playerOverlayVisibleHandler } = useAppContext()
  const userInteractedWithSettings = useAtomValue(
    userInteractedWithSettingsAtom,
  )
  const [muted, setMuted] = useAtom(mutedAtom)
  const isFullscreen = useAtomValue(fullscreenAtom)
  // const playerControlsVisible = useAtomValue(playerControlVisibilityAtom)

  //* Video ID state
  const { videoId } = useParams() // Extract videoId from route parameters
  const [stateVideoId, setStateVideoId] = useState<string | null>(null)

  //* Video Player state
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [playing, setPlaying] = useState<boolean>(muted ? false : true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seeking, setSeeking] = useState<boolean>(false)
  const [played, setPlayed] = useState<number>(0)
  // const [loaded, setLoaded] = useState<number>(0)
  const [loop, setLoop] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)
  const playerRef = useRef<BaseReactPlayer<ReactPlayer> | null>(null)

  const testRafId = useRef<number>(0)
  const testCounter = useRef<number>(0)

  //* Lyrics-display related state
  const [lyricsVisibility, setLyricsVisibility] = useAtom(lyricsVisibilityAtom)
  const [romajiVisibility, setRomajiVisibility] = useAtom(romajiVisibilityAtom)
  const [translationVisibility, setTranslationVisibility] = useAtom(
    translationVisibilityAtom,
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lyricsControlVisibility, setLyricsControlVisibility] = useAtom(
    lyricsControlVisibilityAtom,
  )

  //? Handler for lyrics overlay changes
  const handleToggleLyricsOverlayVisibility = useCallback(() => {
    const someOn = lyricsVisibility || romajiVisibility || translationVisibility

    const newState = !someOn

    setLyricsVisibility(newState)
    setRomajiVisibility(newState)
    setTranslationVisibility(newState)
  }, [
    lyricsVisibility,
    romajiVisibility,
    translationVisibility,
    setLyricsVisibility,
    setRomajiVisibility,
    setTranslationVisibility,
  ])

  const handleToggleRomajiVisibility = useCallback(() => {
    setRomajiVisibility((prev) => !prev)
  }, [setRomajiVisibility])

  const handleToggleTranslationVisibility = useCallback(() => {
    setTranslationVisibility((prev) => !prev)
  }, [setTranslationVisibility])

  const handleToggleLyricsVisibility = useCallback(() => {
    setLyricsVisibility((prev) => !prev)
  }, [setLyricsVisibility])

  //TODO: wrong - fix this
  useEffect(() => {
    if (videoId) setStateVideoId(videoId)
  }, [videoId])

  // const load = (vidId: string) => {
  //   setStateVideoId(vidId)
  //   setPlayed(0)
  //   setLoaded(0)
  // }

  const handlePause = useCallback(() => {
    setPlaying(false)
    if (!userInteractedWithSettings) {
      setLyricsControlVisibility(true)
    }
  }, [setLyricsControlVisibility, userInteractedWithSettings])

  const handlePlayPause = useCallback(() => {
    const newPlayingState = !playing
    setPlaying(newPlayingState)
    if (!userInteractedWithSettings) {
      setLyricsControlVisibility(!newPlayingState)
    }
  }, [playing, setLyricsControlVisibility, userInteractedWithSettings])

  //* Used for youtube player's native interactions, replicate everything in handleplaypause here as well
  const handlePlay = useCallback(() => {
    setPlaying(true)
    // playerOverlayVisibleHandler.close()
    if (muted) setMuted(false)
    if (!userInteractedWithSettings) {
      setLyricsControlVisibility(false)
    }
    // setTestStartTime(performance.now())
  }, [muted, setMuted, setLyricsControlVisibility, userInteractedWithSettings])

  const handleInitMutedPlay = useCallback(() => {
    // console.log('Init Muted Play clicked')
    setMuted(false)
    playerOverlayVisibleHandler.close()
    handlePlay()
    if (!userInteractedWithSettings) {
      setLyricsControlVisibility(false)
    }
  }, [
    setLyricsControlVisibility,
    handlePlay,
    playerOverlayVisibleHandler,
    userInteractedWithSettings,
    setMuted,
  ])

  const handleToggleLoop = useCallback(() => {
    setLoop(!loop)
  }, [loop]) // Add dependencies if any

  //? `requestAnimationFrame` tester - to change to use accordingly for lyrics
  useEffect(() => {
    //! RAF gives a timestamp actually
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  //? Handle spacebar events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        handlePlayPause()
      }
    }

    // Use capture phase to intercept the event before it reaches other elements
    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [handlePlayPause])

  useEffect(() => {
    const preventSpacebarScroll = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', preventSpacebarScroll)

    return () => {
      window.removeEventListener('keydown', preventSpacebarScroll)
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Player Page | Synbox</title>
      </Helmet>
      {/* Lyrics Display Controller */}
      {isPlayerReady && (
        <LyricsDisplayOverlay
          playerRef={playerRef}
          lyricsVisibility={lyricsVisibility}
          romajiVisibility={romajiVisibility}
          translationVisibility={translationVisibility}
          playing={playing}
        />
      )}
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
            handleInitMutedPlay={handleInitMutedPlay}
            handlePlay={handlePlay}
            handlePlayPause={handlePlayPause}
            handleProgress={handleProgress}
            handleDuration={handleDuration}
            handleStart={handleStart}
            handleEnded={handleEnded}
            setIsPlayerReady={setIsPlayerReady}
          />
        )}
      </div>
      <MemoizedPlayerBottomBar
        playing={playing}
        loop={loop}
        played={played}
        duration={duration}
        playerRef={playerRef}
        romajiEnabled={romajiVisibility}
        handleInitMutedPlay={handleInitMutedPlay}
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
        handleToggleLyricsOverlayVisibility={
          handleToggleLyricsOverlayVisibility
        }
      />
    </>
  )
}
export default PlayerPage
