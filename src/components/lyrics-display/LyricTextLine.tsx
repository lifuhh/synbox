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
    <p
      className={cn(
        'font-outline-1 font_noto_sans_jp_black_900 sm:pl-2 text-4.2vw',
        className
      )}
      dangerouslySetInnerHTML={createMarkup(htmlContent)}
    />
  )
}
export default LyricTextLine
