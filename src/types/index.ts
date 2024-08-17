//! Appwrite Types

//! Youtube Types
//? Youtube Playlist
export interface formattedYoutubeVideoItemForCarousel {
  title: string
  channel: string
  description: string
  thumbnailUrl: string
  videoId: string
}
export interface YoutubePlaylistApiResponse {
  kind: string
  etag: string
  items: YoutubePlaylistItem[]
  pageInfo: PageInfo
}

export interface YoutubePlaylistItem {
  kind: string
  etag: string
  id: string
  snippet: YoutubePlaylistItemSnippet
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface YoutubePlaylistItemSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  playlistId: string
  position: number
  resourceId: ResourceId
  videoOwnerChannelTitle: string
  videoOwnerChannelId: string
}

export interface ResourceId {
  kind: string
  videoId: string
}

export interface Thumbnails {
  default: ThumbnailInfo
  medium: ThumbnailInfo
  high: ThumbnailInfo
  standard?: ThumbnailInfo
  maxres?: ThumbnailInfo
}

export interface ThumbnailInfo {
  url: string
  width: number
  height: number
}

export interface formattedSearchResult {
  title: string
  channel: string
  thumbnailUrl: string
  videoId: string
}

//? Youtube Search
export interface YoutubeSearchApiResponse {
  kind: string
  etag: string
  nextPageToken?: string
  regionCode?: string
  items: YoutubeSearchItem[]
  pageInfo: PageInfo
}

export interface YoutubeVideoStatistics {
  viewCount: string
  likeCount: string
  commentCount: string
}

export interface YoutubeSearchItem {
  kind: string
  etag: string
  id: string
  snippet: YoutubeSearchItemSnippet
  contentDetails: {
    duration: string
  }
  statistics: YoutubeVideoStatistics
}

export interface YoutubeSearchItemSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails?: Thumbnails
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
  tags?: string[]
  defaultAudioLanguage?: string
}

export interface YoutubeSearchResultInfo {
  id: string
  title: string
  channelTitle: string
  description: string
  tags: string[]
  defaultAudioLanguage: string
  thumbnail: string
  duration: string
  statistics: YoutubeVideoStatistics
}

//* Lyrics Processing Types
export interface UploadedSrtLine {
  index: number
  startTime: string
  endTime: string
  text: string
}
