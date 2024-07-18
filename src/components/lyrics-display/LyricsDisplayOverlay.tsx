import { useAppContext } from '@/context/AppContext'
import { useGetLyricsBySongId } from '@/lib/react-query/queriesAndMutations'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import srtParser2 from 'srt-parser-2'
import LyricTextLine from './LyricTextLine'

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

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  romajiVisibility,
  translationVisibility,
  playerRef,
  playing,
  setPlaying,
}) => {
  //TODO: Delete later - testing getting song lyrics by ID
  const { data: testLyrics, isLoading: isTestLyricsFetching } =
    useGetLyricsBySongId('EaA6NlH80wg')

  //TODO: Fix display lyrics naturally and correctly - this is a hack (part A)
  const [dummyState, setDummyState] = useState(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const noOp = () => {
    // This is a no-op function that just reads the dummy state.
    // It's intended to mimic the effect of console.log triggering a re-render.
    dummyState.toString()
  }

  const { playerControlsVisible, bottomBarHeight } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [lyricsArr, setLyricsArr] = useState<LyricsLineType[]>([])
  const [lyricsArrEng, setLyricsArrEng] = useState<string[]>([])
  const [lyricsArrRomaji, setLyricsArrRomaji] = useState<string[]>([])
  const [currentJpLyric, setCurrentJpLyric] = useState('')
  const [currentRomajiLyric, setCurrentRomajiLyric] = useState('')
  const [currentEngLyric, setCurrentEngLyric] = useState('')

  //* For shifting lyrics up when bottombar is visible
  const getOverlayHeight = useMemo(() => {
    return playerControlsVisible ? `calc(100% - ${bottomBarHeight}px)` : '100%'
  }, [playerControlsVisible, bottomBarHeight])

  //! For test fetch lyrics
  useEffect(() => {
    const fetchSrt = async () => {
      const response = await fetch(
        '/src/components/generate-lyrics/test_data/yss_orig.srt',
      )
      const srtText = await response.text()
      const srtParser = new srtParser2()
      const parsedLyrics = srtParser.fromSrt(srtText)
      // setLyricsArr(parsedLyrics)
      setLyricsArr(JSON.parse(testStr))

      const responseEng = await fetch(
        '/src/components/generate-lyrics/test_data/yss_eng.txt',
      )
      const engText = await responseEng.text()
      const engLines = engText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
      setLyricsArrEng(engLines)

      const responseRomaji = await fetch(
        '/src/components/generate-lyrics/test_data/yss_romaji.txt',
      )
      const romajiText = await responseRomaji.text()
      const romajiLines = romajiText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
      setLyricsArrRomaji(romajiLines)
    }

    if (testLyrics) {
      setLyricsArr(JSON.parse(testLyrics.labelled_full_lyrics))
      setLyricsArrEng(JSON.parse(testLyrics.eng_translation))
      setLyricsArrRomaji(JSON.parse(testLyrics.romaji))
    } else {
      fetchSrt()
    }
  }, [testLyrics])

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

  useEffect(() => {
    let animationFrameId: number

    const animate = () => {
      if (!playerRef.current) return

      const currentTime = playerRef.current.getCurrentTime()
      if (typeof currentTime !== 'number') return

      const newIndex = findCurrentIndex(currentTime)

      if (newIndex !== currentIndex) {
        //TODO: Fix display lyrics naturally and correctly - this is a hack (part B)
        noOp()
        // console.log({ newIndex, currentIndex })
        setCurrentIndex(newIndex)
        if (newIndex !== -1) {
          setCurrentJpLyric(lyricsArr[newIndex].text)
          setCurrentRomajiLyric(lyricsArrRomaji[newIndex] || '')
          setCurrentEngLyric(lyricsArrEng[newIndex] || '')
        } else {
          setCurrentJpLyric('')
          setCurrentRomajiLyric('')
          setCurrentEngLyric('')
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [
    currentIndex,
    findCurrentIndex,
    lyricsArr,
    lyricsArrEng,
    lyricsArrRomaji,
    playerRef,
    dummyState,
    noOp,
  ])

  return (
    <div
      className={`player-lyrics-overlay unselectable pointer-events-none absolute left-0 top-0 z-50 w-full`}
      style={{ height: getOverlayHeight }}>
      <div className='flex h-full w-full flex-col justify-end text-center'>
        {/* //! Translation Toggle-able */}
        <LyricTextLine
          htmlContent={lyricsArrEng ? currentEngLyric : ''}
          className='!font_noto_sans_reg mb-0 !text-2.4vw'
          // divStyle={{ marginTop: '3rem', border: '1px solid red' }}
        />

        {/* //! Main Lyrics */}
        <LyricTextLine
          className='!font-outline-4 !text-3.5vw'
          htmlContent={lyricsArr ? currentJpLyric : ''}
          // divStyle={{ border: '1px solid yellow ' }}
          //! Control kanji spacing here
          kanjiSpacing='0.12em'
          lang='ja'
        />

        {/* //! Romaji Toggleable */}
        <LyricTextLine
          htmlContent={lyricsArrRomaji ? currentRomajiLyric : ''}
          className='!font_noto_sans_reg mb-2 mt-0'
        />
      </div>
    </div>
  )
}

export default LyricsDisplay
