import { cn } from '@/utils/cn'
import { AnimatePresence, motion } from 'framer-motion'
import { MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const InfiniteScrollGallery = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    vidUrl: string
    videoId: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleGalleryItemClick =
    (videoId: string): MouseEventHandler<HTMLDivElement> =>
    () => {
      navigate(`/v/${videoId}`, { state: { videoId: videoId } })
    }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  py-4',
        className
      )}>
      {items.map((item, idx) => (
        //TODO: Style individual infinite scroll gallery cards here
        <div
          key={item?.videoId}
          className='relative group block p-2 h-full w-full cursor-pointer'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={handleGalleryItemClick(item.videoId)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 h-full w-full bg-primary-500 dark:bg-dark-2/[0.8] block rounded-3xl'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.08 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.08, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>

            <img
              src={item.vidUrl}
              height='1080'
              width='1920'
              className=' h-52 w-full object-cover rounded-xl group-hover/card:shadow-xl'
              alt='thumbnail'
            />
            {/* <CardDescription>{item.description}</CardDescription> */}
            {/* <CardDescription>{item.videoId}</CardDescription> */}
          </Card>
        </div>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl h-72 w-full p-2 overflow-hidden bg-dark-4 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 playlist-item',
        className
      )}>
      <div className='relative z-50'>
        <div className='p-2'>{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'text-zinc-100 font-bold tracking-wide mb-4 marquee',
        className
      )}>
      <span>{children}</span>
    </div>
  )
}
export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p
      className={cn(
        'mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm',
        className
      )}>
      {children}
    </p>
  )
}
