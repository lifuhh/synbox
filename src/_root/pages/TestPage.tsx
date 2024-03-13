import { parseSrt } from '@/utils'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

const TestPage = () => {
  const str1 =
    '<ruby>今静<rp>(</rp><rt>ましず</rt><rp>)</rp></ruby>かな<ruby>夜<rp>(</rp><rt>よる</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で'
  const str2 =
    '<ruby>無計画<rp>(</rp><rt>うけいかく</rt><rp>)</rp></ruby>に<ruby>車<rp>(</rp><rt>くるま</rt><rp>)</rp></ruby>を<ruby>走<rp>(</rp><rt>はし</rt><rp>)</rp></ruby>らせた'
  const str3 =
    'ただ<ruby>思<rp>(</rp><rt>おも</rt><rp>)</rp></ruby>い<ruby>出<rp>(</rp><rt>で</rt><rp>)</rp></ruby>を<ruby>探<rp>(</rp><rt>さぐ</rt><rp>)</rp></ruby>る<ruby>様<rp>(</rp><rt>よう</rt><rp>)</rp></ruby>に'
  const str4 =
    'ある<ruby>日突然現<rp>(</rp><rt>ひとつぜならわ</rt><rp>)</rp></ruby>れたその<ruby>眼差<rp>(</rp><rt>まなざ</rt><rp>)</rp></ruby>しが'
  const str5 =
    '<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>い<ruby>深<rp>(</rp><rt>ふか</rt><rp>)</rp></ruby>い<ruby>暗闇<rp>(</rp><rt>くらやみ</rt><rp>)</rp></ruby>の<ruby>中<rp>(</rp><rt>なか</rt><rp>)</rp></ruby>で'

  const strList = useMemo(() => [str1, str2, str3, str4, str5], [])

  const [extractedTexts, setExtractedTexts] = useState<
    { [key: string]: string }[]
  >([])

  useEffect(() => {
    const pattern =
      /<ruby>(.*?)<rp>\(<\/rp><rt>(.*?)<\/rt><rp>\)<\/rp><\/ruby>/g

    const matches = []
    let match
    for (const inputString of strList) {
      while ((match = pattern.exec(inputString)) !== null) {
        // match[1] will contain the kanji part, match[2] will contain the hiragana part
        matches.push({ kanji: match[1], hiragana: match[2] })
      }
    }
    setExtractedTexts(matches)
  }, [strList])

  return (
    <div className='absolute top-1/6 left-0 w-full h-full z-40'>
      <div>
        <h2>Extracted Texts:</h2>
        <ul>
          {extractedTexts.map((text, index) => (
            <li key={index}>
              {index + 1}. Kanji: {text.kanji}, Hiragana: {text.hiragana}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default TestPage
