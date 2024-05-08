interface SearchResultsFrameProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onSelect: (event: React.MouseEvent<HTMLUListElement>) => void
}

const SearchResultsFrame: React.FC<SearchResultsFrameProps> = ({
  className,
  isOpen,
  children,
  onSelect,
}) => {
  return (
    <ul
      className={`absolute left-0 top-full z-50 grid w-full gap-1 rounded-md bg-white p-2 shadow-md ${
        isOpen ? 'block' : 'hidden'
      } ${className || ''}`}
      onSelect={onSelect}>
      {children}
    </ul>
  )
}
export default SearchResultsFrame
