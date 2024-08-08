import { atom } from 'jotai'

export const fullscreenAtom = atom(false)
export const playerControlVisibilityAtom = atom(false)
export const mutedAtom = atom(true)
//? read and write from separate components
// import { useAtomValue, useSetAtom } from 'jotai'

// setPlayerMuted, muted from AppContext

export const lyricsVisibilityAtom = atom(true)
export const romajiVisibilityAtom = atom(true)
export const translationVisibilityAtom = atom(true)
