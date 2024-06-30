import { cn } from '@/utils/cn'
import DOMPurify from 'dompurify'

interface LyricsTextLineProps {
  htmlContent: string
  romajiContent?: string
  className?: string
}

const LyricTextLine: React.FC<LyricsTextLineProps> = ({
  htmlContent,
  romajiContent,
  className,
}) => {
  const createMarkup = (html: string) => {
    return { __html: DOMPurify.sanitize(html) }
  }
  return (
    <div className='text-center'>
      {romajiContent && (
        <p className='font_noto_sans_jp_black_900 font-outline-1 text-2.4vw'>
          {romajiContent}
        </p>
      )}
      <p
        className={cn(
          'font-outline-1 font_noto_sans_jp_black_900 text-4.2vw',
          className,
        )}
        dangerouslySetInnerHTML={createMarkup(htmlContent)}
      />
    </div>
  )
}
export default LyricTextLine
