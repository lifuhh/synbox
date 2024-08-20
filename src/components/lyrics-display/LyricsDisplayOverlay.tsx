import { useAppContext } from '@/context/AppContext'
import { useGetLyricsBySongId } from '@/lib/react-query/queriesAndMutations'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { useLocation } from 'react-router-dom'
import { MemoizedLyricTextLine } from './LyricTextLine'

interface LyricsDisplayProps {
  romajiVisibility: boolean
  translationVisibility: boolean
  playerRef: React.MutableRefObject<BaseReactPlayer<ReactPlayer> | null>
  playing: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
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
  romaji: React.ReactNode[]
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  romajiVisibility,
  translationVisibility,
  playerRef,
  playing,
  setPlaying,
}) => {
  const location = useLocation()

  const [videoId, setVideoId] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { data: testLyrics, isLoading: isTestLyricsFetching } =
    useGetLyricsBySongId(videoId || '')

  useEffect(() => {
    const pathSegments = location.pathname.split('/')
    const newVideoId = pathSegments[pathSegments.length - 1]
    if (newVideoId) {
      setVideoId(newVideoId)
    }

    if (!playerRef.current) return
  }, [location, playerRef])

  //TODO: Fix display lyrics naturally and correctly - this is a hack (part A)
  const [dummyState, setDummyState] = useState(0)
  const noOp = () => {
    // This is a no-op function that just reads the dummy state.
    // It's intended to mimic the effect of console.log triggering a re-render.
    dummyState.toString()
  }

  const { playerControlsVisible, bottomBarHeight } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [lyricsArr, setLyricsArr] = useState<LyricsLineType[]>([])
  const [lyricsArrEng, setLyricsArrEng] = useState<string[]>([])
  const [lyricsArrChi, setLyricsArrChi] = useState<string[]>([])
  const [lyricsArrRomaji, setLyricsArrRomaji] = useState<string[]>([])

  const [isEntering, setIsEntering] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // New state for pre-rendered lyrics and styles
  const [renderedLyrics, setRenderedLyrics] = useState<RenderedLyricsType>({
    jp: [],
    eng: [],
    romaji: [],
  })
  const [lyricsStyles, setLyricsStyles] = useState<React.CSSProperties[]>([])

  //! Pre-render all types of lyrics - KEY to performance
  useEffect(() => {
    if (lyricsArr.length > 0) {
      const renderedJp = lyricsArr.map((lyric, index) => (
        <MemoizedLyricTextLine
          key={`${index}-jp-${lyric.id}`}
          htmlContent={lyric.text}
          className={`font-outline-4 mb-0 !text-3.5vw`}
          lang='ja'
          //TODO: blur is too ugly, need to find a better way to do this or else just dont add
          // useBlur={lyric.text.trim() !== ''}
        />
      ))

      const renderedEng = lyricsArrEng.map((lyric, index) => (
        <MemoizedLyricTextLine
          key={`${index}-eng`}
          htmlContent={lyric}
          className={`!font_noto_sans_reg font-outline-4 !text-2.4vw`}
        />
      ))

      const renderedRomaji = lyricsArrRomaji.map((lyric, index) => (
        <MemoizedLyricTextLine
          key={`${index}-romaji`}
          htmlContent={lyric}
          className={`font-outline-4 !font_noto_sans_reg mb-2 mt-0`}
        />
      ))

      setRenderedLyrics({
        jp: renderedJp,
        eng: renderedEng,
        romaji: renderedRomaji,
      })

      const styles = lyricsArr.map(
        () => ({ '--kanji-spacing': '0.14em' }) as React.CSSProperties,
      )
      setLyricsStyles(styles)
    }
  }, [lyricsArr, lyricsArrEng, lyricsArrRomaji])
  // const [currentJpLyric, setCurrentJpLyric] = useState('')
  // const [currentRomajiLyric, setCurrentRomajiLyric] = useState('')
  // const [currentEngLyric, setCurrentEngLyric] = useState('')
  // const [currentChiLyric, setCurrentChiLyric] = useState('')

  const findCurrentIndex = useCallback(
    (currentTime: number) => {
      if (!lyricsArr) return -1

      for (let i = 0; i < lyricsArr.length; i++) {
        if (
          currentTime >= lyricsArr[i].startSeconds &&
          currentTime < lyricsArr[i].endSeconds
        ) {
          return i
        }
      }
      return -1 // Return -1 if no matching lyric is found
    },
    [lyricsArr],
  )

  //* For shifting lyrics up when bottombar is visible
  const getOverlayHeight = useMemo(() => {
    return playerControlsVisible ? `calc(100% - ${bottomBarHeight}px)` : '100%'
  }, [playerControlsVisible, bottomBarHeight])

  //! For test fetch lyrics
  useEffect(() => {
    if (testLyrics) {
      setLyricsArr(JSON.parse(testLyrics.labelled_full_lyrics))
      setLyricsArrEng(JSON.parse(testLyrics.eng_translation))
      setLyricsArrChi(JSON.parse(testLyrics.chi_translation))
      setLyricsArrRomaji(JSON.parse(testLyrics.romaji))
    }
  }, [testLyrics])

  useEffect(() => {
    let animationFrameId: number
    let transitionOutTimer: NodeJS.Timeout
    let transitionInTimer: NodeJS.Timeout

    const animate = () => {
      if (!playerRef.current) return

      const currentTime = playerRef.current.getCurrentTime()
      if (typeof currentTime !== 'number') return

      const newIndex = findCurrentIndex(currentTime)

      if (newIndex !== currentIndex) {
        noOp()
        setIsTransitioning(true)
        setIsExiting(true)

        // Transition out
        transitionOutTimer = setTimeout(() => {
          setCurrentIndex(newIndex)
          setIsExiting(false)
          setIsEntering(true)

          // Transition in
          transitionInTimer = setTimeout(() => {
            setIsEntering(false)
          }, 200) // 0.2 seconds for fade-in
        }, 100) // 0.1 seconds for fade-out
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(transitionOutTimer)
      clearTimeout(transitionInTimer)
    }
  }, [currentIndex, findCurrentIndex, playerRef])

  const currentLyric = useMemo(() => {
    if (currentIndex === -1 || !lyricsArr[currentIndex])
      return { jp: '', romaji: '', eng: '', chi: '' }
    return {
      jp: lyricsArr[currentIndex].text,
      romaji: lyricsArrRomaji[currentIndex] || '',
      eng: lyricsArrEng[currentIndex] || '',
      chi: lyricsArrChi[currentIndex] || '',
    }
  }, [currentIndex, lyricsArr, lyricsArrRomaji, lyricsArrEng, lyricsArrChi])

  const isContentSame = (content1: string, content2: string) => {
    return content1.trim().toLowerCase() === content2.trim().toLowerCase()
  }

  //TODO: remove after testing
  // useEffect(() => {
  //   console.log('LyricsDisplay mounted')
  //   return () => console.log('LyricsDisplay unmounted')
  // }, [])

  // useEffect(() => {
  //   console.log('videoId changed:', videoId)
  // }, [videoId])

  // useEffect(() => {
  //   console.log('testLyrics received:', testLyrics)
  // }, [testLyrics])

  // useEffect(() => {
  //   console.log('lyricsArr updated:', lyricsArr)
  //   console.log('currentIndex:', currentIndex)
  // }, [lyricsArr, currentIndex])

  return (
    <div
      className={`player-lyrics-overlay unselectable pointer-events-none absolute left-0 top-0 z-50 w-full`}
      style={{ height: getOverlayHeight }}>
      {/* {renderedLyrics.jp.length === 0 && <div>Loading lyrics...</div>} */}
      {/* {playing && ( */}
      <div
        className={`lyric-container flex h-full w-full flex-col justify-end text-center `}>
        {/* //TODO: Test code, remove after testing */}
        {/* <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'white',
            color: 'black',
            zIndex: 9999,
          }}>
          Current Index: {currentIndex}
          <br />
          Lyrics Length: {lyricsArr.length}
          <br />
          Is Transitioning: {isTransitioning ? 'Yes' : 'No'}
        </div> */}
        {/* //! Translation Toggle-able */}
        {/* //? English */}
        {translationVisibility &&
          !isContentSame(currentLyric.eng, currentLyric.jp) && (
            <div
              className={`${isEntering ? 'fade-in' : isExiting ? 'fade-out' : ''}`}>
              {renderedLyrics.eng[currentIndex]}
            </div>
          )}
        {/* //? Chinese */}
        {/* {translationVisibility &&
            !isContentSame(currentLyric.chi, currentLyric.jp) && (
              <LyricTextLine
                key={`chi-${currentIndex}`}
                htmlContent={currentLyric.chi}
                className={`!font_noto_sans_reg !text-2.4vw ${isEntering ? 'fade-in' : isExiting ? 'fade-out' : ''}`}
                useBlur={false}
              />
            )} */}
        {/* //! Main Lyrics */}
        {renderedLyrics.jp[currentIndex] && (
          <div
            style={lyricsStyles[currentIndex]}
            className={`!text-3.5vw ${isEntering ? 'fade-in' : isExiting ? 'fade-out' : ''} ${romajiVisibility ? 'mb-0' : 'mb-4'}`}>
            {renderedLyrics.jp[currentIndex]}
          </div>
        )}
        {/* <LyricTextLine
            key={`jp-${currentIndex}`}
            className={`!font-outline-4 mb-0 !text-3.5vw ${isEntering ? 'fade-in' : isExiting ? 'fade-out' : ''}`}
            htmlContent={currentLyric.jp}
            kanjiSpacing='0.14em'
            lang='ja'
            useBlur={shouldUseBlurJp}
          /> */}

        {/* //! Romaji Toggleable */}
        {romajiVisibility &&
          !isContentSame(currentLyric.romaji, currentLyric.jp) && (
            <div
              className={`${isEntering ? 'fade-in' : isExiting ? 'fade-out' : ''}`}>
              {renderedLyrics.romaji[currentIndex]}
            </div>
          )}
      </div>
      ){/* } */}
    </div>
  )
}

export default LyricsDisplay
