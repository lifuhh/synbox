import { cn } from '@/utils/cn'
import DOMPurify from 'dompurify'
import React, { useMemo } from 'react'

interface LyricsTextLineProps {
  htmlContent: string
  className?: string
  divStyle?: React.CSSProperties
  kanjiSpacing?: string
  lang?: string
  useBlur?: boolean
}

const LyricTextLine = ({
  htmlContent,
  className,
  divStyle,
  kanjiSpacing = '0.2em',
  lang,
  useBlur = false,
}: LyricsTextLineProps) => {
  const sanitizedHtmlContent = useMemo(() => {
    return { __html: DOMPurify.sanitize(htmlContent) }
  }, [htmlContent])

  const pStyle: React.CSSProperties =
    lang === 'ja'
      ? ({ '--kanji-spacing': kanjiSpacing } as React.CSSProperties)
      : {}

  return (
    <div
      style={divStyle}
      className={cn(
        className,
        { 'lyric-text-line-wrapper': useBlur }, // Conditionally apply the wrapper class
      )}>
      <p
        className={cn(
          'lyric-text-line font-outline-1 font_noto_sans_jp_black_900 text-balance align-middle leading-normal',
          className,
          'text-2vw',
        )}
        style={pStyle}
        dangerouslySetInnerHTML={sanitizedHtmlContent}
      />
    </div>
  )
}

export const MemoizedLyricTextLine = React.memo(LyricTextLine)
