/* eslint-disable @typescript-eslint/no-unused-vars */
import {
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
  getLandingPagePlaylist,
  getYoutubeSearchResults,
  getYoutubeVideoInfo,
} from '../youtube/api'

import { validateVideoById } from '../synbox-flask/api'

import { QUERY_KEYS } from './queryKeys'

// export const useCreateUserAccount = () => {
//   return useMutation({
//     mutationFn: (user: INewUser) => createUserAccount(user),
//   })
// }

export const useValidateVideoById = (videoId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.VALIDATE_VIDEO_BY_ID, videoId],
    queryFn: () => validateVideoById(videoId),
    enabled: !!videoId,
    staleTime: 10 * 60 * 1000,
    // onSuccess: (data) => console.log('Query succeeded:', data),
    // onError: (error) => console.error('Query failed:', error),
  })
}

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
