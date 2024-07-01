import { cn } from '@/utils/cn'
import DOMPurify from 'dompurify'

interface LyricsTextLineProps {
  htmlContent: string
  className?: string
}

const LyricTextLine: React.FC<LyricsTextLineProps> = ({
  htmlContent,
  className,
}) => {
  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) }
  }
  return (
    <div>
      <p
        className={cn(
          'font-outline-1 font_noto_sans_jp_black_900',
          className,
          'text-2vw',
        )}
        dangerouslySetInnerHTML={createMarkup(htmlContent)}
      />
    </div>
  )
}

export default LyricTextLine
