import {
  YoutubePlaylistApiResponse,
  YoutubePlaylistItem,
  YoutubeSearchApiResponse,
  YoutubeSearchItem,
  formattedSearchResult,
  formattedYoutubeVideoItemForCarousel,
} from '@/types'

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export function formatYoutubePlaylistResponse(
  data: YoutubePlaylistApiResponse
): formattedYoutubeVideoItemForCarousel[] {
  const items = data.items.map(
    (item: YoutubePlaylistItem): formattedYoutubeVideoItemForCarousel => {
      const maxDescriptionLength = 80

      return {
        title: item.snippet.title,
        channel: item.snippet.videoOwnerChannelTitle || 'Unknown',
        description: trimLength(
          item.snippet.description,
          maxDescriptionLength,
          true
        ),
        thumbnailUrl: item.snippet.thumbnails.high.url,
        videoId: item.snippet.resourceId?.videoId,
      }
    }
  )

  return items
}

export function formatYoutubeSearchResponse(
  data: YoutubeSearchApiResponse
): formattedSearchResult[] {
  const maxSearchResultsTitleLength = 22

  console.log('formatting search response')

  const items = data.items.map(
    (item: YoutubeSearchItem): formattedSearchResult => {
      return {
        title: trimLength(
          item.snippet.title,
          maxSearchResultsTitleLength,
          false
        ),
        channel: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        videoId: item.id.videoId,
      }
    }
  )

  console.log(items)

  return items
}

function trimLength(text: string, maxLength: number, trail: boolean) {
  const editedText =
    text.length > maxLength ? text.substring(0, maxLength) : text

  return trail ? editedText + '...' : editedText
}

export function formatTimeDisplay(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const remainingSeconds = seconds % 60
  const remainingMinutes = minutes % 60
  return `${hours ? `${hours}:` : ''}${pad(remainingMinutes)}:${pad(
    remainingSeconds
  )}`
}

function pad(string: number) {
  return ('0' + string).slice(-2)
}
