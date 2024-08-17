import { useAppContext } from '@/context/AppContext'
import { mutedAtom } from '@/context/atoms'
import { LoadingOverlay } from '@mantine/core'
import { useAtom } from 'jotai'
import { ForwardedRef, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
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
  setIsPlayerReady: () => void
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
}) => {
  // const handlePlayerReady = () => {}
  const {
    setPlayerControlsVisible,
    playerOverlayVisible,
    playerOverlayVisibleHandler,
  } = useAppContext()
  const [videoEnded, setVideoEnded] = useState(false)
  const [muted, setMuted] = useAtom(mutedAtom)

  //TODO: This is a typeguard - understand this better
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
        }, 4000)
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
    if (muted && !playing && !playerOverlayVisible) {
      playerOverlayVisibleHandler.open()
    }
  }, [muted, playerOverlayVisible, playerOverlayVisibleHandler, playing])

  const handlePause = () => {
    console.log('VideoPlayer.tsx player has been paused')
  }

  const handleReady = () => {
    if (!playerRef.current) return

    if (playerRef.current.getInternalPlayer()) {
      setMuted(playerRef.current.getInternalPlayer().isMuted())
      setIsPlayerReady(true) // Add this line
    }
  }

  const handleVideoEnded = () => {
    handleEnded()
    setVideoEnded(playing)
  }

  const testToggleOverlay = () => {
    console.log('Toggled test overlay ')
    playerOverlayVisibleHandler.toggle()
  }

  return (
    <>
      <LoadingOverlay
        visible={playerOverlayVisible}
        zIndex={40}
        // elementProps={{ onClick: handleInitMutedPlay }}
        overlayProps={{ radius: 'sm', blur: 15 }}
        loaderProps={{
          children: (
            <PlayerMutedOverlay handleInitMutedPlay={handleInitMutedPlay} />
          ),
        }}
      />
      <ReactPlayer
        className='absolute left-0 right-0 top-0'
        ref={playerRef}
        config={{
          youtube: {
            playerVars: {
              rel: 0,
              hl: 'ja',
            },
          },
        }}
        width='100%'
        height='100%'
        url={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&cc_load_policy=0&rel=0`}
        // url={`https://www.youtube.com/embed/${videoId}?cc_load_policy=0&rel=0`}
        // url={`https://www.youtube.com/watch?v=${videoId}&cc_load_policy=3&rel=0`}
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
        onError={(e) => console.log('onError', e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onPause={handlePause}
      />
      {playing || videoEnded ? (
        <div
          className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-0 text-white'
          onClick={handlePlayPause}></div>
      ) : (
        ''
      )}
    </>
  )
}

export default VideoPlayer
