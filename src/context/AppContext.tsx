/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { formattedYoutubeVideoItemForCarousel } from '@/types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface AppContextType {
  muted: boolean
  videoId: string
  volume: number
  processingStage: number
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
}

const INITIAL_STATE = {
  videoId: '',
  volume: 0.2,
  muted: true,
  processingStage: 0,
  playerControlsVisible: true,
  landingPageCarouselData: [],
  setVideoId: (videoId: string) => {},
  setProcessingStage: (stage: number) => {},
  setVolume: (volume: number) => {},
  setPlayerMuted: (muted: boolean) => {},
  setPlayerControlsVisible: (visibility: boolean) => {},
  setLandingPageCarouselData: (
    data: formattedYoutubeVideoItemForCarousel[]
  ) => {},
}
const AppContext = createContext<AppContextType>(INITIAL_STATE)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoId, setVideoId] = useState<string>('')
  const [muted, setPlayerMuted] = useState<boolean>(true)
  const [playerControlsVisible, setPlayerControlsVisible] =
    useState<boolean>(true)
  const [volume, setVolume] = useState<number>(0.2)
  const [processingStage, setProcessingStage] = useState<number>(0)
  const [landingPageCarouselData, setLandingPageCarouselData] = useState<
    formattedYoutubeVideoItemForCarousel[]
  >([])

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
    landingPageCarouselData,
    setProcessingStage,
    volume,
    setVolume,
    playerControlsVisible,
    setPlayerControlsVisible,
    setLandingPageCarouselData,
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
