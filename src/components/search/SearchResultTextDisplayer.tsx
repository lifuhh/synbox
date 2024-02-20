interface SearchResultTextDisplayerProps {
  title: string
  misc: string
  fontSize?: string // e.g., '16px', '1em'
  color?: string // e.g., '#333', 'red'
  fontFamily?: string // e.g., 'Arial', 'sans-serif'
}

const SearchResultTextDisplayer: React.FC<SearchResultTextDisplayerProps> = ({
  title,
  misc,
  fontSize = '1rem', // Provide default values
  color = 'black',
  fontFamily = 'Arial',
}) => {
  const textStyle = {
    fontSize,
    color,
    fontFamily,
  }

  return (
    <div className='grid gap-0.5 text-xs shrink-0'>
      <p className='font-medium text-red'>{title}</p>
      <p className='text-xs text-gray-500 dark:text-gray-400'>{misc}</p>
    </div>
  )
}
export default SearchResultTextDisplayer
