import { CurrentPlayingInfo } from '@/types'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const fullscreenAtom = atom(false)
export const playerControlVisibilityAtom = atom(false)
export const mutedAtom = atom(true)
// export const playerInitVisibilityAtom = atom(false)

export const globalControlsVisibilityAtom = atom(true)

export const lyricsVisibilityAtom = atom(true)
export const romajiVisibilityAtom = atom(true)
export const translationVisibilityAtom = atom(true)
export const translationIsEnglishAtom = atom(true)
export const lyricsDisplayBottomAtom = atom(true)

//? Lyrics Display Font Size
const DEFAULT_FONT_SIZE = 1
const getInitialFontSize = () => {
  const stored = localStorage.getItem('fontSizeMultiplier')
  return stored ? parseFloat(stored) : DEFAULT_FONT_SIZE
}
export const fontSizeMultiplierAtom = atom(getInitialFontSize())

export const fontSizeMultiplierAtomWithPersistence = atom(
  (get) => get(fontSizeMultiplierAtom),
  (get, set, newValue: number) => {
    set(fontSizeMultiplierAtom, newValue)
    localStorage.setItem('fontSizeMultiplier', newValue.toString())
  },
)

export const userInteractedWithSettingsAtom = atom(false)
export const lyricsControlVisibilityAtom = atom(true)

export const dialogStepAtom = atom(0)

// Define a writable base atom
const baseStreamResultAtom = atom<{ id: string; streamData: unknown } | null>(
  null,
)

// Define a read-only derived atom
export const streamResultAtom = atom((get) => {
  const baseValue = get(baseStreamResultAtom)
  if (baseValue) return baseValue

  const storedData = localStorage.getItem('streamResult')
  if (storedData) {
    try {
      return JSON.parse(storedData)
    } catch (error) {
      console.error('Failed to parse stored stream result:', error)
      return null
    }
  }
  return null
})

// Define a writable atom to update streamResult and localStorage
export const setStreamResultAtom = atom(
  null,
  (get, set, newValue: { id: string; streamData: unknown }) => {
    set(baseStreamResultAtom, newValue)
    localStorage.setItem('streamResult', JSON.stringify(newValue))
  },
)

interface AppwriteVideoDataProps {
  id: string
  databaseId: string
  title: string
  thumbnail: string
  AIGeneratedLyrics: boolean
  full_lyrics: string
  romaji: string
  eng_translation: string
  chi_translation: string
  plain_lyrics: string
  labelled_full_lyrics: string
  visit_count: 0
  user_likes: 0
}

export const videoDataAtom = atom<AppwriteVideoDataProps>({
  id: '',
  databaseId: '',
  title: '',
  thumbnail: '',
  AIGeneratedLyrics: false,
  full_lyrics: '',
  romaji: '',
  eng_translation: '',
  chi_translation: '',
  plain_lyrics: '',
  labelled_full_lyrics: '',
  visit_count: 0,
  user_likes: 0,
})

// For favourites

interface FavoriteItem {
  videoId: string
  title: string
  author: string
  thumbnailUrl: string
}

export const currentVideoAtom = atom<CurrentPlayingInfo | null>(null)
export const favoritesAtom = atomWithStorage<FavoriteItem[]>('favorites', [])
export const addFavoriteAtom = atom(
  null,
  (get, set, newFavorite: FavoriteItem) => {
    const favorites = get(favoritesAtom)
    set(favoritesAtom, [...favorites, newFavorite])
  },
)

export const removeFavoriteAtom = atom(null, (get, set, videoId: string) => {
  const favorites = get(favoritesAtom)
  set(
    favoritesAtom,
    favorites.filter((item) => item.videoId !== videoId),
  )
})

export const isFavoriteAtom = atom((get) => (videoId: string) => {
  const favorites = get(favoritesAtom)
  return favorites.some((item) => item.videoId === videoId)
})

// History

interface HistoryItem {
  videoId: string
  title: string
  author: string
  thumbnailUrl: string
  timestamp: number // To track when the video was viewed
}

export const historyAtom = atomWithStorage<HistoryItem[]>('history', [])

// Atom for managing history operations
export const addToHistoryAtom = atom(
  null,
  (get, set, newItem: Omit<HistoryItem, 'timestamp'>) => {
    const history = get(historyAtom)

    // Remove existing entry if present
    const filteredHistory = history.filter(
      (item) => item.videoId !== newItem.videoId,
    )

    // Add new entry at the beginning with timestamp
    const updatedHistory = [
      {
        ...newItem,
        timestamp: Date.now(),
      },
      ...filteredHistory,
    ]

    // Limit history to 100 items to prevent localStorage from getting too large
    const limitedHistory = updatedHistory.slice(0, 100)

    set(historyAtom, limitedHistory)
  },
)
