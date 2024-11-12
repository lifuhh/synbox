import { CurrentPlayingInfo } from '@/types'
import { createAppwriteIdFromYoutubeId } from '@/utils'
import { ID, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases, storage } from './config'

//TODO: Experimental - doesnt work - to be implemented
export async function signInGoogleAccount() {
  try {
    const session = await account.createOAuth2Session(
      'google',
      'http://localhost:5173/',
      'http://localhost:5173/fail',
    )
    // console.log('Logged In!')

    return session
  } catch (error) {
    // console.log(error)
  }
}

export async function addSongInfoBySongId(songInfo: CurrentPlayingInfo) {
  const { videoId, title, author, thumbnailUrl } = songInfo

  try {
    // Convert YouTube ID to Appwrite-compatible ID for storage
    const appwriteId = createAppwriteIdFromYoutubeId(videoId)

    const songInfoUpload = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.songInfoId,
      appwriteId,
      {
        title,
        author,
        thumbnailUrl,
      },
    )
    return songInfoUpload
  } catch (error) {
    console.log("Add Song Info Error: ", error)
  }
}

export async function getSongInfoBySongId(
  songId: string,
): Promise<CurrentPlayingInfo | null> {
  if (!songId) throw Error('No Song Id!')

  try {
    // Convert YouTube ID to Appwrite-compatible ID for querying
    const appwriteId = createAppwriteIdFromYoutubeId(songId)

    const songInfo = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.songInfoId,
      appwriteId,
    )

    if (!songInfo) throw Error('No song info found')

    // Always return the original YouTube ID for frontend use
    const result = {
      videoId: songId, // Use original YouTube ID
      title: songInfo.title,
      author: songInfo.author,
      thumbnailUrl: songInfo.thumbnailUrl,
    }

    return result
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'No Song Info found.') {
        return null
      } else {
        console.error('API Error: ', error)
        throw error
      }
    } else {
      console.error('An unexpected error occurred of unknown type:', error)
      throw new Error('An unknown error occurred')
    }
  }
}

export async function getSongLyricsById(songId: string) {
  if (!songId) throw Error('No songId given')

  try {
    // Convert YouTube ID to Appwrite-compatible ID for querying
    const appwriteId = createAppwriteIdFromYoutubeId(songId)
    // console.log('Querying Appwrite with ID:', appwriteId)

    const lyrics = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.lyricsId,
      appwriteId,
    )

    if (!lyrics) return Error('No lyrics found')

    // Convert any encoded IDs back to YouTube format in the response
    return {
      ...lyrics,
      videoId: songId // Ensure we return the original YouTube ID
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'No Lyrics Found') {
        return null
      } else {
        console.error('API Error: ', error)
        throw error
      }
    } else {
      console.error('An unexpected error occurred of unknown type:', error)
      throw new Error('An unknown error occurred')
    }
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get()

    // const currentUser = await databases.listDocuments(
    //   appwriteConfig.databaseId,
    //   appwriteConfig.userCollectionId,
    //   [Query.equal('accountId', currentAccount.$id)]
    // )

    if (!currentAccount) throw Error('No user found')

    // return currentUser.documents[0]
    return currentAccount

    //
  } catch (error) {
    // console.log(error)
  }
}

// ROUGH SKETCH OF FUNCTION
export async function addLyricsToSong(lyricsFile: File) {
  //* Validate file successfully parsed
  if (!lyricsFile) throw Error('No file found')

  try {
    const uploadedLyricsFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      lyricsFile,
    )
    return uploadedLyricsFile
  } catch (error) {
    // console.log(error)
  }
}

interface LyricsDataInterface {
  full_lyrics: string
  plain_lyrics: string
  romaji: string
  eng_translation: string
  chi_translation: string
  labelled_full_lyrics: string
}

export async function uploadLyricsToAppwrite(
  songId: string,
  lyrics: LyricsDataInterface,
) {
  if (!songId) throw Error('No songId found')

  // console.log('Lyrics received')
  // console.log(lyrics)

  try {
    // Convert YouTube ID to Appwrite-compatible ID
    const appwriteId = createAppwriteIdFromYoutubeId(songId)

    const uploadedLyrics = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.lyricsId,
      appwriteId,
      { 
        ...lyrics, 
        visit_count: 0,
      },
    )

    if (!uploadedLyrics) throw Error('Lyrics not uploaded successfully')

    return uploadedLyrics
  } catch (error) {
    console.log("Lyrics Upload Error: ", error)
    throw error
  }
}
