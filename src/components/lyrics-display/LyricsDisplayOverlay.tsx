import { useEffect, useMemo, useState } from 'react'

import { formatLyricsLineSrt } from '@/utils'
import { isKanji, toRomaji } from 'wanakana'
import LyricTextLine from './LyricTextLine'

interface LyricsDisplayProps {
  romajiEnabled: boolean
}

//! Lyrics Display overlay is z-40
const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ romajiEnabled }) => {
  // 知りたいその秘密ミステリアス
  const [firstLineIndex, setFirstLineIndex] = useState<number>(0)
  const [secondLineIndex, setSecondLineIndex] = useState<number>(1)

  const placeholderLyric1 =
    '<ruby>無敵<rp>(</rp><rt>むてき</rt><rp>)</rp></ruby>の<ruby>笑顔<rp>(</rp><rt>えがお</rt><rp>)</rp></ruby>で<ruby>荒<rp>(</rp><rt>あ</rt><rp>)</rp></ruby>らすメディア . . . . . ♪'
  const placeholderLyric2 =
    '<ruby>知<rp>(</rp><rt>し</rt><rp>)</rp></ruby>りたいその<ruby>秘密<rp>(</rp><rt>ひみつ</rt><rp>)</rp></ruby>ミステリアス<ruby>今日何食<rp>(</rp><rt>きょうなにた</rt><rp>)</rp></ruby>べた？'

  return (
    <div
      className={`absolute left-0 top-0 w-full h-9/10 pt-4 pointer-events-none z-40`}>
      <div className='flex flex-col justify-end md:justify-between w-full h-full my-7'>
        {/* Translation Div */}
        <div className='md:pt-4 md:pb-0 w-full'>
          <p className='flex font_noto_sans_jp_black_900 justify-center font-outline-1 text-2vw'>
            {/* Couldn't beat her smile, it stirred up all the media */}
            Testing Testing Testing Testing Testing
          </p>
        </div>

        {/* Lyrics Div */}
        <div className='w-full md:flex-1 flex flex-col justify-end py-4 md:pb-3'>
          <div className='lg:mx-4 pl-2 sm:pl-4'>
            <div style={containerStyleFirst}>
              <LyricTextLine htmlContent={placeholderLyric1} />
            </div>
          </div>
          <div className='flex justify-end lg:mx-4 sm:pr-2'>
            <div style={containerStyleSecond}>
              <LyricTextLine htmlContent={placeholderLyric2} />
            </div>
          </div>
        </div>
        {romajiEnabled && (
          <div className='pb-8 sm:pb-4'>
            <p className='flex font_noto_sans_jp_black_900 justify-center font-outline-1 text-2.4vw'>
              {/* Couldn't beat her smile, it stirred up all the media */}
              Testing Testing Testing Testing Testing
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const containerStyleFirst: React.CSSProperties = {
  width: '90vw', // 90% of the viewport width
  display: 'flex',
  justifyContent: 'start',
}

const containerStyleSecond: React.CSSProperties = {
  width: '90vw', // 90% of the viewport width
  display: 'flex',
  justifyContent: 'end',
}

export default LyricsDisplay
