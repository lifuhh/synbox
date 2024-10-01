import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStreamAnnotateApi } from '@/hooks/useStreamAnnotateApi'
import { Loader } from '@mantine/core'
import { CheckCircle, Circle, Loader2 } from 'lucide-react'
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

const tasks = [
  { id: 'eng_translation', name: 'English Translation' },
  { id: 'chi_translation', name: 'Chinese Translation' },
  { id: 'romaji_lyrics', name: 'Romaji Lyrics' },
  { id: 'kanji_annotations', name: 'Kanji Annotations' },
]

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
    currentTask,
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

  const renderTabs = () => (
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

  const renderTaskList = () => (
    <div className='mb-4'>
      {tasks.map((task) => (
        <div key={task.id} className='mb-2 flex items-center'>
          {currentTask === task.id ? (
            <Loader2 className='mr-2 h-5 w-5 animate-spin text-blue-500' />
          ) : task.id in
            {
              engTranslation,
              chiTranslation,
              romajiLyrics,
              kanjiAnnotations,
            } ? (
            <CheckCircle className='mr-2 h-5 w-5 text-green-500' />
          ) : (
            <Circle className='mr-2 h-5 w-5 text-gray-300' />
          )}
          <span
            className={
              currentTask !== task.id &&
              !(
                task.id in
                {
                  engTranslation,
                  chiTranslation,
                  romajiLyrics,
                  kanjiAnnotations,
                }
              )
                ? 'text-gray-400'
                : ''
            }>
            {task.name}
          </span>
        </div>
      ))}
    </div>
  )

  return (
    <div className='mt-4 w-full'>
      <h3 className='mb-4 text-xl font-bold'>Step 3: Translate and Annotate</h3>
      {isStreaming || !showAnnotation ? (
        <>
          {renderTaskList()}
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
        </>
      ) : (
        renderTabs()
      )}
      {error && (
        <div className='mt-4 text-red-500'>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  )
}

export default RequestDialogAnnotateDisplay
