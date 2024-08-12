import axios from 'axios'

const FlaskBEAddress = import.meta.env.VITE_SYNBOX_BE_URL

interface StreamData {
  type: 'update' | 'data' | 'vid_info'
  data: string | number
}

export async function streamValidateVideoById(id: string) {
  if (!id) throw new Error('No video ID provided')

  // const response = await fetch(`${FlaskBEAddress}/stream`, {
  //   method: 'POST',
  //   body: JSON.stringify({ id }),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })

  const response = await fetch(`http://127.0.0.1:8080/test`, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) throw new Error('Network response was not ok')
  if (!response.body)
    throw new Error('ReadableStream not yet supported in this browser')

  const reader = response.body!.getReader()
  const decoder = new TextDecoder()

  const result: StreamData[] = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value)
    const updates = chunk.split('\n').filter(Boolean)
    updates.forEach((update) => {
      result.push(JSON.parse(update))
    })
  }

  return result
}
