import { useOverflow } from '@/hooks/useOverflow'
import { InfiniteScrollGalleryProps } from '@/types'
import { cn } from '@/utils/cn'
import { Loader } from '@mantine/core'
import { AnimatePresence, motion } from 'framer-motion'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

// Get responsive columns based on screen width (same as original)
const useResponsiveColumns = () => {
  const [columns, setColumns] = useState(4)

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 640)
        setColumns(1) // sm: w-full
      else if (width < 1024)
        setColumns(2) // lg: w-1/2
      else if (width < 1280)
        setColumns(3) // xl: w-1/3
      else setColumns(4) // 2xl: w-1/4
    }

    updateColumns()
    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return columns
}

// Virtual Grid Hook - maintains original flexbox layout
const useVirtualGrid = ({
  items,
  containerHeight,
  estimatedRowHeight = 350, // Estimated height per row
  columnsPerRow,
  overscan = 2,
}: {
  items: any[]
  containerHeight: number
  estimatedRowHeight?: number
  columnsPerRow: number
  overscan?: number
}) => {
  const [scrollTop, setScrollTop] = useState(0)

  const totalRows = Math.ceil(items.length / columnsPerRow)

  // Calculate visible range based on rows
  const visibleRange = useMemo(() => {
    const startRow = Math.max(
      0,
      Math.floor(scrollTop / estimatedRowHeight) - overscan,
    )
    const endRow = Math.min(
      startRow + Math.ceil(containerHeight / estimatedRowHeight) + overscan * 2,
      totalRows,
    )

    const startIndex = startRow * columnsPerRow
    const endIndex = Math.min(endRow * columnsPerRow, items.length)

    return { startIndex, endIndex, startRow, endRow }
  }, [
    scrollTop,
    estimatedRowHeight,
    containerHeight,
    totalRows,
    columnsPerRow,
    overscan,
    items.length,
  ])

  const totalHeight = totalRows * estimatedRowHeight

  return {
    visibleRange,
    totalHeight,
    setScrollTop,
    estimatedRowHeight,
  }
}

export const VirtualInfiniteScrollGallery = ({
  items,
  className,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(600)

  const columns = useResponsiveColumns()

  const { visibleRange, totalHeight, setScrollTop, estimatedRowHeight } =
    useVirtualGrid({
      items,
      containerHeight,
      estimatedRowHeight: 350, // Adjust based on your card height
      columnsPerRow: columns,
      overscan: 2,
    })

  // Update container height on mount and resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const handleGalleryItemClick = useCallback(
    (videoId: string) => () => {
      navigate(`/v/${videoId}`, { state: { videoId: videoId } })
    },
    [navigate],
  )

  // Handle scroll for virtual scrolling + infinite scroll
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop
      setScrollTop(scrollTop)

      // Check if we need to fetch more data (infinite scroll)
      const scrollHeight = e.currentTarget.scrollHeight
      const clientHeight = e.currentTarget.clientHeight
      const scrollBottom = scrollTop + clientHeight

      if (
        scrollBottom >= scrollHeight - 300 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    },
    [setScrollTop, hasNextPage, isFetchingNextPage, fetchNextPage],
  )

  // Get visible items
  const visibleItems = items.slice(
    visibleRange.startIndex,
    visibleRange.endIndex,
  )

  // Calculate offset for virtual positioning
  const offsetY = visibleRange.startRow * estimatedRowHeight

  // Calculate total height including loading indicator
  const totalHeightWithLoader = totalHeight + (isFetchingNextPage ? 100 : 0)

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto px-4', className)}
      onScroll={handleScroll}
      style={{ height: '100%' }}>
      {/* Virtual container with total height including loader */}
      <div style={{ height: totalHeightWithLoader, position: 'relative' }}>
        {/* Visible items container - positioned to maintain scroll illusion */}
        <div
          className='flex flex-wrap py-2 pt-4'
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'relative',
          }}>
          {visibleItems.map((item, index) => {
            const actualIndex = visibleRange.startIndex + index
            return (
              <div
                key={`${item?.videoId}-${actualIndex}`}
                className='relative w-full p-3 sm:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4' // Original responsive classes
                onMouseEnter={() => setHoveredIndex(actualIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={handleGalleryItemClick(item?.videoId)}>
                <AnimatePresence>
                  {hoveredIndex === actualIndex && (
                    <motion.span
                      className='absolute inset-0 block h-full w-full rounded-xl bg-primary/10'
                      layoutId={`hoverBackground-${actualIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.08 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.08 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <Card className='cursor-pointer bg-muted'>
                  <CardTitle className='mb-4 text-lg'>{item.title}</CardTitle>
                  <div className='relative overflow-hidden rounded-xl pb-[56.25%]'>
                    <img
                      className='absolute inset-0 h-full w-full object-cover'
                      src={item.thumbnailUrl}
                      alt={item.title}
                      loading='lazy'
                    />
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Loading indicator positioned at the bottom as an additional "row" */}
        {isFetchingNextPage && (
          <div
            className='absolute left-0 right-0 flex items-center justify-center py-8'
            style={{
              top: totalHeight, // Position at the bottom of actual content
              height: '100px', // Fixed height for the loader
            }}>
            <Loader color='white' size='xl' type='dots' />
          </div>
        )}
      </div>
    </div>
  )
}

// Keep existing Card components exactly the same
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
        'playlist-item border-muted-foreground relative z-20 w-full overflow-hidden rounded-xl border bg-card p-4 transition-colors duration-500 hover:border-ring',
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
