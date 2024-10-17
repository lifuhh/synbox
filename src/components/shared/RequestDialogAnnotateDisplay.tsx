import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStreamAnnotateApi } from '@/hooks/useStreamAnnotateApi'
import { Text } from '@mantine/core'
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
  const [showProgressUpdate, setShowProgressUpdate] = useState(true)

  useEffect(() => {
    mutate({ vidId: id, lyrics, timestampedLyrics })
  }, [id, lyrics, timestampedLyrics, mutate])

  useEffect(() => {
    // Hide ProgressUpdate when UpdateMessagesDisplay shows "Finalizing..."
    if (!isStreaming && isBuffering) {
      setShowProgressUpdate(false)
    } else {
      setShowProgressUpdate(true)
    }
  }, [isStreaming, isBuffering])

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
      <div className='h-80 overflow-y-auto rounded border border-gray-300 p-2'>
        {content.map((line, index) => (
          <p key={index} className='whitespace-pre-wrap'>
            {line}
          </p>
        ))}
      </div>
    )
  }

  const renderTabs = () => (
    <>
      <Text className='mb-4' ta='center' size='lg' fw={700}>
        Preview
      </Text>
      <Tabs defaultValue='lyrics' className='w-full'>
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
    </>
  )

  const initialSteps: Step[] = [
    { id: 'translation', title: 'Translation', status: 'pending' },
    { id: 'romaji', title: 'Romaji Annotation', status: 'pending' },
    { id: 'kanji', title: 'Kanji Annotation', status: 'pending' },
    { id: 'completion', title: 'Finalizing', status: 'pending' },
  ]

  const steps: Step[] = initialSteps
    .map((step): Step => {
      if (currentTask === step.id) {
        return { ...step, status: 'active' }
      }
      if (
        (step.id === 'translation' && (engTranslation || chiTranslation)) ||
        (step.id === 'romaji' && romajiLyrics) ||
        (step.id === 'kanji' && kanjiAnnotations) ||
        currentTask === 'completion'
      ) {
        return { ...step, status: 'completed' }
      }
      return step
    })
    .filter((step) => step.id !== 'completion')

  return (
    <div className='w-full'>
      {isStreaming || isBuffering ? (
        <div className='mt-4 w-full'>
          {showProgressUpdate && <ProgressUpdate steps={steps} />}
          <UpdateMessagesDisplay
            isStreaming={isStreaming}
            showLoader={isBuffering}
            updateMessages={updateMessages}
          />
        </div>
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
