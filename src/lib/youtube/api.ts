import axios from 'axios'

const YoutubeApiKey = import.meta.env.VITE_GOOGLE_API_KEY

//?TEST_DRIVE_QUERY
export async function getLandingPagePlaylist(searchTerm: string) {
  if (!searchTerm) return []

  const response = await axios
    .get(`https://www.googleapis.com/youtube/v3/search`, {
      params: {
        key: YoutubeApiKey,
        part: 'snippet',
        q: searchTerm,
        type: 'video',
        videoEmbeddable: 'true',
        safeSearch: 'none',
        regionCode: 'JP',
        order: 'relevance',
        maxResults: 10,
      },
    })
    .then((response) => {
      if (!response) throw Error

      console.log(response)
    })

  return [
    {
      videoId: '123',
      title: 'Video 1',
      creator: 'Creator 1',
    },
    {
      videoId: '456',
      title: 'Video 2',
      creator: 'Creator 2',
    },
    {
      videoId: '789',
      title: 'Video 3',
      creator: 'Creator 3',
    },
    {
      videoId: '123adgad',
      title: 'Video 1',
      creator: 'Creator 1',
    },
    {
      videoId: '456adgad',
      title: 'Video 2',
      creator: 'Creator 2',
    },
    {
      videoId: '789cvacva',
      title: 'Video 3',
      creator: 'Creator 3',
    },
    {
      videoId: '12311',
      title: 'Video 1',
      creator: 'Creator 1',
    },
    {
      videoId: '4561141441',
      title: 'Video 2',
      creator: 'Creator 2',
    },
    {
      videoId: '789121221',
      title: 'Video 3',
      creator: 'Creator 3',
    },
  ]
}
