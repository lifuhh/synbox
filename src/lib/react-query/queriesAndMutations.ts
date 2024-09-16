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
  getCurrentUser,
  getSongLyricsById,
  signInGoogleAccount,
  uploadHardCodedLyrics,
} from '../appwrite/api'
import {
  getChartsPlaylist,
  getInfiniteGalleryPlaylist,
  getLandingPagePlaylist,
  getYoutubeSearchResults,
  getYoutubeVideoInfo,
} from '../youtube/api'

import {
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
        // Apply 2-second delay for subsequent loads
        await delayApiResponse(320)
      } else {
        isFirstLoad.current = false
      }

      return result
    },
    initialPageParam: '',
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
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
  return useQuery({
    queryKey: [QUERY_KEYS.GET_YOUTUBE_VIDEO_INFO, videoId],
    queryFn: () => getYoutubeVideoInfo(videoId),
    enabled: !!videoId,
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
    enabled: !!songId,
    staleTime: 1000 * 60 * 60, // Keep the data fresh indefinitely
    gcTime: 1000 * 60 * 60, // Keep the data cached for 1 hour
    queryFn: () => getSongLyricsById(songId),
  })
}

export const useAddLyricsToSong = () => {
  return useMutation({
    mutationFn: (lyricsFile: File) => addLyricsToSong(lyricsFile),
  })
}

interface HardCodedLyricsData {
  full_lyrics: string
  plain_lyrics: string
  romaji: string
  eng_translation: string
  chi_translation: string
  labelled_full_lyrics: string
}
export const useUploadHardCodedLyrics = () => {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      songId,
      lyricsData,
    }: {
      songId: string
      lyricsData: HardCodedLyricsData
    }) => uploadHardCodedLyrics(songId, lyricsData),
  })
}
