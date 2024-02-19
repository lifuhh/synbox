interface SearchResultsFrameProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onSelect: (event: React.MouseEvent<HTMLUListElement>) => void
}

const SearchResultsFrame: React.FC<SearchResultsFrameProps> = ({
  children,
  className,
  isOpen,
  onSelect,
}) => {
  return (
    <ul
      className={`absolute top-full left-0 bg-white shadow-md rounded-md z-50 w-full ${
        isOpen ? 'block' : 'hidden'
      } ${className || ''}`}
      onClick={onSelect}>
      {children}
    </ul>
  )
}
export default SearchResultsFrame
