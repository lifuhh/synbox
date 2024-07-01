import { useAppContext } from '@/context/AppContext'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import BaseReactPlayer from 'react-player/base'
import srtParser2 from 'srt-parser-2'
import LyricTextLine from './LyricTextLine'

const testStr =
  '[{"id":"1","startTime":"00:00:27,884","startSeconds":27.884,"endTime":"00:00:33,494","endSeconds":33.494,"text":"この<ruby>曲<rp>(</rp><rt>きょく</rt><rp>)</rp></ruby>には<ruby>原作<rp>(</rp><rt>げんさく</rt><rp>)</rp></ruby>の<ruby>物語<rp>(</rp><rt>ものがたり</rt><rp>)</rp></ruby>があって、"},{"id":"2","startTime":"00:00:36,781","startSeconds":36.781,"endTime":"00:00:47,790","endSeconds":47.79,"text":"<ruby>立場<rp>(</rp><rt>たちば</rt><rp>)</rp></ruby>の<ruby>違<rp>(</rp><rt>ちが</rt><rp>)</rp></ruby>う2<ruby>人<rp>(</rp><rt>ふたり</rt><rp>)</rp></ruby>が<ruby>残酷<rp>(</rp><rt>ざんこく</rt><rp>)</rp></ruby>な<ruby>世界<rp>(</rp><rt>せかい</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>ですごく<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しく<ruby>友情<rp>(</rp><rt>ゆうじょう</rt><rp>)</rp></ruby>を<ruby>育<rp>(</rp><rt>そだ</rt><rp>)</rp></ruby>む"},{"id":"3","startTime":"00:00:49,393","startSeconds":49.393,"endTime":"00:00:51,966","endSeconds":51.966,"text":"そんな<ruby>曲<rp>(</rp><rt>きょく</rt><rp>)</rp></ruby>になっています。なので、"},{"id":"4","startTime":"00:00:55,202","startSeconds":55.202,"endTime":"00:01:01,724","endSeconds":61.724,"text":"<ruby>私<rp>(</rp><rt>わたし</rt><rp>)</rp></ruby>もその<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しすぎる<ruby>優<rp>(</rp><rt>やさ</rt><rp>)</rp></ruby>しさを<ruby>歌<rp>(</rp><rt>うた</rt><rp>)</rp></ruby>に<ruby>乗<rp>(</rp><rt>の</rt><rp>)</rp></ruby>せられるように、"},{"id":"5","startTime":"00:01:03,437","startSeconds":63.437,"endTime":"00:01:05,437","endSeconds":65.437,"text":"<ruby>心<rp>(</rp><rt>こころ</rt><rp>)</rp></ruby>を<ruby>込<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>めて<ruby>歌<rp>(</rp><rt>うた</rt><rp>)</rp></ruby>いたいと<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>います。"},{"id":"6","startTime":"00:01:13,354","startSeconds":73.354,"endTime":"00:01:14,781","endSeconds":74.781,"text":"お<ruby>願<rp>(</rp><rt>ねが</rt><rp>)</rp></ruby>いします。"},{"id":"7","startTime":"00:01:20,275","startSeconds":80.275,"endTime":"00:01:24,717","endSeconds":84.717,"text":"<ruby>今<rp>(</rp><rt>いま</rt><rp>)</rp></ruby>、<ruby>静<rp>(</rp><rt>しず</rt><rp>)</rp></ruby>かな<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で"},{"id":"8","startTime":"00:01:24,717","startSeconds":84.717,"endTime":"00:01:31,584","endSeconds":91.584,"text":"<ruby>無<rp>(</rp><rt>む</rt><rp>)</rp></ruby><ruby>計画<rp>(</rp><rt>けいかく</rt><rp>)</rp></ruby>に<ruby>車<rp>(</rp><rt>くるま</rt><rp>)</rp></ruby>を<ruby>走<rp>(</rp><rt>はし</rt><rp>)</rp></ruby>らせた"},{"id":"9","startTime":"00:01:31,584","startSeconds":91.584,"endTime":"00:01:35,178","endSeconds":95.178,"text":"<ruby>左<rp>(</rp><rt>ひだり</rt><rp>)</rp></ruby><ruby>隣<rp>(</rp><rt>となり</rt><rp>)</rp></ruby>、あなたの"},{"id":"10","startTime":"00:01:35,178","startSeconds":95.178,"endTime":"00:01:40,085","endSeconds":100.085,"text":"<ruby>横顔<rp>(</rp><rt>よこがお</rt><rp>)</rp></ruby>を<ruby>月<rp>(</rp><rt>つき</rt><rp>)</rp></ruby>が<ruby>照<rp>(</rp><rt>て</rt><rp>)</rp></ruby>らした"},{"id":"11","startTime":"00:01:41,541","startSeconds":101.541,"endTime":"00:01:46,066","endSeconds":106.066,"text":"ただ、<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>を<ruby>探<rp>(</rp><rt>さが</rt><rp>)</rp></ruby>る<ruby>様<rp>(</rp><rt>よう</rt><rp>)</rp></ruby>に"},{"id":"12","startTime":"00:01:46,066","startSeconds":106.066,"endTime":"00:01:53,749","endSeconds":113.749,"text":"<ruby>辿<rp>(</rp><rt>たど</rt><rp>)</rp></ruby>る<ruby>様<rp>(</rp><rt>よう</rt><rp>)</rp></ruby>に<ruby>言葉<rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>を<ruby>繋<rp>(</rp><rt>つな</rt><rp>)</rp></ruby>ぎ<ruby>合<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>わせれば"},{"id":"13","startTime":"00:01:53,749","startSeconds":113.749,"endTime":"00:01:59,118","endSeconds":119.118,"text":"どうしようもなく<ruby>溢<rp>(</rp><rt>あふ</rt><rp>)</rp></ruby>れてくる"},{"id":"14","startTime":"00:01:59,118","startSeconds":119.118,"endTime":"00:02:01,146","endSeconds":121.146,"text":"<ruby>日々<rp>(</rp><rt>ひび</rt><rp>)</rp></ruby>の<ruby>記憶<rp>(</rp><rt>きおく</rt><rp>)</rp></ruby>"},{"id":"15","startTime":"00:02:02,145","startSeconds":122.145,"endTime":"00:02:08,583","endSeconds":128.583,"text":"あなたのそばで<ruby>生<rp>(</rp><rt>い</rt><rp>)</rp></ruby>きると<ruby>決<rp>(</rp><rt>き</rt><rp>)</rp></ruby>めたその<ruby>日<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>から"},{"id":"16","startTime":"00:02:08,583","startSeconds":128.583,"endTime":"00:02:13,560","endSeconds":133.56,"text":"<ruby>少<rp>(</rp><rt>すこ</rt><rp>)</rp></ruby>しずつ<ruby>変<rp>(</rp><rt>か</rt><rp>)</rp></ruby>わり<ruby>始<rp>(</rp><rt>はじ</rt><rp>)</rp></ruby>めた<ruby>世界<rp>(</rp><rt>せかい</rt><rp>)</rp></ruby>"},{"id":"17","startTime":"00:02:13,560","startSeconds":133.56,"endTime":"00:02:18,878","endSeconds":138.878,"text":"<ruby>強<rp>(</rp><rt>つよ</rt><rp>)</rp></ruby>く<ruby>在<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>るように<ruby>弱<rp>(</rp><rt>よわ</rt><rp>)</rp></ruby>さを<ruby>隠<rp>(</rp><rt>かく</rt><rp>)</rp></ruby>すように"},{"id":"18","startTime":"00:02:18,878","startSeconds":138.878,"endTime":"00:02:23,225","endSeconds":143.225,"text":"<ruby>演<rp>(</rp><rt>えん</rt><rp>)</rp></ruby>じてきた<ruby>日々<rp>(</rp><rt>ひび</rt><rp>)</rp></ruby>に"},{"id":"19","startTime":"00:02:23,225","startSeconds":143.225,"endTime":"00:02:29,881","endSeconds":149.881,"text":"ある<ruby>日<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby><ruby>突然<rp>(</rp><rt>とつぜん</rt><rp>)</rp></ruby><ruby>現<rp>(</rp><rt>あらわ</rt><rp>)</rp></ruby>れたその<ruby>眼差<rp>(</rp><rt>まなざ</rt><rp>)</rp></ruby>しが"},{"id":"20","startTime":"00:02:29,881","startSeconds":149.881,"endTime":"00:02:34,869","endSeconds":154.869,"text":"<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>らなかったこと<ruby>教<rp>(</rp><rt>おし</rt><rp>)</rp></ruby>えてくれた"},{"id":"21","startTime":"00:02:34,869","startSeconds":154.869,"endTime":"00:02:40,181","endSeconds":160.181,"text":"<ruby>守<rp>(</rp><rt>まも</rt><rp>)</rp></ruby>るべきものがあればそれだけで"},{"id":"22","startTime":"00:02:40,181","startSeconds":160.181,"endTime":"00:02:45,968","endSeconds":165.968,"text":"こんなにも<ruby>強<rp>(</rp><rt>つよ</rt><rp>)</rp></ruby>くなれるんだ"},{"id":"23","startTime":"00:03:01,474","startSeconds":181.474,"endTime":"00:03:06,582","endSeconds":186.582,"text":"<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>い<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>い<ruby>暗闇<rp>(</rp><rt>くらやみ</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で"},{"id":"24","startTime":"00:03:06,582","startSeconds":186.582,"endTime":"00:03:10,908","endSeconds":190.908,"text":"<ruby>出会<rp>(</rp><rt>であ</rt><rp>)</rp></ruby>い、<ruby>共<rp>(</rp><rt>とも</rt><rp>)</rp></ruby>に<ruby>過<rp>(</rp><rt>す</rt><rp>)</rp></ruby>ごしてきた"},{"id":"25","startTime":"00:03:10,908","startSeconds":190.908,"endTime":"00:03:13,602","endSeconds":193.602,"text":"<ruby>類<rp>(</rp><rt>たぐい</rt><rp>)</rp></ruby>の<ruby>無<rp>(</rp><rt>な</rt><rp>)</rp></ruby>い<ruby>日々<rp>(</rp><rt>ひび</rt><rp>)</rp></ruby>"},{"id":"26","startTime":"00:03:13,602","startSeconds":193.602,"endTime":"00:03:15,241","endSeconds":195.241,"text":"<ruby>心<rp>(</rp><rt>こころ</rt><rp>)</rp></ruby><ruby>地<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>よかった"},{"id":"27","startTime":"00:03:15,241","startSeconds":195.241,"endTime":"00:03:17,887","endSeconds":197.887,"text":"いや、<ruby>幸<rp>(</rp><rt>しあわ</rt><rp>)</rp></ruby>せだった"},{"id":"28","startTime":"00:03:17,887","startSeconds":197.887,"endTime":"00:03:22,115","endSeconds":202.115,"text":"<ruby>確<rp>(</rp><rt>たし</rt><rp>)</rp></ruby>かにほら<ruby>救<rp>(</rp><rt>すく</rt><rp>)</rp></ruby>われたんだよ"},{"id":"29","startTime":"00:03:22,115","startSeconds":202.115,"endTime":"00:03:25,386","endSeconds":205.386,"text":"あなたに"},{"id":"30","startTime":"00:03:26,185","startSeconds":206.185,"endTime":"00:03:32,934","endSeconds":212.934,"text":"わずかな<ruby>光<rp>(</rp><rt>ひかり</rt><rp>)</rp></ruby>を<ruby>捉<rp>(</rp><rt>とら</rt><rp>)</rp></ruby>えて<ruby>輝<rp>(</rp><rt>かがや</rt><rp>)</rp></ruby>いたのは"},{"id":"31","startTime":"00:03:32,934","startSeconds":212.934,"endTime":"00:03:37,614","endSeconds":217.614,"text":"まるで<ruby>流<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>れ<ruby>星<rp>(</rp><rt>ぼし</rt><rp>)</rp></ruby>のような<ruby>涙<rp>(</rp><rt>なみだ</rt><rp>)</rp></ruby>"},{"id":"32","startTime":"00:03:37,614","startSeconds":217.614,"endTime":"00:03:42,939","endSeconds":222.939,"text":"<ruby>不器用<rp>(</rp><rt>ぶきよう</rt><rp>)</rp></ruby>な<ruby>命<rp>(</rp><rt>いのち</rt><rp>)</rp></ruby>から<ruby>流<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>れて<ruby>零<rp>(</rp><rt>こぼ</rt><rp>)</rp></ruby>れ<ruby>落<rp>(</rp><rt>お</rt><rp>)</rp></ruby>ちた"},{"id":"33","startTime":"00:03:42,939","startSeconds":222.939,"endTime":"00:03:47,518","endSeconds":227.518,"text":"<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しい<ruby>涙<rp>(</rp><rt>なみだ</rt><rp>)</rp></ruby>"},{"id":"34","startTime":"00:03:50,147","startSeconds":230.147,"endTime":"00:03:56,814","endSeconds":236.814,"text":"<ruby>強<rp>(</rp><rt>つよ</rt><rp>)</rp></ruby>く<ruby>大<rp>(</rp><rt>おお</rt><rp>)</rp></ruby>きな<ruby>体<rp>(</rp><rt>からだ</rt><rp>)</rp></ruby>に<ruby>秘<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>めた<ruby>優<rp>(</rp><rt>やさ</rt><rp>)</rp></ruby>しさも"},{"id":"35","startTime":"00:03:56,814","startSeconds":236.814,"endTime":"00:04:01,575","endSeconds":241.575,"text":"どこか<ruby>苦<rp>(</rp><rt>くる</rt><rp>)</rp></ruby>しげなその<ruby>顔<rp>(</rp><rt>かお</rt><rp>)</rp></ruby>も"},{"id":"36","startTime":"00:04:01,575","startSeconds":241.575,"endTime":"00:04:04,085","endSeconds":244.085,"text":"<ruby>愛<rp>(</rp><rt>いと</rt><rp>)</rp></ruby>しく<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>うんだ"},{"id":"37","startTime":"00:04:04,085","startSeconds":244.085,"endTime":"00:04:06,881","endSeconds":246.881,"text":"<ruby>姿形<rp>(</rp><rt>すがたがた</rt><rp>)</rp></ruby>じゃないんだ"},{"id":"38","startTime":"00:04:06,881","startSeconds":246.881,"endTime":"00:04:11,502","endSeconds":251.502,"text":"やっと<ruby>気付<rp>(</rp><rt>きづ</rt><rp>)</rp></ruby>いたんだ"},{"id":"39","startTime":"00:04:11,502","startSeconds":251.502,"endTime":"00:04:18,048","endSeconds":258.048,"text":"<ruby>無情<rp>(</rp><rt>むじょう</rt><rp>)</rp></ruby>に<ruby>響<rp>(</rp><rt>ひび</rt><rp>)</rp></ruby>く<ruby>銃声<rp>(</rp><rt>じゅうせい</rt><rp>)</rp></ruby>が<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby>を<ruby>引<rp>(</rp><rt>ひ</rt><rp>)</rp></ruby>き<ruby>裂<rp>(</rp><rt>さ</rt><rp>)</rp></ruby>く"},{"id":"40","startTime":"00:04:18,048","startSeconds":258.048,"endTime":"00:04:22,740","endSeconds":262.74,"text":"<ruby>別<rp>(</rp><rt>わか</rt><rp>)</rp></ruby>れの<ruby>息吹<rp>(</rp><rt>いぶき</rt><rp>)</rp></ruby>が<ruby>襲<rp>(</rp><rt>おそ</rt><rp>)</rp></ruby>いかかる"},{"id":"41","startTime":"00:04:22,740","startSeconds":262.74,"endTime":"00:04:28,076","endSeconds":268.076,"text":"<ruby>刹那<rp>(</rp><rt>せつな</rt><rp>)</rp></ruby>に<ruby>輝<rp>(</rp><rt>かがや</rt><rp>)</rp></ruby>いた<ruby>無慈悲<rp>(</rp><rt>むじひ</rt><rp>)</rp></ruby>な<ruby>流<rp>(</rp><rt>なが</rt><rp>)</rp></ruby>れ<ruby>星<rp>(</rp><rt>ぼし</rt><rp>)</rp></ruby>"},{"id":"42","startTime":"00:04:28,076","startSeconds":268.076,"endTime":"00:04:33,560","endSeconds":273.56,"text":"<ruby>祈<rp>(</rp><rt>いの</rt><rp>)</rp></ruby>りはただ<ruby>届<rp>(</rp><rt>とど</rt><rp>)</rp></ruby>かずに<ruby>消<rp>(</rp><rt>き</rt><rp>)</rp></ruby>えた"},{"id":"43","startTime":"00:04:33,560","startSeconds":273.56,"endTime":"00:04:37,928","endSeconds":277.928,"text":"この、<ruby>手<rp>(</rp><rt>て</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で<ruby>燃<rp>(</rp><rt>も</rt><rp>)</rp></ruby>え<ruby>尽<rp>(</rp><rt>つ</rt><rp>)</rp></ruby>きた"},{"id":"44","startTime":"00:04:37,928","startSeconds":277.928,"endTime":"00:04:45,228","endSeconds":285.228,"text":"<ruby>金色<rp>(</rp><rt>きんいろ</rt><rp>)</rp></ruby>の<ruby>優<rp>(</rp><rt>やさ</rt><rp>)</rp></ruby>しい<ruby>彗星<rp>(</rp><rt>すいせい</rt><rp>)</rp></ruby>を"},{"id":"45","startTime":"00:04:45,228","startSeconds":285.228,"endTime":"00:04:48,587","endSeconds":288.587,"text":"<ruby>美<rp>(</rp><rt>うつく</rt><rp>)</rp></ruby>しいたてがみを"},{"id":"46","startTime":"00:04:48,587","startSeconds":288.587,"endTime":"00:04:53,633","endSeconds":293.633,"text":"<ruby>暗闇<rp>(</rp><rt>くらやみ</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby><ruby>握<rp>(</rp><rt>にぎ</rt><rp>)</rp></ruby>り<ruby>締<rp>(</rp><rt>し</rt><rp>)</rp></ruby>めた"},{"id":"47","startTime":"00:05:00,911","startSeconds":300.911,"endTime":"00:05:02,362","endSeconds":302.362,"text":"ありがとうございました。"}]'

interface LyricsDisplayProps {
  romajiVisibility: boolean
  translationVisibility: boolean
  playerRef: React.MutableRefObject<BaseReactPlayer<ReactPlayer> | null>
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
}) => {
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

    fetchSrt()
  }, [])

  const findCurrentIndex = useCallback(
    (currentTime: number) => {
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
      className='player-lyrics-overlay unselectable pointer-events-none absolute left-0 top-0 z-30 w-full'
      style={{ height: getOverlayHeight }}>
      <div className='flex h-full w-full flex-col justify-end text-center md:justify-end'>
        {/* //! Translation Toggle-able */}
        <LyricTextLine
          htmlContent={lyricsArrEng ? currentEngLyric : ''}
          className='!font_noto_sans_reg mb-0 !text-2.4vw '
        />

        {/* //! Main Lyrics */}
        <LyricTextLine
          className='!font-outline-4 !text-3.5vw'
          htmlContent={lyricsArr ? currentJpLyric : ''}
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
