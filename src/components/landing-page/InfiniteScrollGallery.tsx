import { useOverflow } from '@/hooks/useOverflow'
import { InfiniteScrollGalleryProps } from '@/types'
import { delayApiResponse } from '@/utils'
import { cn } from '@/utils/cn'
import { Divider, Loader } from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const InfiniteScrollGallery = ({
  items,
  className,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollGalleryProps) => {
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
    <div ref={containerRef} className={cn('overflow-auto px-4', className)}>
      <div className='flex flex-wrap py-2 pt-4'>
        {items.map((item, idx) => (
          <div
            key={item?.videoId}
            className='w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4'
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={handleGalleryItemClick(item?.videoId)}>
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className='absolute inset-0 block h-full w-full rounded-xl bg-primary-500 dark:bg-dark-2/[0.8]'
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
            <Card className='cursor-pointer'>
              <CardTitle className=' mb-4  text-lg'>{item.title}</CardTitle>
              <div className='relative overflow-hidden rounded-xl pb-[56.25%]'>
                <div
                  className='absolute inset-0 bg-cover bg-center'
                  style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div ref={observerTarget} className='h-0' />
      {isFetchingNextPage && (
        <div className='my-0 flex w-full min-w-full items-center justify-center'>
          <Loader color='pink' size='xl' type='dots' />
        </div>
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
        'playlist-item relative z-20 w-full overflow-hidden rounded-xl border border-transparent bg-dark-4 p-4 transition-all hover:border-slate-700 dark:border-white/[0.2]',
        className,
      )}>
      {children}
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
          'marquee unhighlightable font-bold tracking-wide text-zinc-100',
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
