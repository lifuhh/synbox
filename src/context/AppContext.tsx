/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { formattedYoutubeVideoItemForCarousel } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'

interface AppContextType {
  muted: boolean
  videoId: string
  volume: number
  processingStage: number
  isFullscreen: boolean
  // playing: boolean
  landingPageCarouselData: formattedYoutubeVideoItemForCarousel[]
  setPlayerMuted: (muted: boolean) => void
  setVideoId: (videoId: string) => void
  setVolume: (volume: number) => void
  setProcessingStage: (stage: number) => void
  setLandingPageCarouselData: (
    data: formattedYoutubeVideoItemForCarousel[]
  ) => void
  playerControlsVisible: boolean
  setPlayerControlsVisible: (visibility: boolean) => void
  setIsFullscreen: (isFullscreen: boolean) => void
}

const INITIAL_STATE = {
  videoId: '',
  volume: 0.2,
  muted: true,
  processingStage: 1,
  playerControlsVisible: true,
  landingPageCarouselData: [],
  isFullscreen: false,
  setVideoId: (videoId: string) => {},
  setProcessingStage: (stage: number) => {},
  setVolume: (volume: number) => {},
  setPlayerMuted: (muted: boolean) => {},
  setPlayerControlsVisible: (visibility: boolean) => {},
  setLandingPageCarouselData: (
    data: formattedYoutubeVideoItemForCarousel[]
  ) => {},
  setIsFullscreen: (isFullscreen: boolean) => {},
}
const AppContext = createContext<AppContextType>(INITIAL_STATE)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [muted, setPlayerMuted] = useState<boolean>(true)
  const [videoId, setVideoId] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [playerControlsVisible, setPlayerControlsVisible] =
    useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.2)
  const [processingStage, setProcessingStage] = useState<number>(1)
  const [landingPageCarouselData, setLandingPageCarouselData] = useState<
    formattedYoutubeVideoItemForCarousel[]
  >([]) //* This should be unnecessary

  // const navigate = useNavigate()

  //TODO: Can add localstorage stuff here, for example
  // useEffect(() => {
  //   if (
  //     localStorage.getItem('cookieFallback') === '[]'
  //      || localStorage.getItem('cookieFallback') === null
  //   )
  //     navigate('/sign-in');

  //   checkAuthUser();
  // }, []);

  const value = {
    videoId,
    setVideoId,
    muted,
    setPlayerMuted,
    processingStage,
    setProcessingStage,
    landingPageCarouselData,
    setLandingPageCarouselData,
    volume,
    setVolume,
    playerControlsVisible,
    setPlayerControlsVisible,
    isFullscreen,
    setIsFullscreen,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}
