import React from 'react'

interface SearchResultsFrameProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onSelect: (event: React.MouseEvent) => void
}

const SearchResultsFrame = ({
  className,
  isOpen,
  children,
  onSelect,
}: SearchResultsFrameProps) => {
  const handleSelect: React.MouseEventHandler = (event) => {
    onSelect(event)
  }

  return (
    <ul
      className={`absolute left-0 top-full z-50 grid w-full gap-1 rounded-md bg-white p-2 shadow-md ${
        isOpen ? 'block' : 'hidden'
      } ${className || ''}`}
      onClick={handleSelect} // Changed from onSelect to onClick
    >
      {children}
    </ul>
  )
}

export default SearchResultsFrame
