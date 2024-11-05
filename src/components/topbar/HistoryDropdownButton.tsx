import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import HistoryIcon from '@mui/icons-material/History'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import HistoryDropdownItem from './HistoryDropdownItem'

interface HistoryItem {
  videoId: string
  title: string
  author: string
  thumbnailUrl: string
}

interface HistoryDropdownButtonProps {
  buttonVisibility?: boolean
}

const ITEMS_PER_PAGE = 7

// Create custom pagination components to avoid type issues
const PaginationContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <nav className='flex justify-center'>
    <ul className='flex items-center gap-1'>{children}</ul>
  </nav>
)

const PaginationItem: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className = '' }) => <li className={className}>{children}</li>

const PaginationLink: React.FC<{
  onClick: () => void
  isActive?: boolean
  className?: string
  children: React.ReactNode
}> = ({ onClick, isActive, className = '', children }) => (
  <button
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded-md ${
      isActive ? 'text-primary-foreground bg-primary' : ''
    } ${className}`}>
    {children}
  </button>
)

const HistoryDropdownButton: React.FC<HistoryDropdownButtonProps> = ({
  buttonVisibility = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
    {
      videoId: 'VyvhvlYvRnc',
      title: 'YOASOBI「優しい彗星」Official Music Video　(YOASOBI - Comet)',
      author: 'Ayase / YOASOBI',
      thumbnailUrl: 'https://i.ytimg.com/vi/VyvhvlYvRnc/hqdefault.jpg',
    },
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      author: 'Rick Astley',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    },
  ])

  const [isOpen, setIsOpen] = useState(false) // Add this for controlling dropdown state

  useEffect(() => {
    if (historyItems.length === 0) {
      setCurrentPage(1)
    } else {
      // Ensure current page is valid after items change
      const maxPage = Math.ceil(historyItems.length / ITEMS_PER_PAGE)
      if (currentPage > maxPage) {
        setCurrentPage(maxPage)
      }
    }
  }, [historyItems.length, currentPage])

  const clearHistory = () => {
    setHistoryItems([])
    setCurrentPage(1)
    setIsOpen(false)
  }

  const totalPages = Math.ceil(historyItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, historyItems.length)
  const paginatedItems = historyItems.slice(startIndex, endIndex)

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = []
    const VISIBLE_PAGES = 5

    const addPageButton = (pageNum: number) => {
      items.push(
        <PaginationItem
          key={pageNum}
          className='unhighlightable cursor-pointer'>
          <PaginationLink
            onClick={() => handlePageChange(pageNum)}
            isActive={currentPage === pageNum}
            className={`${currentPage === pageNum ? 'bg-primary' : ''}`}>
            {pageNum}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    if (totalPages <= VISIBLE_PAGES) {
      const leftPadding = Math.floor((VISIBLE_PAGES - totalPages) / 2)
      const rightPadding = VISIBLE_PAGES - totalPages - leftPadding

      for (let i = 0; i < leftPadding; i++) {
        items.push(
          <PaginationItem key={`left-padding-${i}`} className='invisible'>
            <span className='flex h-8 w-8 items-center justify-center'>0</span>
          </PaginationItem>,
        )
      }

      for (let i = 1; i <= totalPages; i++) {
        addPageButton(i)
      }

      for (let i = 0; i < rightPadding; i++) {
        items.push(
          <PaginationItem key={`right-padding-${i}`} className='invisible'>
            <span className='flex h-8 w-8 items-center justify-center'>0</span>
          </PaginationItem>,
        )
      }
    } else if (currentPage > totalPages - VISIBLE_PAGES) {
      for (let i = totalPages - VISIBLE_PAGES + 1; i <= totalPages; i++) {
        addPageButton(i)
      }
    } else {
      for (
        let i = currentPage;
        i < currentPage + VISIBLE_PAGES && i <= totalPages;
        i++
      ) {
        addPageButton(i)
      }
    }

    return items
  }

  const showPagination = historyItems.length > ITEMS_PER_PAGE
  return (
    <TooltipProvider>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className={`invisible-ring border-primary hover:border-white ${buttonVisibility}`}>
                <HistoryIcon className='h-6 w-6' />
                <span className='sr-only'>View History</span>
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent className='unhighlightable border-none bg-accent'>
            View History
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent
          align='end'
          sideOffset={10}
          className='w-[400px] max-w-[400px] border border-primary bg-background/95 p-0'>
          <div className='flex h-[535px] flex-col'>
            <div className='sticky top-0 z-10 bg-background/95 p-2'>
              <div className='flex items-center justify-between'>
                <DropdownMenuLabel className='unselectable text-xl'>
                  History
                </DropdownMenuLabel>
                {historyItems.length > 0 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='ghost'
                        className='text-accent-foreground hover:text-foreground text-sm'>
                        Clear History
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear History</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to clear your viewing history?{' '}
                          <br />
                          This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={clearHistory}>
                          Clear History
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
              <DropdownMenuSeparator />
            </div>
            {/* Scrollable Content with minimum height */}
            <div className='max-h-[490px] flex-1 overflow-y-auto px-2'>
              {historyItems.length > 0 ? (
                <div className='space-y-1'>
                  {paginatedItems.map((item) => (
                    <HistoryDropdownItem key={item.videoId} {...item} />
                  ))}
                </div>
              ) : (
                <div className='flex h-full flex-col items-center justify-center py-2 text-center'>
                  <p className='text-muted-foreground text-lg font-medium'>
                    Your history is empty.
                  </p>
                  <p className='text-muted-foreground py-6 text-sm'>
                    Videos you viewed will appear here
                  </p>
                </div>
              )}
            </div>
            {/* Fixed Footer with Enhanced Pagination */}
            {showPagination && historyItems.length > 0 && (
              <div className='sticky bottom-0 bg-background/95 p-2'>
                <DropdownMenuSeparator className='my-2' />
                <PaginationContainer>
                  <PaginationItem>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className='h-8 w-8'>
                      <ChevronsLeft className='h-4 w-4' />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className='h-8 w-8'>
                      <ChevronLeft className='h-4 w-4' />
                    </Button>
                  </PaginationItem>
                  {renderPaginationItems()}
                  <PaginationItem>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className='h-8 w-8'>
                      <ChevronRight className='h-4 w-4' />
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className='h-8 w-8'>
                      <ChevronsRight className='h-4 w-4' />
                    </Button>
                  </PaginationItem>
                </PaginationContainer>
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

export default HistoryDropdownButton