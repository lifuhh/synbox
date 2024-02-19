import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { addLyricsToSong } from '../appwrite/api'
import { getLandingPagePlaylist } from '../youtube/api'

import { QUERY_KEYS } from './queryKeys'

// export const useCreateUserAccount = () => {
//   return useMutation({
//     mutationFn: (user: INewUser) => createUserAccount(user),
//   })
// }

//?TEST_DRIVE_QUERY
export const useGetLandingPagePlaylist = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_LANDING_PAGE_PLAYLIST, searchTerm],
    enabled: !!searchTerm,
    queryFn: () => getLandingPagePlaylist(searchTerm),
  })
}

export const useAddLyricsToSong = () => {
  return useMutation({
    mutationFn: (lyricsFile: File) => addLyricsToSong(lyricsFile),
  })
}
