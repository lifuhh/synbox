import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStreamAnnotateApi } from '@/hooks/useStreamAnnotateApi'
import { Loader } from '@mantine/core'
import React, { useEffect } from 'react'

interface RequestDialogAnnotateDisplayProps {
  id: string
  lyrics: string[]
  timestampedLyrics: unknown[]
  onAnnotationsUpdate: (
    engTranslation: string[],
    chiTranslation: string[],
    romajiLyrics: string[],
    kanjiAnnotations: string[],
  ) => void
}

const RequestDialogAnnotateDisplay = ({
  id,
  lyrics,
  timestampedLyrics,
  onAnnotationsUpdate,
}: RequestDialogAnnotateDisplayProps) => {
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

  useEffect(() => {
    if (
      showAnnotation &&
      engTranslation &&
      chiTranslation &&
      romajiLyrics &&
      kanjiAnnotations
    ) {
      onAnnotationsUpdate(
        engTranslation,
        chiTranslation,
        romajiLyrics,
        kanjiAnnotations,
      )
    }
  }, [
    showAnnotation,
    engTranslation,
    chiTranslation,
    romajiLyrics,
    kanjiAnnotations,
    onAnnotationsUpdate,
  ])

  const renderScrollableContent = (content: string[] | null) => {
    if (!content) return null

    return (
      <div className='h-64 overflow-y-auto rounded border border-gray-300 p-2'>
        {content.map((line, index) => (
          <p key={index} className='whitespace-pre-wrap'>
            {line}
          </p>
        ))}
      </div>
    )
  }

  const renderTabs = () => {
    if (!showAnnotation) return null

    return (
      <Tabs defaultValue='original' className='w-full'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='original'>Original</TabsTrigger>
          <TabsTrigger value='english'>English</TabsTrigger>
          <TabsTrigger value='chinese'>Chinese</TabsTrigger>
          <TabsTrigger value='romaji'>Romaji</TabsTrigger>
          <TabsTrigger value='kanji'>Kanji</TabsTrigger>
        </TabsList>
        <TabsContent value='original'>
          {renderScrollableContent(lyrics)}
        </TabsContent>
        <TabsContent value='english'>
          {renderScrollableContent(engTranslation)}
        </TabsContent>
        <TabsContent value='chinese'>
          {renderScrollableContent(chiTranslation)}
        </TabsContent>
        <TabsContent value='romaji'>
          {renderScrollableContent(romajiLyrics)}
        </TabsContent>
        <TabsContent value='kanji'>
          {renderScrollableContent(kanjiAnnotations)}
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <div className='mt-4 w-full'>
      <h3 className='mb-4 text-xl font-bold'>Step 3: Translate and Annotate</h3>
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
      {renderTabs()}
    </div>
  )
}

export default RequestDialogAnnotateDisplay
