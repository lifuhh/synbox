import { Button } from '@/components/ui/button'
import { useStreamAnnotateApi } from '@/hooks/useStreamAnnotateApi'
import { Loader } from '@mantine/core'
import React, { useEffect } from 'react'

interface RequestDialogAnnotateDisplayProps {
  id: string
  lyrics: string[]
  timestampedLyrics: string[]
}

const RequestDialogAnnotateDisplay: React.FC<
  RequestDialogAnnotateDisplayProps
> = ({ id, lyrics, timestampedLyrics }) => {
  const {
    isStreaming,
    updateMessages,
    engTranslation,
    chiTranslation,
    romajiLyrics,
    kanjiAnnotations,
    showAnnotation,
    error,
    mutate,
  } = useStreamAnnotateApi()

  useEffect(() => {
    mutate({ vidId: id, lyrics, timestampedLyrics })
  }, [id, lyrics, timestampedLyrics, mutate])

  const renderScrollableContent = (title: string, content: string[] | null) => {
    if (!content) return null

    return (
      <div className='mt-4'>
        <h4 className='font-bold'>{title}</h4>
        <div className='max-h-40 overflow-y-auto rounded border border-gray-300 p-2'>
          {content.map((line, index) => (
            <p key={index} className='whitespace-pre-wrap'>
              {line}
            </p>
          ))}
        </div>
      </div>
    )
  }

  const renderAnnotations = () => {
    if (!showAnnotation) return null

    return (
      <div className='mt-4 space-y-4'>
        {renderScrollableContent('Original Lyrics', lyrics)}
        {renderScrollableContent('English Translation', engTranslation)}
        {renderScrollableContent('Chinese Translation', chiTranslation)}
        {renderScrollableContent('Romaji Lyrics', romajiLyrics)}
        {renderScrollableContent('Kanji Annotations', kanjiAnnotations)}
      </div>
    )
  }

  return (
    <div className='mt-4 w-full'>
      <h3 className='text-xl font-bold'>Step 3: Translate and Annotate</h3>
      {isStreaming && (
        <div className='my-4'>
          <Loader color='yellow' type='dots' />
          <div className='mt-2 max-h-40 overflow-y-auto'>
            {updateMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className='mt-4 text-red-500'>
          <p>Error: {error}</p>
        </div>
      )}
      {renderAnnotations()}
    </div>
  )
}

export default RequestDialogAnnotateDisplay
