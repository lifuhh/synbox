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
    console.log('Logged In!')

    return session
  } catch (error) {
    console.log(error)
  }
}

export async function getSongLyricsById(songId: string) {
  if (!songId) throw Error('No songId given')

  try {
    const lyrics = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.lyricsId,
      songId,
    )

    if (!lyrics) return Error('No video Id given')

    // ? logger for debugging lyrics
    // if (lyrics) {
    //   console.log('Lyrics Found')
    //   console.log(typeof lyrics)
    //   console.log(typeof lyrics.full_lyrics)
    //   console.log(lyrics.full_lyrics)
    // }

    return lyrics
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === 'Document with the requested ID could not be found.'
      ) {
        return null
      } else {
        console.error('An unexpected error occurred: ', error)
        throw error
      }
    } else {
      // Handle the case where error is not an Error object
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
    console.log(error)
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
    console.log(error)
  }
}

interface HardCodedLyricsData {
  full_lyrics: string
  plain_lyrics: string
  romaji: string
  eng_translation: string
  chi_translation: string
  labelled_full_lyrics: string
}

export async function uploadHardCodedLyrics(
  songId: string,
  lyrics: HardCodedLyricsData,
) {
  if (!songId) throw Error('No songId found')

  console.log('Lyrics received')
  console.log(lyrics)

  try {
    const uploadHardCodedLyrics = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.lyricsId,
      songId,
      { ...lyrics, visit_count: 0 },
    )

    if (!uploadHardCodedLyrics) throw Error('Lyrics not uploaded successfully')

    return uploadHardCodedLyrics
  } catch (error) {
    console.log(error)
  }
}
