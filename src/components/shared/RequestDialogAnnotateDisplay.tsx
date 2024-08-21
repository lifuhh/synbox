import { useState } from 'react'

interface RequestDialogAnnotateDisplayProps {
  id: string
  lyrics: string[]
  timestampedLyrics: string[]
}

const RequestDialogAnnotateDisplay: React.FC<
  RequestDialogAnnotateDisplayProps
> = ({ id, lyrics, timestampedLyrics }) => {
  const [showLoader, setShowLoader] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [cachedLyrics, setCachedLyrics] = useState(null)

  // const {

  // } = useStream

  return <div>RequestDialogAnnotateDisplay</div>
}
export default RequestDialogAnnotateDisplay
