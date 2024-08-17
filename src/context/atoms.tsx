import { atom } from 'jotai'

export const fullscreenAtom = atom(false)
export const playerControlVisibilityAtom = atom(false)
export const mutedAtom = atom(true)
// export const playerInitVisibilityAtom = atom(false)

export const lyricsVisibilityAtom = atom(true)
export const romajiVisibilityAtom = atom(true)
export const translationVisibilityAtom = atom(true)

// Define a writable base atom
const baseStreamResultAtom = atom<{ id: string; streamData: any } | null>(null)

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
  (get, set, newValue: { id: string; streamData: any }) => {
    set(baseStreamResultAtom, newValue)
    localStorage.setItem('streamResult', JSON.stringify(newValue))
  },
)
