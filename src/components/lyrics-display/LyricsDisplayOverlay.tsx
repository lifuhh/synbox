import { useAppContext } from '@/context/AppContext'
import { formatLyricsLineSrt } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import { isKanji, toRomaji } from 'wanakana'
import LyricTextLine from './LyricTextLine'

interface LyricsDisplayProps {
  romajiVisibility: boolean
  translationVisibility: boolean
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  romajiVisibility: romajiVisibility,
  translationVisibility: translationVisibility,
}) => {
  const { playerControlsVisible, bottomBarHeight } = useAppContext()

  // 知りたいその秘密ミステリアス
  // const [firstLineIndex, setFirstLineIndex] = useState<number>(0)
  // const [secondLineIndex, setSecondLineIndex] = useState<number>(1)

  const translationTest = ''
  const lyricsTest =
    '<ruby>無敵<rp>(</rp><rt>むてき</rt><rp>)</rp></ruby>の<ruby>笑顔<rp>(</rp><rt>えがお</rt><rp>)</rp></ruby>で<ruby>荒<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>らすメディア'
  const romajiTest = ''

  const placeholderLyric1 =
    '<ruby>無敵<rp>(</rp><rt>むてき</rt><rp>)</rp></ruby>の<ruby>笑顔<rp>(</rp><rt>えがお</rt><rp>)</rp></ruby>で<ruby>荒<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>らすメディア . . . . . ♪'
  const placeholderLyric2 =
    '<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>りたいその<ruby>秘密<rp>(</rp><rt>ひみつ</rt><rp>)</rp></ruby>ミステリアス<ruby>今日何食<rp>(</rp><rt>きょうなにた</rt><rp>)</rp></ruby>べた？'

  const getOverlayHeight = useMemo(() => {
    return playerControlsVisible ? `calc(100% - ${bottomBarHeight}px)` : '100%'
  }, [playerControlsVisible, bottomBarHeight])

  return (
    <div
      className='player-lyrics-overlay unselectable pointer-events-none absolute left-0 top-0 z-30 w-full'
      style={{ height: getOverlayHeight }}>
      <div className='flex h-full w-full flex-col justify-end md:justify-between'>
        {/* OLD Translation Div */}
        {/* <div className='w-full md:pb-0 md:pt-4'>
          <p className='font_noto_sans_jp_black_900 font-outline-1 flex justify-center text-2vw'>
            Testing Testing Translations Here Testing Testing
          </p>
        </div> */}

        {/* Lyrics Div */}
        <div className='flex w-full flex-col justify-end md:flex-1'>
          {/* //? Div Container for all lyrics display */}
          <div className='overlay-lyrics-text pb-2'>
            {/* //! Romaji Layer */}
            {romajiVisibility && (
              <div className=' pb-2'>
                <p className='font_noto_sans_jp_black_900 font-outline-1 flex justify-center text-2.4vw'>
                  {/* Couldn't beat her smile, it stirred up all the media */}
                  Testing Testing Testing Testing Testing
                </p>
              </div>
            )}
            {/* //! Japanese Layer */}
            <div className='mx-auto flex w-full justify-center '>
              <LyricTextLine htmlContent={lyricsTest} />
            </div>

            {/* //! Translation Layer */}
            {translationVisibility && (
              <div className=''>
                <p className='font_noto_sans_jp_black_900 font-outline-1 flex justify-center text-2.4vw'>
                  {/* Couldn't beat her smile, it stirred up all the media */}
                  Testing Testing Testing Testing Testing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LyricsDisplay
