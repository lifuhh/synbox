import axios from 'axios'

const FlaskBEAddress = import.meta.env.VITE_SYNBOX_BE_URL

export async function validateVideoById(videoId: string) {
  if (!videoId) throw new Error('No video ID provided')

  try {
    const response = await axios.get(
      `${FlaskBEAddress}/validate?q=https://www.youtube.com/watch?v=${videoId}`,
      { headers: { 'Content-Type': 'application/json' } },
    )

    console.log(response.data)

    if (!response) throw new Error('Validation request failed, please try again')

    return response.data
  } catch (error) {
    console.error('Error validating video:', error)
    throw error
  }
}
