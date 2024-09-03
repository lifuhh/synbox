import { useAppContext } from '@/context/AppContext'
import { translationIsEnglishAtom } from '@/context/atoms'
import { useGetLyricsBySongId } from '@/lib/react-query/queriesAndMutations'
import { Models } from 'appwrite'
import { useAtom, useAtomValue } from 'jotai'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { useLocation } from 'react-router-dom'
import { MemoizedLyricTextLine } from './LyricTextLine'

interface LyricsDisplayProps {
  lyricsVisibility: boolean
  romajiVisibility: boolean
  translationVisibility: boolean
  playerRef: React.MutableRefObject<BaseReactPlayer<ReactPlayer> | null>
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

interface LyricsData {
  labelled_full_lyrics: string
  eng_translation: string
  chi_translation: string
  romaji: string
}

function isLyricsData(data: unknown): data is LyricsData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'labelled_full_lyrics' in data &&
    'eng_translation' in data &&
    'chi_translation' in data &&
    'romaji' in data
  )
}

interface LyricsLineType {
  id: string
  startTime: string
  startSeconds: number
  endTime: string
  endSeconds: number
  text: string
}

interface RenderedLyricsType {
  jp: React.ReactNode[]
  eng: React.ReactNode[]
  chi: React.ReactNode[]
  romaji: React.ReactNode[]
}
const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  romajiVisibility,
  translationVisibility,
  lyricsVisibility,
  playerRef,
  playing,
  setPlaying,
}) => {
  const location = useLocation()
  const { playerControlsVisible, bottomBarHeight } = useAppContext()

  const [videoId, setVideoId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [lyricsArr, setLyricsArr] = useState<LyricsLineType[]>([])
  const [lyricsArrEng, setLyricsArrEng] = useState<string[]>([])
  const [lyricsArrChi, setLyricsArrChi] = useState<string[]>([])

  const [lyricsArrRomaji, setLyricsArrRomaji] = useState<string[]>([])

  const [renderedLyrics, setRenderedLyrics] = useState<RenderedLyricsType>({
    jp: [],
    eng: [],
    chi: [],
    romaji: [],
  })
  const [lyricsStyles, setLyricsStyles] = useState<React.CSSProperties[]>([])
  const isTranslationEnglish = useAtomValue(translationIsEnglishAtom)

  const transitionRef = useRef({ isEntering: false, isExiting: false })

  const { data: testLyrics, isLoading: isTestLyricsFetching } =
    useGetLyricsBySongId(videoId || '')

  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    const newVideoId = pathSegments[pathSegments.length - 1]
    if (newVideoId) {
      setVideoId(newVideoId)
    }
  }, [location])

  useEffect(() => {
    if (testLyrics && isLyricsData(testLyrics)) {
      try {
        setLyricsArr(JSON.parse(testLyrics.labelled_full_lyrics))
        setLyricsArrEng(JSON.parse(testLyrics.eng_translation))
        setLyricsArrChi(JSON.parse(testLyrics.chi_translation))
        setLyricsArrRomaji(JSON.parse(testLyrics.romaji))
      } catch (error) {
        console.error('Error parsing lyrics data:', error)
      }
    }
  }, [testLyrics])

  const findCurrentIndex = useCallback(
    (currentTime: number) => {
      if (!lyricsArr) return -1
      return lyricsArr.findIndex(
        (lyric) =>
          currentTime >= lyric.startSeconds && currentTime < lyric.endSeconds,
      )
    },
    [lyricsArr],
  )

  useEffect(() => {
    if (lyricsArr.length > 0) {
      const renderedJp = lyricsArr.map((lyric, index) => (
        <MemoizedLyricTextLine
          key={`${index}-jp-${lyric.id}`}
          htmlContent={lyric.text}
          className='font-outline-4 mb-0 !text-3.5vw'
          lang='ja'
        />
      ))

      const renderedEng = lyricsArrEng.map((lyric, index) => (
        <MemoizedLyricTextLine
          key={`${index}-eng`}
          htmlContent={lyric}
          className='!font_noto_sans_reg font-outline-4 !text-2.4vw'
        />
      ))

      const renderedChi = lyricsArrChi.map((lyric, index) => (
        <MemoizedLyricTextLine
          key={`${index}-chi`}
          htmlContent={lyric}
          className='!font_noto_sans_reg font-outline-4 !text-2.4vw'
        />
      ))

      const renderedRomaji = lyricsArrRomaji.map((lyric, index) => (
        <MemoizedLyricTextLine
          key={`${index}-romaji`}
          htmlContent={lyric}
          className='font-outline-4 !font_noto_sans_reg mb-2 mt-0'
        />
      ))

      setRenderedLyrics({
        jp: renderedJp,
        eng: renderedEng,
        chi: renderedChi,
        romaji: renderedRomaji,
      })
      setLyricsStyles(lyricsArr.map(() => ({ '--kanji-spacing': '0.14em' })))
    }
  }, [lyricsArr, lyricsArrEng, lyricsArrChi, lyricsArrRomaji])

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      if (!playerRef.current) return

      const currentTime = playerRef.current.getCurrentTime()
      if (typeof currentTime !== 'number') return

      const newIndex = findCurrentIndex(currentTime)

      if (newIndex !== currentIndex) {
        transitionRef.current.isExiting = true
        transitionRef.current.isEntering = false

        setTimeout(() => {
          setCurrentIndex(newIndex)
          transitionRef.current.isExiting = false
          transitionRef.current.isEntering = true

          setTimeout(() => {
            transitionRef.current.isEntering = false
          }, 200)
        }, 100)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [currentIndex, findCurrentIndex, playerRef])

  const currentLyric = useMemo(
    () => ({
      jp: lyricsArr[currentIndex]?.text || '',
      romaji: lyricsArrRomaji[currentIndex] || '',
      eng: lyricsArrEng[currentIndex] || '',
      chi: lyricsArrChi[currentIndex] || '',
    }),
    [currentIndex, lyricsArr, lyricsArrRomaji, lyricsArrEng, lyricsArrChi],
  )

  const isContentSame = useCallback(
    (content1: string, content2: string) =>
      content1.trim().toLowerCase() === content2.trim().toLowerCase(),
    [],
  )

  const getOverlayHeight = useMemo(
    () =>
      playerControlsVisible ? `calc(100% - ${bottomBarHeight}px)` : '100%',
    [playerControlsVisible, bottomBarHeight],
  )

  const renderLyricContent = (content: React.ReactNode, condition: boolean) =>
    condition && (
      <div
        className={`${transitionRef.current.isEntering ? 'fade-in' : transitionRef.current.isExiting ? 'fade-out' : ''}`}>
        {content}
      </div>
    )

  return (
    <div
      className='player-lyrics-overlay unselectable pointer-events-none absolute left-0 top-0 z-50 w-full pb-2'
      style={{ height: getOverlayHeight }}>
      <div className='lyric-container flex h-full w-full flex-col justify-end text-center'>
        {renderLyricContent(
          isTranslationEnglish
            ? renderedLyrics.eng[currentIndex]
            : renderedLyrics.chi[currentIndex],
          translationVisibility &&
            !isContentSame(
              isTranslationEnglish ? currentLyric.eng : currentLyric.chi,
              currentLyric.jp,
            ),
        )}
        {renderLyricContent(
          <div style={lyricsStyles[currentIndex]} className='mb-1 !text-3.5vw'>
            {renderedLyrics.jp[currentIndex]}
          </div>,
          lyricsVisibility,
        )}
        {renderLyricContent(
          renderedLyrics.romaji[currentIndex],
          romajiVisibility &&
            !isContentSame(currentLyric.romaji, currentLyric.jp),
        )}
      </div>
    </div>
  )
}

export default React.memo(LyricsDisplay)
