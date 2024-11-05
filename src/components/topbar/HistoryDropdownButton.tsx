import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { historyAtom } from '@/context/atoms'
import HistoryIcon from '@mui/icons-material/History'
import { useAtom } from 'jotai'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import HistoryDropdownItem from './HistoryDropdownItem'

interface HistoryDropdownButtonProps {
  buttonVisibility?: boolean
}

const ITEMS_PER_PAGE = 7
const MAX_HEIGHT = 620 // Maximum height in pixels
const ITEM_HEIGHT = 68 // Approximate height of each history item
const HEADER_HEIGHT = 65 // Height of the header section
const PAGINATION_HEIGHT = 57 // Height of the pagination section
const MIN_HEIGHT = 150 // Minimum height for the dropdown

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
  const [historyItems, setHistoryItems] = useAtom(historyAtom)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  // Calculate dynamic height based on number of items
  const calculateDropdownHeight = () => {
    const contentHeight = Math.min(
      MAX_HEIGHT,
      Math.max(
        MIN_HEIGHT,
        HEADER_HEIGHT +
          paginatedItems.length * ITEM_HEIGHT +
          (showPagination ? PAGINATION_HEIGHT : 0),
      ),
    )
    return contentHeight
  }

  useEffect(() => {
    if (historyItems.length === 0) {
      setCurrentPage(1)
    } else {
      const maxPage = Math.ceil(historyItems.length / ITEMS_PER_PAGE)
      if (currentPage > maxPage) {
        setCurrentPage(maxPage)
      }
    }
  }, [historyItems.length, currentPage])

  const handleClearHistoryClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAlertOpen(true)
  }

  const handleClearHistory = () => {
    setHistoryItems([])
    setCurrentPage(1)
    setIsDropdownOpen(false)
    setIsAlertOpen(false)
  }

  const handleAlertDismiss = () => {
    setIsAlertOpen(false)
    setIsDropdownOpen(true)
  }

  const totalPages = Math.ceil(historyItems.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, historyItems.length)
  const paginatedItems = historyItems.slice(startIndex, endIndex)
  const showPagination = historyItems.length > ITEMS_PER_PAGE

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

  return (
    <TooltipProvider>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
          className='w-[400px] max-w-[400px] border border-primary bg-background/95 p-0'
          style={{ height: `${calculateDropdownHeight()}px` }}>
          <div className='flex h-full flex-col'>
            <div className='sticky top-0 z-10 m-2 bg-background/95'>
              <div className='flex items-center justify-between'>
                <DropdownMenuLabel className='unselectable text-xl'>
                  History
                </DropdownMenuLabel>
                {historyItems.length > 0 && (
                  <Button
                    variant='ghost'
                    onClick={handleClearHistoryClick}
                    className='text-accent-foreground hover:text-foreground text-sm'>
                    Clear History
                  </Button>
                )}
              </div>
              <DropdownMenuSeparator />
            </div>
            <div className='flex-1 overflow-y-auto px-2'>
              {historyItems.length > 0 ? (
                <div className=''>
                  {paginatedItems.map((item) => (
                    <HistoryDropdownItem key={item.videoId} {...item} />
                  ))}
                </div>
              ) : (
                <div className=' flex h-full flex-col items-center justify-center py-2 text-center'>
                  <p className='text-muted-foreground text-lg font-medium'>
                    Your history is empty.
                  </p>
                  <p className='text-muted-foreground pb-4 pt-2 text-sm'>
                    Videos you viewed will appear here
                  </p>
                </div>
              )}
            </div>
            {showPagination && historyItems.length > 0 && (
              <div className='sticky bottom-0 bg-background/95 pb-2'>
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
      <AlertDialog
        open={isAlertOpen}
        onOpenChange={(open) => {
          setIsAlertOpen(open)
          if (!open) {
            setIsDropdownOpen(true)
          }
        }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear History</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to clear your viewing history? <br />
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleAlertDismiss}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleClearHistory}>
              Clear History
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  )
}

export default HistoryDropdownButton
