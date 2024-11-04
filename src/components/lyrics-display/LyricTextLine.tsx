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

  const pStyle: React.CSSProperties = {
    ...(lang === 'ja' ? { '--kanji-spacing': kanjiSpacing } : {}),
    // Explicitly set text shadow as a fallback
    textShadow: '0 0 10px hsl(336 78% 44.5%)',
  } as React.CSSProperties

  return (
    <div
      style={divStyle}
      className={cn(
        { 'lyric-text-line-wrapper': useBlur },
        className, // Move user's className here
      )}>
      <p
        className={cn(
          'lyric-text-line',
          'font_noto_sans_jp_black_900',
          'font-outline-1',
          'text-2vw',
          'text-balance align-middle leading-normal',
          // Move className to the end to allow overrides
          className,
        )}
        style={pStyle}
        dangerouslySetInnerHTML={sanitizedHtmlContent}
      />
    </div>
  )
}

export const MemoizedLyricTextLine = React.memo(LyricTextLine)
