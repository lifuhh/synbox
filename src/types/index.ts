//! Appwrite Types





//! Youtube Types
export interface YoutubePlaylistResponse {
  kind: string
  etag: string
  items: YoutubeItem[]
  pageInfo: PageInfo
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface YoutubeItem {
  kind: string
  etag: string
  id: string
  snippet: Snippet
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnail
  channelTitle: string
  playlistId: string
  position: number
  resourceId: ResourceId
  videoOwnerChannelTitle: string
  videoOwnerChannelId: string
}

export interface Thumbnail {
  default: ThumbnailInfo
  medium: ThumbnailInfo
  high: ThumbnailInfo
  standard: ThumbnailInfo
  maxres?: ThumbnailInfo
}

export interface ThumbnailInfo {
  url: string
  width: number
  height: number
}

export interface ResourceId {
  kind: string
  videoId: string
}

export interface formattedVideoItemForCarousel {
  title: string
  channel: string
  description: string
  thumbnailUrl: string
  videoId: string
}
