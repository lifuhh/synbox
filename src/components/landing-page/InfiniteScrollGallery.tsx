import { useOverflow } from '@/hooks/useOverflow'
import { InfiniteScrollGalleryProps } from '@/types'
import { cn } from '@/utils/cn'
import { Divider } from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const InfiniteScrollGallery: React.FC<InfiniteScrollGalleryProps> = ({
  items,
  className,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate()
  const observerTarget = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleGalleryItemClick = (videoId: string) => () => {
    navigate(`/v/${videoId}`, { state: { videoId: videoId } })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div ref={containerRef} className={cn('overflow-auto', className)}>
      <div className='grid grid-cols-1 py-2 pt-4 sm:grid-cols-2 lg:grid-cols-3'>
        {items.map((item, idx) => (
          <div
            key={item?.videoId}
            className='group relative block h-full w-full cursor-pointer p-2'
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={handleGalleryItemClick(item?.videoId)}>
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
                src={item.thumbnailUrl}
                height='1080'
                width='1920'
                className='h-52 w-full rounded-xl object-cover group-hover/card:shadow-xl'
                alt='thumbnail'
              />
            </Card>
          </div>
        ))}
      </div>
      <div ref={observerTarget} className='h-2' />
      {/* //TODO: prettify transitions of loading & end of gallery */}
      {isFetchingNextPage && (
        <Divider
          my='xs'
          label={
            <p className='pointer-events-none text-center text-lg text-white'>
              Loading...
            </p>
          }
          labelPosition='center'
          className=''
        />
      )}
      {!hasNextPage && (
        <Divider
          my='xs'
          label={
            <p className='pointer-events-none text-center text-xl font-bold text-gray-400'>
              End of Gallery
            </p>
          }
          labelPosition='center'
          className=''
        />
      )}
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

export const CardTitle = memo(
  ({ className, children }: { className?: string; children: string }) => {
    const textRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useOverflow(textRef, containerRef, 'marquee')

    return (
      <div
        ref={containerRef}
        className={cn(
          'marquee mb-4 font-bold tracking-wide text-zinc-100',
          className,
        )}>
        <span ref={textRef} className='whitespace-nowrap'>
          {children}
        </span>
      </div>
    )
  },
)

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
