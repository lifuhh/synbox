import { atom } from 'jotai'

export const fullscreenAtom = atom(false)
export const playerControlVisibilityAtom = atom(false)
export const mutedAtom = atom(true)
// export const playerInitVisibilityAtom = atom(false)

export const globalControlsVisibilityAtom = atom(true)

export const lyricsVisibilityAtom = atom(true)
export const romajiVisibilityAtom = atom(true)
export const translationVisibilityAtom = atom(true)
export const translationIsEnglishAtom = atom(true)
export const lyricsDisplayBottomAtom = atom(false)
export const fontSizeMultiplierAtom = atom(1)

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
