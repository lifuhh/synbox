import { Loader, Text } from '@mantine/core'
import React from 'react'

interface UpdateMessagesDisplayProps {
  isStreaming: boolean
  showLoader: boolean
  updateMessages: string[]
  loaderColor?: string
  loaderType?: 'bars' | 'oval' | 'dots'
  loaderSize?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  textSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  verticalMargin?: number | string
}

const UpdateMessagesDisplay: React.FC<UpdateMessagesDisplayProps> = ({
  isStreaming,
  showLoader,
  updateMessages,
  loaderColor = 'white',
  loaderType = 'dots',
  loaderSize = 'lg',
  textSize = 'lg',
  verticalMargin = 4,
}) => {
  const lastMessage = updateMessages.slice(-1)[0] as string

  const marginClass =
    typeof verticalMargin === 'number'
      ? `my-${verticalMargin}`
      : `my-[${verticalMargin}]`

  return (
    <>
      {showLoader && (
        <div className={`flex-center mt-10 flex flex-col ${marginClass}`}>
          {isStreaming ? (
            updateMessages.length > 0 ? (
              <Text size={textSize}>{lastMessage}</Text>
            ) : (
              //? This seems to only be activated by transcription
              <Text size={textSize}>Waiting for updates...</Text>
            )
          ) : (
            <Text size={textSize}>Cleaning up...</Text>
          )}
          <Loader color={loaderColor} type={loaderType} size={loaderSize} />
        </div>
      )}
    </>
  )
}

export default UpdateMessagesDisplay
