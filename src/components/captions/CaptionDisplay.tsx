import CaptionFileDrop from '@/components/captions/CaptionFileDrop'

import { isKanji } from 'wanakana'

const CaptionDisplay = () => {
  const containerStyleFirst: React.CSSProperties = {
    width: '80vw', // 80% of the viewport width
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
  }

  const containerStyleSecond: React.CSSProperties = {
    width: '90vw', // 80% of the viewport width
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'end',
  }

  const paragraphStyle: React.CSSProperties = {
    fontSize: '4.2vw', // Adjust the font size based on the viewport width
  }

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
    <div className='flex flex-col justify-between w-full border-red border-2 my-20'>
      <div className='flex mt-2 align-text-bottom'>
        <p className='font_noto_sans_jp_black_900 text-xl font-outline'>
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

      <CaptionFileDrop mediaUrl='' />

      <div className='max-w-full max-h-85 rounded-lg border'>
        <div className='flex flex-col justify-end m-4'>
          <div style={containerStyleFirst}>
            <p
              style={paragraphStyle}
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
            </p>
          </div>
        </div>
        <div className='flex justify-end m-4'>
          <div style={containerStyleSecond}>
            <p
              style={paragraphStyle}
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
    </div>
  )
}
export default CaptionDisplay
