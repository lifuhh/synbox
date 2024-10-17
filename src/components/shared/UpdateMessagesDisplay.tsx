import { Loader, Paper, ScrollArea, Text } from '@mantine/core'
import React from 'react'

interface UpdateMessagesDisplayProps {
  isStreaming: boolean
  showLoader: boolean
  updateMessages: string[]
  loaderColor?: string
  loaderType?: 'bars' | 'oval' | 'dots'
}

const UpdateMessagesDisplay: React.FC<UpdateMessagesDisplayProps> = ({
  isStreaming,
  showLoader,
  updateMessages,
  loaderColor = 'yellow',
  loaderType = 'dots',
}) => {
  // const lastFewMessages = updateMessages.slice(-5) // Show last 5 messages
  const lastMessage = updateMessages.slice(-1)[0] as string

  return (
    <>
      {/* {isStreaming && updateMessages.length > 0 && (
        <Paper className='m-2 p-4'>
          <ScrollArea style={{ height: 150 }}>
            {lastFewMessages.map((message, index) => (
              <Text key={index} size='sm' className='mb-2'>
                {message}
              </Text>
            ))}
          </ScrollArea>
        </Paper>
      )} */}
      {showLoader && (
        <div className='flex-center my-4 flex flex-col'>
          <Loader color={loaderColor} type={loaderType} size='lg' />
          {isStreaming ? (
            updateMessages.length > 0 ? (
              <Text size='lg'>{lastMessage}</Text>
            ) : (
              <Text size='lg'>Pending Updates...</Text>
            )
          ) : (
            <Text size='lg'>Finalizing...</Text>
          )}
        </div>
      )}
    </>
  )
}

export default UpdateMessagesDisplay
