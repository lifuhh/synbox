import { useAppContext } from '@/context/AppContext'
import { mutedAtom } from '@/context/atoms'
import { isValidVideoId } from '@/utils/routeHandler'
import { LoadingOverlay } from '@mantine/core'
import { useAtom } from 'jotai'
import { ForwardedRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import ExternalLinkHandler from './ExternalLinkHandler'
import PlayerMutedOverlay from './PlayerMutedOverlay'

interface VideoPlayerProps {
  videoId: string // The video ID to play
  playing: boolean // Whether the video is currently playing
  loop: boolean // Whether the video should loop on end
  volume: number // The volume level of the video (0-1)
  handlePlay: () => void
  handleDuration: (duration: number) => void
  handleProgress: () => void
  handleStart: () => void
  handleEnded: () => void
  handleInitMutedPlay: () => void
  handlePlayPause: () => void
  setIsPlayerReady: React.Dispatch<React.SetStateAction<boolean>>
  playerRef: ForwardedRef<ReactPlayer>
  // Add methods for handling playback control (play, pause, seek)
  // and volume control (setVolume, toggleMute)
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  loop,
  playing,
  handlePlay,
  handleEnded,
  handleStart,
  handleInitMutedPlay,
  handlePlayPause,
  handleDuration,
  handleProgress,
  setIsPlayerReady,
  volume,
  playerRef,
}: VideoPlayerProps) => {
  // const handlePlayerReady = () => {}
  const {
    setPlayerControlsVisible,
    playerOverlayVisible,
    playerOverlayVisibleHandler,
  } = useAppContext()
  const [videoEnded, setVideoEnded] = useState(false)
  const [muted, setMuted] = useAtom(mutedAtom)
  const [isInitialized, setIsInitialized] = useState(false)
  const [videoError, setVideoError] = useState<Error | null>(null)

  // Validate video ID
  useEffect(() => {
    if (!isValidVideoId(videoId)) {
      setVideoError(new Error('Invalid video ID'))
      return
    }
    setVideoError(null)
  }, [videoId])

  // Type guard for playerRef remains the same
  if (!playerRef || typeof playerRef === 'function') {
    throw new Error('playerRef must be a MutableRefObject')
  }

  //? Handle delay in dismissing bottom bar controls visibility when playing video
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> // Declare timer to use it inside clearTimeout

    const showControlsTemporarily = () => {
      clearTimeout(timer) // Clear any existing timer on mouse move
      setPlayerControlsVisible(true) // Show the controls on mouse move

      //? Used to set timer to hide the controls after X milliseconds of no mouse movement
      if (playing) {
        // Check if the video is playing
        timer = setTimeout(() => {
          setPlayerControlsVisible(false)
        }, 3000)
      }
    }

    showControlsTemporarily() // Show the controls initially when the video starts playing

    document.addEventListener('mousemove', showControlsTemporarily)

    // Cleanup function to remove the event listener and clear the timeout when the component unmounts or before the effect runs again
    return () => {
      document.removeEventListener('mousemove', showControlsTemporarily)
      clearTimeout(timer)
    }
  }, [setPlayerControlsVisible, playing])

  useEffect(() => {
    if (muted && !playing && !playerOverlayVisible && !isInitialized) {
      playerOverlayVisibleHandler.open()
    } else if (!muted) {
      playerOverlayVisibleHandler.close()
    }
  }, [
    muted,
    playing,
    playerOverlayVisible,
    playerOverlayVisibleHandler,
    isInitialized,
  ])

  const handlePause = () => {
    // console.log('VideoPlayer.tsx player has been paused')
  }

  const handleReady = () => {
    if (!playerRef.current) return

    try {
      if (playerRef.current.getInternalPlayer()) {
        const isMuted = playerRef.current.getInternalPlayer().isMuted()
        setMuted(isMuted)
        setIsPlayerReady(true)
        setIsInitialized(true)
        setVideoError(null)

        // Auto-start if not muted
        if (!isMuted) {
          handlePlay()
        }
      }
    } catch (error) {
      handleError(error)
    }
  }

  const handleVideoEnded = () => {
    handleEnded()
    setVideoEnded(playing)
  }

  const handleError = (error: any) => {
    console.error('Video player error:', error)
    setVideoError(
      error instanceof Error ? error : new Error('Video playback error'),
    )
    setIsPlayerReady(false)
  }

  return (
    <>
      <LoadingOverlay
        visible={playerOverlayVisible || !!videoError}
        zIndex={100}
        overlayProps={{ radius: 'sm', blur: 15 }}
        loaderProps={{
          children: videoError ? (
            <div className='flex flex-col items-center justify-center text-red-500'>
              <p>Error loading video</p>
              <p className='text-sm'>{videoError.message}</p>
            </div>
          ) : (
            <PlayerMutedOverlay handleInitMutedPlay={handleInitMutedPlay} />
          ),
          style: { width: '100%', height: '100%' },
        }}
        styles={{
          root: { position: 'relative', height: '100%', width: '100%' },
          loader: {
            width: '100%',
            height: '100%',
            '& > *': { width: '100%', height: '100%' },
          },
        }}
      />
      <ExternalLinkHandler>
        <ReactPlayer
          className='absolute left-0 right-0 top-0'
          ref={playerRef}
          config={{
            youtube: {
              playerVars: {
                rel: 0,
                hl: 'en',
                disablekb: 1,
                fs: 0,
              },
              embedOptions: {
                nocookie: true,
              },
            },
          }}
          width='100%'
          height='100%'
          url={`https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&cc_load_policy=0&rel=0`}
          muted={muted}
          volume={volume}
          playing={playing}
          loop={loop}
          controls={true}
          onReady={handleReady}
          onStart={handleStart}
          onPlay={handlePlay}
          onSeek={(e) => console.log('onSeek', e)}
          onEnded={handleVideoEnded}
          onError={handleError}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPause={handlePause}
        />
      </ExternalLinkHandler>
    </>
  )
}

export default VideoPlayer
