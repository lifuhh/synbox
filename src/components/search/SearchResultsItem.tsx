interface SearchResultsItemProps {
  videoId: string
  title: string
  creator: string
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void
}

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({
  videoId,
  onClick,
}) => {
  return (
    <li
      className={` px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer z-50`}
      onClick={onClick}>
      {videoId}
    </li>
  )
}
export default SearchResultsItem
