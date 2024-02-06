import { YoutubeItem } from '@/types'

export function formatYoutubePlaylistResponse(playlistJson: string) {
  const playlist = JSON.parse(playlistJson)

  const items = playlist.items.map((item: YoutubeItem) => {
    const maxDescriptionLength = 80

    return {
      title: item.snippet.title,
      channel: item.snippet.videoOwnerChannelTitle,
      description: trimDescriptionLength(
        item.snippet.description,
        maxDescriptionLength
      ),
      thumbnailUrl: item.snippet.thumbnails.high.url,
      videoId: item.snippet.resourceId.videoId,
    }
  })

  return items
}

function trimDescriptionLength(description: string, maxLength: number) {
  return description.length > maxLength
    ? description.substring(0, maxLength) + '...'
    : description
}
