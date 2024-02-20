import {
  YoutubePlaylistApiResponse,
  YoutubePlaylistItem,
  YoutubeSearchApiResponse,
  YoutubeSearchItem,
  formattedSearchResult,
  formattedYoutubeVideoItemForCarousel,
} from '@/types'

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
