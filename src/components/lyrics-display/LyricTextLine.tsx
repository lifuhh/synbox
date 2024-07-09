import { cn } from '@/utils/cn'
import DOMPurify from 'dompurify'

interface LyricsTextLineProps {
  htmlContent: string
  className?: string
  divStyle?: React.CSSProperties
  kanjiSpacing?: string
  lang?: string
}

const LyricTextLine: React.FC<LyricsTextLineProps> = ({
  htmlContent,
  className,
  divStyle,
  kanjiSpacing = '0.2em',
  lang,
}) => {
  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) }
  }

  const pStyle: React.CSSProperties =
    lang === 'ja'
      ? ({ '--kanji-spacing': kanjiSpacing } as React.CSSProperties)
      : {}

  return (
    <div style={divStyle}>
      <p
        className={cn(
          'lyric-text-line font-outline-1 font_noto_sans_jp_black_900 align-middle leading-normal',
          className,
          'text-2vw',
        )}
        style={pStyle}
        dangerouslySetInnerHTML={createMarkup(htmlContent)}
      />
    </div>
  )
}

export default LyricTextLine
