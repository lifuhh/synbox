import { formattedVideoItemForCarousel } from '@/types'
import { useEffect } from 'react'

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
  }
}

interface PlayerTestProps {
  videoDetails: formattedVideoItemForCarousel
}

const PlayerTest = ({ videoDetails }: PlayerTestProps) => {
  console.log('this is video id')
  console.log(videoDetails.videoId)

  useEffect(() => {
    // Event handler functions can be defined here as well
    let player: YT.Player
    // Function to initialize the YouTube Player
    const initializeYouTubePlayer = () => {
      // Assuming 'player' is the ID of the div where the YouTube player will be created
      player = new window.YT.Player('player', {
        videoId: videoDetails.videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          showinfo: 0,
          fs: 1,
          loop: 0,
          playlist: '',
          cc_load_policy: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onPlayerReady = (event: any) => {
      // Player is ready
      player.mute()
      event.target.playVideo()
    }

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
      // Player state has changed
      console.log('State has changed')
      console.log(event.data)
    }

    // Function that loads the YouTube IFrame Player API
    const loadYouTubeIframeAPI = () => {
      const scriptTag = document.createElement('script')
      scriptTag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      if (firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
      }

      // Assign the global function that YouTube API will call
      window.onYouTubeIframeAPIReady = initializeYouTubePlayer
    }

    // Load the API if it hasn't been loaded yet
    if (!window['YT']) {
      // Checks if the YT object exists
      loadYouTubeIframeAPI()
    } else {
      // YT object exists, which means script was already loaded, initialize the player directly
      window.onYouTubeIframeAPIReady()
    }

    // Cleanup function to potentially destroy the player or remove global references if the component unmounts
    return () => {
      // Cleanup code here
    }
  }, [videoDetails.videoId])

  return (
    <div className='w-[90vw] h-[50.625vw] bg-transparent fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='w-full h-full border-4 border-green-200'>
        <iframe
          id='player'
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${videoDetails.videoId}?enablejsapi=1&origin=http://localhost:5173`}></iframe>
      </div>
    </div>
  )
}
export default PlayerTest
