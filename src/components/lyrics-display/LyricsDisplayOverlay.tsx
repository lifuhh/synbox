import {
  addToHistoryAtom,
  currentVideoAtom,
  fontSizeMultiplierAtom,
  lyricsDisplayBottomAtom,
  translationIsEnglishAtom,
} from '@/context/atoms'
import {
  useAddSongInfoBySongId,
  useGetLyricsBySongId,
  useGetSongInfoBySongId,
  useGetYoutubeVideoInfo,
} from '@/lib/react-query/queriesAndMutations'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { useLocation } from 'react-router-dom'
import { MemoizedLyricTextLine } from './LyricTextLine'

interface LyricsDisplayOverlayProps {
  lyricsVisibility: boolean
  romajiVisibility: boolean
  translationVisibility: boolean
  playerRef: React.MutableRefObject<BaseReactPlayer<ReactPlayer> | null>
  playing: boolean
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
function LyricsDisplayOverlay({
  romajiVisibility,
  translationVisibility,
  lyricsVisibility,
  playerRef,
}: LyricsDisplayOverlayProps) {
  const location = useLocation()

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
  const isLyricsDisplayBottom = useAtomValue(lyricsDisplayBottomAtom)
  const [currentVideo, setCurrentVideo] = useAtom(currentVideoAtom)
  const setHistory = useSetAtom(addToHistoryAtom)

  const transitionRef = useRef({ isEntering: false, isExiting: false })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: currentSongLyrics, isLoading } = useGetLyricsBySongId(
    videoId || '',
  )

  const {
    data: currentSongInfo,
    isLoading: isFetchingSongInfo,
    isError: isSongInfoError,
  } = useGetSongInfoBySongId(videoId || '')

  const { data: youtubeInfo, isLoading: isLoadingYoutubeInfo } =
    useGetYoutubeVideoInfo(videoId || '')

  const { mutate: addSongInfo } = useAddSongInfoBySongId()

  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    const newVideoId = pathSegments[pathSegments.length - 1]
    setCurrentVideo(null)
    if (newVideoId) {
      setVideoId(newVideoId)
    }

    // Cleanup function
    return () => {
      setCurrentVideo(null)
      setVideoId(null)
    }
  }, [location, setCurrentVideo])

  useEffect(() => {
    if (currentSongLyrics && isLyricsData(currentSongLyrics)) {
      try {
        setLyricsArr(JSON.parse(currentSongLyrics.labelled_full_lyrics))
        setLyricsArrEng(JSON.parse(currentSongLyrics.eng_translation))
        setLyricsArrChi(JSON.parse(currentSongLyrics.chi_translation))
        setLyricsArrRomaji(JSON.parse(currentSongLyrics.romaji))
      } catch (error) {
        console.error('Error parsing lyrics data:', error)
      }
    }
  }, [currentSongLyrics])

  useEffect(() => {
    if (!videoId || isLoadingYoutubeInfo || isFetchingSongInfo) {
      // Still loading, keep currentVideo as null
      return
    }

    // If song info doesn't exist in database and we have YouTube info
    if (isSongInfoError && youtubeInfo) {
      const formattedSongInfo = {
        videoId,
        title: youtubeInfo.title,
        author: youtubeInfo.channelTitle,
        thumbnailUrl: youtubeInfo.thumbnail,
      }

      addSongInfo(formattedSongInfo, {
        onSuccess: (newSongInfo) => {
          console.log('Successfully added song info to database:', newSongInfo)
          setCurrentVideo(formattedSongInfo)
        },
        onError: (error) => {
          console.error('Error adding song info to database:', error)
          // Optionally set currentVideo to null here if you want to ensure error state
          setCurrentVideo(null)
        },
      })
    } else if (currentSongInfo) {
      // We have the song info from database
      setCurrentVideo(currentSongInfo)
    } else {
      // No song info and no YouTube info
      setCurrentVideo(null)
    }
  }, [
    videoId,
    currentSongInfo,
    youtubeInfo,
    isSongInfoError,
    isLoadingYoutubeInfo,
    isFetchingSongInfo,
    addSongInfo,
    setCurrentVideo,
  ])

  useEffect(() => {
    if (currentVideo) {
      const { videoId, title, author, thumbnailUrl } = currentVideo
      setHistory({
        videoId,
        title,
        author,
        thumbnailUrl,
      })
    }
  }, [currentVideo, setHistory])

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
      setLyricsStyles(
        lyricsArr.map(
          () => ({ '--kanji-spacing': '0.14em' }) as React.CSSProperties,
        ),
      )
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

  const getOverlayHeight = '100%'

  const getOverlayPosition = useMemo(() => {
    if (isLyricsDisplayBottom) {
      return {
        bottom: '0px',
        top: '0px',
      }
    } else {
      return { top: '60px', bottom: '0px' }
    }
  }, [isLyricsDisplayBottom])

  //TODO: Font size multiplier testing
  const fontSizeMultiplier = useAtomValue(fontSizeMultiplierAtom)

  const renderLyricLine = useCallback(
    (
      content: React.ReactNode,
      visibility: boolean,
      type: 'translation' | 'lyrics' | 'romaji',
    ) => {
      if (!visibility || !content) return null

      const baseClass =
        'transition-all duration-200 ease-in-out text-center w-full'
      let typeClass = ''

      switch (type) {
        case 'translation':
          typeClass = '!text-2.4vw'
          break
        case 'lyrics':
          typeClass = '!text-3.5vw'
          break
        case 'romaji':
          typeClass = '!text-2.4vw'
          break
      }

      return (
        <div
          className={`${baseClass} ${typeClass} ${
            transitionRef.current.isEntering
              ? ''
              : transitionRef.current.isExiting
                ? ''
                : ''
          }`}>
          {content}
        </div>
      )
    },
    [],
  )

  const lyricLines = useMemo(() => {
    const lines = [
      {
        key: 'translation',
        content: renderLyricLine(
          isTranslationEnglish
            ? renderedLyrics.eng[currentIndex]
            : renderedLyrics.chi[currentIndex],
          translationVisibility &&
            !isContentSame(
              isTranslationEnglish ? currentLyric.eng : currentLyric.chi,
              currentLyric.jp,
            ),
          'translation',
        ),
      },
      {
        key: 'lyrics',
        content: renderLyricLine(
          <div
            style={lyricsStyles[currentIndex]}
            className='w-full text-center'>
            {renderedLyrics.jp[currentIndex]}
          </div>,
          lyricsVisibility,
          'lyrics',
        ),
      },
      {
        key: 'romaji',
        content: renderLyricLine(
          renderedLyrics.romaji[currentIndex],
          romajiVisibility &&
            !isContentSame(currentLyric.romaji, currentLyric.jp),
          'romaji',
        ),
      },
    ]

    return isLyricsDisplayBottom ? lines : lines.reverse()
  }, [
    isLyricsDisplayBottom,
    isTranslationEnglish,
    renderedLyrics,
    currentIndex,
    translationVisibility,
    lyricsVisibility,
    romajiVisibility,
    currentLyric,
    lyricsStyles,
    renderLyricLine,
    isContentSame,
  ])

  return (
    <div
      className='player-lyrics-overlay unhighlightable absolute left-0 z-50 w-full'
      style={{
        ...getOverlayPosition,
        height: isLyricsDisplayBottom ? getOverlayHeight : 'auto',
        display: 'flex',
        flexDirection: isLyricsDisplayBottom ? 'column-reverse' : 'column',
        pointerEvents: 'none',
      }}>
      <div
        className={`lyric-container flex w-full items-center justify-start ${
          isLyricsDisplayBottom ? 'pb-0' : 'pt-4'
        }`}>
        <div
          className='flex w-full flex-col items-center'
          style={{
            transform: `scale(${fontSizeMultiplier})`,
            transformOrigin: isLyricsDisplayBottom
              ? 'center bottom'
              : 'center top',
          }}>
          {lyricLines.map(({ key, content }) => (
            <React.Fragment key={key}>{content}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

const MemoizedLyricsDisplayOverlay = React.memo(LyricsDisplayOverlay)
export default MemoizedLyricsDisplayOverlay
