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
  isEnglish?: boolean // Add this prop to explicitly control styling
}

const LyricTextLine = ({
  htmlContent,
  className = '',
  divStyle,
  kanjiSpacing = '0.2em',
  lang,
  useBlur = false,
  isEnglish = false,
}: LyricsTextLineProps) => {
  const sanitizedHtmlContent = useMemo(() => {
    return { __html: DOMPurify.sanitize(htmlContent) }
  }, [htmlContent])

  // Filter out font-outline classes from the passed className to avoid conflicts
  const filteredClassName = useMemo(() => {
    if (!className) return ''
    return className
      .split(' ')
      .filter((cls) => !cls.startsWith('font-outline'))
      .join(' ')
  }, [className])

  const pStyle: React.CSSProperties = {
    ...(!isEnglish && lang === 'ja' ? { '--kanji-spacing': kanjiSpacing } : {}),
    // Force font family and weight for English text
    ...(isEnglish
      ? {
          fontFamily: "'Noto Sans', sans-serif !important",
          fontWeight: 'normal',
        }
      : {}),
    textShadow: '0 0 10px hsl(336 78% 44.5%)',
  } as React.CSSProperties

  return (
    <div
      style={divStyle}
      className={cn(
        { 'lyric-text-line-wrapper': useBlur },
        // Only apply non-font classes to the wrapper
        filteredClassName
          .split(' ')
          .filter(
            (cls) =>
              cls.startsWith('mb-') ||
              cls.startsWith('mt-') ||
              cls.startsWith('m-'),
          )
          .join(' '),
      )}>
      <p
        className={cn(
          'lyric-text-line',
          // Conditionally apply font based on isEnglish prop
          isEnglish ? 'font_noto_sans_reg' : 'font_noto_sans_jp_black_900',
          // Use font-outline-4 for English to match translation styling, font-outline-1 for Japanese
          isEnglish ? 'font-outline-4' : 'font-outline-1',
          'text-2vw',
          'text-balance align-middle leading-normal',
          // Apply the remaining filtered classes (text size, etc.)
          filteredClassName
            .split(' ')
            .filter(
              (cls) =>
                cls.startsWith('!text-') ||
                cls.startsWith('text-') ||
                cls.includes('balance') ||
                cls.includes('middle') ||
                cls.includes('leading'),
            )
            .join(' '),
        )}
        style={pStyle}
        dangerouslySetInnerHTML={sanitizedHtmlContent}
      />
    </div>
  )
}

export const MemoizedLyricTextLine = React.memo(LyricTextLine)
