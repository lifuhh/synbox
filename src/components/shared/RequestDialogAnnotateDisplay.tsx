import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStreamAnnotateApi } from '@/hooks/useStreamAnnotateApi'
import { useEffect, useState } from 'react'
import { ProgressUpdate, Step } from './ProgressUpdate'
import UpdateMessagesDisplay from './UpdateMessagesDisplay'

const RequestDialogAnnotateDisplay = ({
  id,
  lyrics,
  timestampedLyrics,
  onAnnotationsUpdate,
}) => {
  const {
    isStreaming,
    updateMessages,
    engTranslation,
    chiTranslation,
    romajiLyrics,
    kanjiAnnotations,
    isDataComplete,
    error,
    mutate,
    currentTask,
  } = useStreamAnnotateApi()

  const [isBuffering, setIsBuffering] = useState(true)

  useEffect(() => {
    mutate({ vidId: id, lyrics, timestampedLyrics })
  }, [id, lyrics, timestampedLyrics, mutate])

  useEffect(() => {
    if (isDataComplete) {
      const timer = setTimeout(() => {
        setIsBuffering(false)
        onAnnotationsUpdate(
          engTranslation,
          chiTranslation,
          romajiLyrics,
          kanjiAnnotations,
        )
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [
    isDataComplete,
    engTranslation,
    chiTranslation,
    romajiLyrics,
    kanjiAnnotations,
    onAnnotationsUpdate,
  ])

  const renderScrollableContent = (content) => {
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
    <Tabs defaultValue='lyrics' className='h-[50vh] w-full'>
      <TabsList className='grid w-full grid-cols-4'>
        <TabsTrigger value='lyrics'>Lyrics</TabsTrigger>
        <TabsTrigger value='english'>English</TabsTrigger>
        <TabsTrigger value='chinese'>Chinese</TabsTrigger>
        <TabsTrigger value='romaji'>Romaji</TabsTrigger>
      </TabsList>
      <TabsContent value='lyrics'>
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
    </Tabs>
  )

  const initialSteps: Step[] = [
    { id: 'translation', title: 'Translation', status: 'pending' },
    { id: 'romaji', title: 'Romaji Annotation', status: 'pending' },
    { id: 'kanji', title: 'Kanji Annotation', status: 'pending' },
  ]

  const steps: Step[] = initialSteps.map((step): Step => {
    if (currentTask === step.id) {
      return { ...step, status: 'active' }
    }
    if (
      (step.id === 'translation' && (engTranslation || chiTranslation)) ||
      (step.id === 'romaji' && romajiLyrics) ||
      (step.id === 'kanji' && kanjiAnnotations)
    ) {
      return { ...step, status: 'completed' }
    }
    return step
  })

  return (
    <div className='mt-4 h-[50vh] w-full'>
      {isStreaming || isBuffering ? (
        <>
          <ProgressUpdate steps={steps} />
          <UpdateMessagesDisplay
            isStreaming={isStreaming}
            showLoader={isBuffering}
            updateMessages={updateMessages}
            loaderColor='blue'
          />
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
