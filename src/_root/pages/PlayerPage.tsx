import LyricsDisplayOverlay from '@/components/lyrics-display/LyricsDisplayOverlay'
import LyricsVisibilityToggleGroup from '@/components/lyrics-display/LyricsVisibilityToggleGroup'
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
import { useNavigate, useParams } from 'react-router-dom'

const PlayerPage = () => {
  const navigate = useNavigate()
  const { videoId } = useParams<{ videoId: string }>()
  const { volume, playerOverlayVisibleHandler } = useAppContext()

  // All useState hooks must be declared before any conditional returns
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stateVideoId, setStateVideoId] = useState<string | null>(null)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [playing, setPlaying] = useState<boolean>(false)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [played, setPlayed] = useState<number>(0)
  const [loop, setLoop] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0)

  // Refs
  const playerRef = useRef<BaseReactPlayer<ReactPlayer> | null>(null)
  const testRafId = useRef<number>(0)
  const testCounter = useRef<number>(0)

  // Jotai atoms
  const userInteractedWithSettings = useAtomValue(
    userInteractedWithSettingsAtom,
  )
  const [muted, setMuted] = useAtom(mutedAtom)
  const isFullscreen = useAtomValue(fullscreenAtom)
  const [lyricsVisibility, setLyricsVisibility] = useAtom(lyricsVisibilityAtom)
  const [romajiVisibility, setRomajiVisibility] = useAtom(romajiVisibilityAtom)
  const [translationVisibility, setTranslationVisibility] = useAtom(
    translationVisibilityAtom,
  )
  const [lyricsControlVisibility, setLyricsControlVisibility] = useAtom(
    lyricsControlVisibilityAtom,
  )

  // Initial validation effect
  useEffect(() => {
    if (!videoId) {
      navigate('/', { replace: true })
      return
    }

    const initializePlayer = async () => {
      try {
        setIsLoading(true)

        if (!videoId.match(/^[a-zA-Z0-9_-]{11}$/)) {
          throw new Error('Invalid video ID format')
        }

        setStateVideoId(videoId)
        setError(null)
      } catch (err) {
        console.error('Error initializing player:', err)
        setError(err instanceof Error ? err.message : 'Failed to load video')
      } finally {
        setIsLoading(false)
      }
    }

    initializePlayer()
  }, [videoId, navigate])

  // Your existing callback functions
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

  const handlePlay = useCallback(() => {
    setPlaying(true)
    if (muted) setMuted(false)
    if (!userInteractedWithSettings) {
      setLyricsControlVisibility(false)
    }
  }, [muted, setMuted, setLyricsControlVisibility, userInteractedWithSettings])

  const handleInitMutedPlay = useCallback(() => {
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
    setLoop((prev) => !prev)
  }, [])

  const handleStart = useCallback(() => {
    setPlaying(true)
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
    const curPlayed = Math.floor(parseInt(secondsLapsed.toFixed(0)))
    setPlayed(curPlayed)
  }, [])

  const handleEnded = useCallback(() => {
    setPlaying(loop)
  }, [loop])

  const handleDuration = useCallback((duration: number) => {
    setDuration(duration)
  }, [])

  // RAF effect
  useEffect(() => {
    const testAnimationFrameCallback = (timestamp: number) => {
      testCounter.current++
      if (playerRef.current) {
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

  // Spacebar handler effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        handlePlayPause()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
    }
  }, [handlePlayPause])

  // Prevent spacebar scroll effect
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

  // Loading state
  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Loading...
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className='flex h-screen flex-col items-center justify-center'>
        <p className='text-red-500'>{error}</p>
        <button
          onClick={() => navigate('/')}
          className='mt-4 rounded bg-primary px-4 py-2 text-white'>
          Return Home
        </button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Player Page | Synbox</title>
      </Helmet>
      <LyricsVisibilityToggleGroup />

      {isPlayerReady && (
        <LyricsDisplayOverlay
          playerRef={playerRef}
          lyricsVisibility={lyricsVisibility}
          romajiVisibility={romajiVisibility}
          translationVisibility={translationVisibility}
          playing={playing}
        />
      )}

      <div className='relative mt-14 aspect-video h-full w-full border-2 border-primary border-opacity-5'>
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
    </>
  )
}

export default PlayerPage
