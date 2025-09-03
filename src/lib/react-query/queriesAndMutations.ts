/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  addLyricsToSong,
  addSongInfoBySongId,
  getCurrentUser,
  getSongInfoBySongId,
  getSongLyricsById,
  signInGoogleAccount,
  uploadLyricsToAppwrite,
} from '../appwrite/api'
import {
  getChartsPlaylist,
  getInfiniteGalleryPlaylist,
  getLandingPagePlaylist,
  getYoutubeSearchResults,
  getYoutubeVideoInfo,
} from '../youtube/api'

import {
  CurrentPlayingInfo,
  InfiniteGalleryQueryResult,
  TransformedYoutubePlaylistPage,
  YoutubePlaylistApiResponse,
} from '@/types'
import { delayApiResponse, formatYoutubeInfiniteGalleryResponse } from '@/utils'
import { useRef } from 'react'
import { QUERY_KEYS } from './queryKeys'

export const useSignInGoogleAccount = () => {
  return useMutation({
    mutationFn: () => signInGoogleAccount(),
  })
}

//?TEST_DRIVE_QUERY
export const useGetLandingPagePlaylist = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LANDING_PAGE_PLAYLIST],
    queryFn: () => getLandingPagePlaylist(),
  })
}

export const useGetChartsPlaylist = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CHARTS_PLAYLIST],
    queryFn: () => getChartsPlaylist(),
    staleTime: 1000 * 60 * 60 * 24, // Keep the data fresh for 1 day
    gcTime: 1000 * 60 * 60, // Keep the data cached for 1 hour
  })
}

export const useGetInfiniteGalleryPlaylist = (): InfiniteGalleryQueryResult => {
  const isFirstLoad = useRef(true)

  return useInfiniteQuery<
    YoutubePlaylistApiResponse,
    Error,
    InfiniteData<TransformedYoutubePlaylistPage>,
    [string],
    string
  >({
    queryKey: [QUERY_KEYS.GET_INFINITE_GALLERY_PLAYLIST],
    queryFn: async ({ pageParam = '' }) => {
      const result = await getInfiniteGalleryPlaylist({ pageParam })

      if (!isFirstLoad.current) {
        // Apply a random delay between 150ms and 300ms for subsequent loads
        const randomDelay = Math.floor(Math.random() * (350 - 220 + 1) + 220)
        await delayApiResponse(randomDelay)
      } else {
        isFirstLoad.current = false
      }

      return result
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,

    staleTime: 5 * 60 * 1000,        // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000,          // Cache for 10 minutes after component unmounts
    refetchOnWindowFocus: false,      // Don't refetch when window gains focus
    refetchOnMount: false,            // Don't refetch on component remount if data exists
    refetchOnReconnect: 'always',     // Only refetch on reconnect if data is stale
    select: (data) => ({
      pages: data.pages.map((page) => ({
        items: formatYoutubeInfiniteGalleryResponse(page),
        nextPageToken: page.nextPageToken,
      })),
      pageParams: data.pageParams,
    }),
  })
}

export const useGetYoutubeVideoInfo = (videoId: string) => {
  const { isError } = useGetSongInfoBySongId(videoId)

  return useQuery({
    queryKey: [QUERY_KEYS.GET_YOUTUBE_VIDEO_INFO, videoId],
    queryFn: () => getYoutubeVideoInfo(videoId),
    enabled: !!videoId && isError, // Only fetch if videoId exists and database fetch failed
  })
}

export const useGetYoutubeSearchResults = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_YOUTUBE_SEARCH_RESULTS, searchTerm],
    enabled: !!searchTerm,
    queryFn: () => getYoutubeSearchResults(searchTerm),
  })
}

export const useGetLyricsBySongId = (songId: string) => {  
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LYRICS_BY_SONG_ID, songId],
    enabled: Boolean(songId?.trim()), // More strict check
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Prevent refetch on mount
    refetchOnReconnect: false, // Prevent refetch on reconnect
    retry: false, // Disable retries since we expect 404s for non-existent lyrics
    queryFn: () => getSongLyricsById(songId),
  })
}

export const useAddSongInfoBySongId = () => {
  return useMutation({
    mutationFn: (songInfo: CurrentPlayingInfo) => addSongInfoBySongId(songInfo),
  })
}

export const useGetSongInfoBySongId = (songId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SONG_INFO_BY_SONG_ID, songId],
    enabled: !!songId,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    queryFn: () => getSongInfoBySongId(songId),
  })
}

export const useAddLyricsToSong = () => {
  return useMutation({
    mutationFn: (lyricsFile: File) => addLyricsToSong(lyricsFile),
  })
}

interface LyricsDataInterface {
  full_lyrics: string
  plain_lyrics: string
  romaji: string
  eng_translation: string
  chi_translation: string
  labelled_full_lyrics: string
}
export const useUploadLyricsToAppwrite = () => {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      songId,
      lyricsData,
    }: {
      songId: string
      lyricsData: LyricsDataInterface
    }) => uploadLyricsToAppwrite(songId, lyricsData),
  })
}
