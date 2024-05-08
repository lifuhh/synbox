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
        'grid grid-cols-1 py-4 sm:grid-cols-2  lg:grid-cols-3',
        className,
      )}>
      {items.map((item, idx) => (
        //TODO: Style individual infinite scroll gallery cards here
        <div
          key={item?.videoId}
          className='group relative block h-full w-full cursor-pointer p-2'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={handleGalleryItemClick(item.videoId)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 block h-full w-full rounded-3xl bg-primary-500 dark:bg-dark-2/[0.8]'
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
              className=' h-52 w-full rounded-xl object-cover group-hover/card:shadow-xl'
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
        'playlist-item relative z-20 h-72 w-full overflow-hidden rounded-2xl border border-transparent bg-dark-4 p-2 group-hover:border-slate-700 dark:border-white/[0.2]',
        className,
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
        'marquee mb-4 font-bold tracking-wide text-zinc-100',
        className,
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
        'mt-8 text-sm leading-relaxed tracking-wide text-zinc-400',
        className,
      )}>
      {children}
    </p>
  )
}
