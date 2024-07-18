import { useGetLyricsBySongId } from '@/lib/react-query/queriesAndMutations'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

interface HeroGenerateLyricsProcessingProps {
  subStage: number
  setSubStage: (stage: number) => void
  videoId: string
  setInputVideoId: (videoId: string) => void
  setProcessingStage: (stage: number) => void
}

const HeroGenerateLyricsProcessing = ({
  subStage,
  setSubStage,
  setProcessingStage,
  videoId,
  setInputVideoId,
}: HeroGenerateLyricsProcessingProps) => {
  const [lyricsRetrieved, setLyricsRetrieved] = useState<boolean>(false)
  const [checkingStatus, setCheckingStatus] =
    useState<string>('Lyrics Not Found')
  const navigate = useNavigate()

  const { data: lyrics, isLoading: lyricsFetching } =
    useGetLyricsBySongId(videoId)

  useEffect(() => {
    // If lyrics exist, navigate to /v/{videoId}
    if (lyrics) {
      setCheckingStatus('Lyrics found, redirecting...')
      setTimeout(() => {
        setProcessingStage(1)
        setInputVideoId('')
        navigate(`/v/${videoId}`)
      }, 2000) // 2 seconds delay
    }
  }, [lyrics, navigate, videoId, setProcessingStage, setInputVideoId])

  const handleBackButton = () => {
    setProcessingStage(1)
    setInputVideoId('')
  }

  return (
    <div className='items-top bg-grid-white/[0.90] relative flex w-full overflow-hidden rounded-md bg-dark-1/[0.15] pt-10 antialiased md:h-[25rem]  md:justify-center'>
      <div className='flex-between w-full flex-col'>
        <h1>HeroGenerateLyricsProcessing</h1>
        <h1>Substage: {subStage}</h1>
        <div>
          <h1>{lyricsFetching ? 'Searching Database...' : checkingStatus}</h1>
          <h1>{lyrics ? 'Lyrics received' : 'No Lyrics Found'}</h1>
        </div>
        {/* <div className='overflow-scroll'>
          {lyrics
            ? JSON.parse(lyrics.plain_lyrics).map(
                (lyric: string, index: number) => <p key={index}>{lyric}</p>,
              )
            : 'No Lyrics'}
        </div> */}
        <Button onClick={handleBackButton}>Back</Button>
      </div>
    </div>
  )
}
export default HeroGenerateLyricsProcessing

/** 

DOESNT EXIST
https://www.youtube.com/watch?v=0xSiBpUdW4E

EXIST
https://www.youtube.com/watch?v=EaA6NlH80wg

*/
