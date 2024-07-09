import { Button } from '@mantine/core'
import { useState } from 'react'

const StreamingResponse = ({ accumulatedResponse }) => {
  return (
    <div className='streaming-response my-4 '>
      {accumulatedResponse.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  )
}

const FormattedLyrics = ({ lyrics }) => {
  if (!lyrics || (typeof lyrics !== 'string' && !Array.isArray(lyrics))) {
    return <div className='text-center'>No lyrics available</div>
  }

  const lyricsArray = Array.isArray(lyrics) ? lyrics : lyrics.split('\n')

  return (
    <div className='flex flex-col items-center'>
      {lyricsArray.map((line, index) => (
        <div key={index} className='flex w-full max-w-2xl'>
          <div className='w-12 pr-4 text-right font-mono text-gray-500'>
            {index + 1}
          </div>
          <div className='flex-1 text-center'>{line || '\u00A0'}</div>
          <div className='w-12'></div>{' '}
          {/* This empty div balances the layout */}
        </div>
      ))}
    </div>
  )
}

const ComparedLyrics = ({ englishLyrics, chineseLyrics }) => {
  let englishLines = Array.isArray(englishLyrics)
    ? englishLyrics
    : englishLyrics.split('\n')
  const chineseLines = Array.isArray(chineseLyrics)
    ? chineseLyrics
    : chineseLyrics.split('\n')
  const maxLines = Math.max(englishLines.length, chineseLines.length) + 1
  const minLines = Math.min(englishLines.length, chineseLines.length)

  const LineNumbers = ({ lines, maxLines }) => {
    return (
      <div className='w-12 pr-4 text-right font-mono'>
        {[...Array(Math.min(lines.length, maxLines))].map((_, index) => (
          <div
            key={index}
            className={index < minLines ? 'text-green-600' : 'text-red-500'}>
            {index + 1}
          </div>
        ))}
      </div>
    )
  }

  const LyricsColumn = ({ lines, maxLines }) => (
    <div className='flex max-w-xl flex-col items-center'>
      {[...Array(maxLines)].map((_, index) => (
        <div key={index} className='w-full text-center'>
          {index < lines.length ? lines[index] : '\u00A0'}
        </div>
      ))}
    </div>
  )

  console.log('Test data')
  console.log(englishLines)
  console.log(typeof englishLines)

  if (englishLines.length === 1 || chineseLines.length === 1) {
    return <div className='flex w-full justify-center gap-4'></div>
  } else {
    //TODO: Test code - remove when using real data

    englishLines = [...englishLines, 'Wow Testing Failure']
  }

  return (
    <div className='flex w-full justify-center gap-4'>
      <LineNumbers lines={englishLines} maxLines={maxLines} />
      <LyricsColumn lines={englishLines} maxLines={maxLines} />
      <LineNumbers lines={chineseLines} maxLines={maxLines} />
      <LyricsColumn lines={chineseLines} maxLines={maxLines} />
    </div>
  )
}

const TestStreamPage = () => {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [accumulatedResponse, setAccumulatedResponse] = useState('')
  const [finalEngResponse, setEngFinalResponse] = useState('')
  const [finalChiResponse, setChiFinalResponse] = useState('')
  const [origLyrics, setOrigLyrics] = useState([])

  const handleApiCall = async () => {
    if (isStreaming) return

    // eslint-disable-next-line prefer-const
    let localAccumulatedResponse = ''

    setIsStreaming(true)

    try {
      const response = await fetch('http://127.0.0.1:5000/stream_conversation')

      if (!response.ok) throw new Error('Network response was not ok')
      if (!response.body)
        throw new Error('ReadableStream not yet supported in this browser')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Initialize with a new message entry to show streaming
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        lines.forEach((line) => {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6))
            if (data.content) {
              const receivedContent = JSON.parse(data.content)

              //   console.log('Received data "type": ' + receivedContent.type)
              //   console.log('Received data "content": ' + receivedContent.content)
              if (receivedContent.type === 'plain_orig_lyrics') {
                const plain_lyrics = receivedContent.content
                setOrigLyrics(plain_lyrics)
                // console.log(typeof plain_lyrics)
                // console.log(plain_lyrics)
              } else if (receivedContent.content) {
                if (
                  receivedContent.type &&
                  receivedContent.type != 'usage_summary'
                ) {
                  localAccumulatedResponse += receivedContent.content
                  setAccumulatedResponse(
                    (prev) => prev + receivedContent.content,
                  )
                }
                setMessages((prev) => {
                  const newMessages = [
                    ...prev,
                    {
                      role: 'assistant',
                      type: receivedContent.type,
                      content: accumulatedResponse + receivedContent.content,
                    },
                  ]
                  return newMessages
                })

                if (receivedContent.type === 'usage_summary') {
                  //   console.log(
                  //     'Current accumulated Response: ' + localAccumulatedResponse,
                  //   )
                  try {
                    const finalContent = JSON.parse(localAccumulatedResponse)
                    console.log('This is final content in try block setter')
                    console.log(finalContent)
                    setEngFinalResponse(finalContent['english_lyrics'])
                    setChiFinalResponse(finalContent['chinese_lyrics'])
                  } catch (error) {
                    console.error('Error parsing accumulated response:', error)
                  }
                }
              }
            }
          }
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'error',
          content: 'An error occurred while fetching the response.',
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <div className='flex-between flex h-screen w-full flex-col'>
      <div className='flex min-w-full flex-col justify-center gap-8 pt-20'>
        <Button
          variant='outline'
          disabled={isStreaming}
          onClick={handleApiCall}
          className=''>
          Upload
        </Button>
        <div className='flex-around flex min-w-full flex-col'>
          <div className='bg-rose-900'>
            <h1>This is streaming response</h1>
            <StreamingResponse accumulatedResponse={accumulatedResponse} />
          </div>
        </div>
        <div className='my-4 gap-3 rounded-lg bg-indigo-800 p-4 shadow-lg'>
          <h1 className='mb-4 text-center text-sm font-bold'>
            Compared Lyrics
          </h1>
          <div className='rounded-md bg-white/60 p-4 text-black'>
            {!isStreaming && (
              <ComparedLyrics
                englishLyrics={finalEngResponse}
                chineseLyrics={finalChiResponse}
              />
            )}
          </div>
        </div>
        <div>
            <h1 className='mb-4 text-center text-sm font-bold'>
                Original Lyrics
            </h1>
            <div className='rounded-md bg-white/60 p-4 text-black'>
                <FormattedLyrics lyrics={origLyrics} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default TestStreamPage
