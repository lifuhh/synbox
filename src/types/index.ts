import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'

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

// YouTube API Types
export interface YoutubePlaylistApiResponse {
  kind: string
  etag: string
  nextPageToken?: string
  items: YoutubePlaylistItem[]
  pageInfo: PageInfo
}

export interface YoutubePlaylistItem {
  kind: string
  etag: string
  id: string
  snippet: YoutubePlaylistItemSnippet
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

export interface ResourceId {
  kind: string
  videoId: string
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface InfiniteGalleryVideoItem {
  title: string
  channel: string
  description: string
  thumbnailUrl: string
  videoId: string
}

export interface TransformedYoutubePlaylistPage {
  items: InfiniteGalleryVideoItem[]
  nextPageToken?: string
}

export type InfiniteGalleryQueryResult = UseInfiniteQueryResult<
  InfiniteData<TransformedYoutubePlaylistPage>,
  Error
>

export interface FetchInfiniteGalleryPlaylistParams {
  pageParam?: string
}

export type FormatYoutubeResponseFunction = (
  data: YoutubePlaylistApiResponse,
) => InfiniteGalleryVideoItem[]

// InfiniteScrollGallery Types
export interface InfiniteGalleryVideoItem {
  title: string
  channel: string
  description: string
  thumbnailUrl: string
  videoId: string
}

export interface InfiniteScrollGalleryProps {
  items: InfiniteGalleryVideoItem[]
  className?: string
  fetchNextPage: () => void
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
}

// API Function Types
export interface FetchInfiniteGalleryPlaylistParams {
  pageParam?: string
}

export interface InfiniteGalleryVideoItem {
  title: string
  channel: string
  description: string
  thumbnailUrl: string
  videoId: string
}

export interface TransformedYoutubePlaylistPage {
  items: InfiniteGalleryVideoItem[]
  nextPageToken?: string
}

export interface FetchInfiniteGalleryPlaylistParams {
  pageParam?: string
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
  id:
    | string
    | {
        videoId: string
        kind: string
      }
  snippet: YoutubeSearchItemSnippet
  contentDetails?: {
    duration: string
  }
  statistics?: YoutubeVideoStatistics
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
  id: string | { videoId: string; kind: string }
  title: string
  channelTitle: string
  description: string
  tags: string[]
  defaultAudioLanguage: string
  thumbnail: string
  duration: string
  statistics?: YoutubeVideoStatistics
}

//* Lyrics Processing Types
export interface UploadedSrtLine {
  index: number
  startTime: string
  endTime: string
  text: string
}

export interface FullVideoInfo {
  id: string
  thumbnail: string
  views: number
  duration: number
  likes: number
  playable_in_embed: boolean
  title: string
  categories: string[]
  description: string
  channel_name: string
  uploader: string
  language: string
}

export interface VideoInfoForValidation {
  title: string
  categories: string[]
  description: string
  channel_name: string
  uploader: string
  language: string
}

export interface SubtitleInfo {
  exist: boolean
  path: string | null
  ext: string | null
}

export interface VideoInfo {
  passed: boolean
  audio_file_path: string
  full_vid_info: FullVideoInfo
  vid_info_for_validation: VideoInfoForValidation
  subtitle_info: SubtitleInfo
  error_msg: string | null
}

export interface CurrentPlayingInfo {
  videoId: string
  title: string
  author: string
  thumbnailUrl: string
}
