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
      className={`absolute bg-white shadow-md rounded-md grid gap-1 p-2 top-full left-0 z-50 w-full ${
        isOpen ? 'block' : 'hidden'
      } ${className || ''}`}
      onSelect={onSelect}>
      {children}
    </ul>
  )
}
export default SearchResultsFrame
