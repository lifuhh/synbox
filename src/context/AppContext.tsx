/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentUser } from '@/lib/appwrite/api'
import { useDisclosure } from '@mantine/hooks'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
  id: '',
  name: '',
  // username: '',
  // subscription: '',
}

interface AppContextType {
  //* Auth
  user: typeof INITIAL_USER
  isLoading: boolean
  isAuthenticated: boolean
  setUser: (user: typeof INITIAL_USER) => void
  setIsAuthenticated: (isAuthenticated: boolean) => void
  checkAuthUser: () => Promise<boolean>
  //* Player stuff
  muted: boolean
  videoId: string
  volume: number
  processingStage: number
  isFullscreen: boolean
  // playing: boolean
  setPlayerMuted: (muted: boolean) => void
  setVideoId: (videoId: string) => void
  setVolume: (volume: number) => void
  setProcessingStage: (stage: number) => void
  playerControlsVisible: boolean
  setPlayerControlsVisible: (visibility: boolean) => void
  setIsFullscreen: (isFullscreen: boolean) => void
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
  //* Auth stuff
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user: typeof INITIAL_USER) => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  //* Player stuff
  videoId: '',
  volume: 0,
  muted: true,
  processingStage: 1,
  playerControlsVisible: true,
  isFullscreen: false,
  setVideoId: (videoId: string) => {},
  setProcessingStage: (stage: number) => {},
  setVolume: (volume: number) => {},
  setPlayerMuted: (muted: boolean) => {},
  setPlayerControlsVisible: (visibility: boolean) => {},
  setIsFullscreen: (isFullscreen: boolean) => {},
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

  //* Auth Stuff
  const [user, setUser] = useState<typeof INITIAL_USER>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  const checkAuthUser = async () => {
    setIsLoading(true)

    try {
      const currentUser = await getCurrentUser()

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          // username: currentUser.username,
          // subscription: currentUser.subscription,
        })
        console.log('This is user')
        console.log(user)
        setIsAuthenticated(true)
        return true
      }

      return false
    } catch (error) {
      console.log(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  //* Bottom Bar Height Stuff
  const [bottomBarHeight, setBottomBarHeight] = useState(0)

  //* Player Stuff
  const [muted, setPlayerMuted] = useState<boolean>(true)
  const [videoId, setVideoId] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [playerControlsVisible, setPlayerControlsVisible] =
    useState<boolean>(true)
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
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    videoId,
    setVideoId,
    muted,
    setPlayerMuted,
    processingStage,
    setProcessingStage,
    volume,
    setVolume,
    playerControlsVisible,
    setPlayerControlsVisible,
    isFullscreen,
    setIsFullscreen,
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
