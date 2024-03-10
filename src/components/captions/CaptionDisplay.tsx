import CaptionFileDrop from '@/components/captions/CaptionFileDrop'

import { isKanji } from 'wanakana'

interface CaptionDisplayProps {
  romajiEnabled: boolean
}

const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ romajiEnabled }) => {
  // 知りたいその秘密ミステリアス

  const lyrics1 = '知りたいその秘密ミステリアス'
  const lyrics2 = '天才的なアイドル様'
  const lyrics3 = '今日何食べた？'
  const lyrics4 = 'あれもないないない'

  const kanjiSeparator = (lyrics: string) => {
    let charBuffer = ''
    let kanjiBuffer = ''
    const lyricsBlock = []

    for (const char of lyrics) {
      const charIsKanji = isKanji(char)

      if (charIsKanji) {
        if (charBuffer !== '') {
          lyricsBlock.push(charBuffer)
          charBuffer = ''
        }
        kanjiBuffer += char
      } else {
        if (kanjiBuffer !== '') {
          lyricsBlock.push(kanjiBuffer)
          kanjiBuffer = ''
        }
        charBuffer += char
      }
    }

    if (charBuffer !== '') {
      lyricsBlock.push(charBuffer)
    }
    if (kanjiBuffer !== '') {
      lyricsBlock.push(kanjiBuffer)
    }

    return lyricsBlock
  }
  const lyricsList = [
    kanjiSeparator(lyrics1),
    kanjiSeparator(lyrics2),
    kanjiSeparator(lyrics3),
    kanjiSeparator(lyrics4),
  ]

  console.log(lyricsList)

  return (
    <div
      className='absolute left-0 top-0 w-full h-9/10 pt-4 pointer-events-none z-10'
      style={{ zIndex: 1000 }}>
      <div className='flex flex-col justify-end md:justify-between w-full h-full my-7'>
        {/* Translation Div */}
        <div className='md:pt-4 pb-20 md:pb-0 w-full'>
          <p
            style={engTranslationStyle}
            className='flex font_noto_sans_jp_black_900 justify-center font-outline-1'>
            {/* Couldn't beat her smile, it stirred up all the media */}
            Testing Testing Testing Testing Testing
          </p>
        </div>

        {/* Lyrics Div */}
        <div className='w-full md:flex-1 flex flex-col justify-end pb-20 sm:pb-3'>
          <div className='mx-4'>
            <div style={containerStyleFirst}>
              <p
                style={lyricsStyle}
                className='font-outline-1 font_noto_sans_jp_black_900'>
                <ruby>
                  無敵<rp>(</rp>
                  <rt>むてき</rt>
                  <rp>)</rp>
                </ruby>
                の
                <ruby>
                  笑顔<rp>(</rp>
                  <rt>えがお</rt>
                  <rp>)</rp>
                </ruby>
                で
                <ruby>
                  荒<rp>(</rp>
                  <rt>あ</rt>
                  <rp>)</rp>
                </ruby>
                らすメディア
                {/* サンプル{' '}
                <ruby>
                  試料<rp>(</rp>
                  <rt>しりょう</rt>
                  <rp>)</rp>
                </ruby>{' '}
                サンプル */}
              </p>
            </div>
          </div>
          <div className='flex justify-end mx-4'>
            <div style={containerStyleSecond}>
              <p
                style={lyricsStyle}
                className='font-outline-1 font_noto_sans_jp_black_900'>
                <ruby>
                  知<rp>(</rp>
                  <rt>し</rt>
                  <rp>)</rp>
                </ruby>
                りたいその
                <ruby>
                  秘密
                  <rp>(</rp>
                  <rt>ひみつ</rt>
                  <rp>)</rp>
                </ruby>
                ミステリアス
                <ruby>
                  今日何食
                  <rp>(</rp>
                  <rt>きょうなにた</rt>
                  <rp>)</rp>
                </ruby>
                べた？
              </p>
            </div>
          </div>
        </div>
        {romajiEnabled && (
          <div className='pb-8 sm:pb-4'>
            <p
              style={romajiStyle}
              className='flex font_noto_sans_jp_black_900 justify-center font-outline-1 text-2.4vw'>
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
  width: '80vw', // 80% of the viewport width
  display: 'flex',
  justifyContent: 'start',
}

const containerStyleSecond: React.CSSProperties = {
  width: '90vw', // 80% of the viewport width
  display: 'flex',
  justifyContent: 'end',
}

const lyricsStyle: React.CSSProperties = {
  fontSize: '4.2vw', // Adjust the font size based on the viewport width
}

const engTranslationStyle: React.CSSProperties = {
  fontSize: '2vw', // Adjust the font size based on the viewport width
}

const romajiStyle: React.CSSProperties = {
  fontSize: '2.4vw', // Adjust the font size based on the viewport width
}

export default CaptionDisplay
