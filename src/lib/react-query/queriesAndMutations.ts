import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { addLyricsToSong } from '../appwrite/api'
import { getLandingPagePlaylist, getYoutubeSearchResults } from '../youtube/api'

import { QUERY_KEYS } from './queryKeys'

// export const useCreateUserAccount = () => {
//   return useMutation({
//     mutationFn: (user: INewUser) => createUserAccount(user),
//   })
// }

//?TEST_DRIVE_QUERY
export const useGetLandingPagePlaylist = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LANDING_PAGE_PLAYLIST],
    queryFn: () => getLandingPagePlaylist(),
    // staleTime: 60000 * 30,
    refetchOnWindowFocus: false,
  })
}

export const useGetYoutubeSearchResults = (
  searchTerm: string,
  searchTrigger: number
) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.GET_YOUTUBE_SEARCH_RESULTS,
      searchTerm,
      searchTrigger,
    ],
    enabled: !!searchTerm && searchTrigger > 0,
    queryFn: () => getYoutubeSearchResults(searchTerm),
  })
}

export const useAddLyricsToSong = () => {
  return useMutation({
    mutationFn: (lyricsFile: File) => addLyricsToSong(lyricsFile),
  })
}
