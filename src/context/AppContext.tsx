/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentUser } from '@/lib/appwrite/api'
import { useDisclosure } from '@mantine/hooks'
import { useAtomValue } from 'jotai'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { globalControlsVisibilityAtom } from './atoms'

export const INITIAL_USER = {
  id: '',
  name: '',
  // username: '',
  // subscription: '',
}

interface AppContextType {
  //TODO Auth

  //* Player stuff
  videoId: string
  volume: number
  processingStage: number
  // playing: boolean
  setVideoId: (videoId: string) => void
  setVolume: (volume: number) => void
  setProcessingStage: (stage: number) => void
  playerControlsVisible: boolean
  setPlayerControlsVisible: (visibility: boolean) => void
  //* Calculate Bottombar Height
  bottomBarHeight: number
  setBottomBarHeight: React.Dispatch<React.SetStateAction<number>> | undefined
  playerOverlayVisible: boolean
  playerOverlayVisibleHandler: {
    open: () => void
    close: () => void
    toggle: () => void
  }
}

const INITIAL_STATE = {
  //TODO Auth stuff

  //* Player stuff
  videoId: '',
  volume: 0,
  processingStage: 1,
  playerControlsVisible: true,
  setVideoId: (videoId: string) => {},
  setProcessingStage: (stage: number) => {},
  setVolume: (volume: number) => {},
  setPlayerControlsVisible: (visibility: boolean) => {},
  // Calculate Bottombar Height
  bottomBarHeight: 0,
  setBottomBarHeight: undefined,
  playerOverlayVisible: false,
  playerOverlayVisibleHandler: {
    open: () => {},
    close: () => {},
    toggle: () => {},
  },
}
const AppContext = createContext<AppContextType>(INITIAL_STATE)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  //TODO Auth Stuff

  //* Bottom Bar Height Stuff
  const [bottomBarHeight, setBottomBarHeight] = useState(0)

  //* Player Stuff
  const [videoId, setVideoId] = useState<string>('')
  const globalControlsVisible = useAtomValue(globalControlsVisibilityAtom)
  const [playerControlsVisible, setPlayerControlsVisible] =
    useState<boolean>(true)

  const effectivePlayerControlsVisible =
    globalControlsVisible && playerControlsVisible

  // set initial volume here
  const [volume, setVolume] = useState<number>(0.3)
  const [processingStage, setProcessingStage] = useState<number>(1)

  const [playerOverlayVisible, playerOverlayVisibleHandler] =
    useDisclosure(false)

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
    processingStage,
    setProcessingStage,
    volume,
    setVolume,
    playerControlsVisible: effectivePlayerControlsVisible,
    setPlayerControlsVisible,
    bottomBarHeight,
    setBottomBarHeight,
    playerOverlayVisible,
    playerOverlayVisibleHandler,
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
