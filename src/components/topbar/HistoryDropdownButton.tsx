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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
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
  MoreHorizontal,
} from 'lucide-react'
import React, { useState } from 'react'
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

  const clearHistory = () => {
    setHistoryItems([])
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(historyItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = historyItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  )

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const renderPaginationItems = () => {
    const items = []
    const VISIBLE_PAGES = 5 // Changed to 5 to match the desired layout

    // Helper function to add number buttons
    const addPageButton = (pageNum: number) => {
      items.push(
        <PaginationItem
          key={pageNum}
          className='unhighlightable cursor-pointer'>
          <PaginationLink
            onClick={() => handlePageChange(pageNum)}
            isActive={currentPage === pageNum}
            className={`h-8 w-8 ${currentPage === pageNum && 'bg-primary'}`}>
            {pageNum}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // If total pages is less than or equal to VISIBLE_PAGES, show all pages
    if (totalPages <= VISIBLE_PAGES) {
      // Calculate padding for proper centering
      const leftPadding = Math.floor((VISIBLE_PAGES - totalPages) / 2)
      const rightPadding = VISIBLE_PAGES - totalPages - leftPadding

      // Add left padding
      for (let i = 0; i < leftPadding; i++) {
        items.push(
          <PaginationItem key={`left-padding-${i}`} className='invisible'>
            <span className='flex h-8 w-8 items-center justify-center'>0</span>
          </PaginationItem>,
        )
      }

      // Add page buttons
      for (let i = 1; i <= totalPages; i++) {
        addPageButton(i)
      }

      // Add right padding
      for (let i = 0; i < rightPadding; i++) {
        items.push(
          <PaginationItem key={`right-padding-${i}`} className='invisible'>
            <span className='flex h-8 w-8 items-center justify-center'>0</span>
          </PaginationItem>,
        )
      }
    }
    // If we're in the last 5 pages, show the last 5 pages
    else if (currentPage > totalPages - VISIBLE_PAGES) {
      for (let i = totalPages - VISIBLE_PAGES + 1; i <= totalPages; i++) {
        addPageButton(i)
      }
    }
    // Otherwise, show current page and next 4 pages
    else {
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
      <DropdownMenu>
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
          <div className='flex flex-col'>
            {/* Fixed Header */}
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

            {/* Scrollable Content */}
            <div className='max-h-[475px] overflow-y-auto px-2'>
              {historyItems.length > 0 ? (
                <div className='space-y-1'>
                  {paginatedItems.map((item) => (
                    <HistoryDropdownItem key={item.videoId} {...item} />
                  ))}
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center py-2 text-center'>
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
            {showPagination && (
              <div className='sticky bottom-0 bg-background/95 p-2'>
                <DropdownMenuSeparator className='my-2' />
                <Pagination>
                  <PaginationContent className='flex justify-center'>
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
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1),
                          )
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
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

export default HistoryDropdownButton
