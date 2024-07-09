import { ID, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases, storage } from './config'

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

export async function getSongLyricsById(songId: string) {
  if (!songId) throw Error('No songId found')

  try {
    const songLyrics = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.lyricsId,
      songId,
    )

    if (!songLyrics) throw Error('No lyrics found')

    return songLyrics
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

//! export async function createPost(post: INewPost) {
//   try {
//     // Upload file to appwrite storage
//     const uploadedFile = await uploadFile(post.file[0])

//     if (!uploadedFile) throw Error

//     // Get file url
//     const fileUrl = getFilePreview(uploadedFile.$id)
//     if (!fileUrl) {
//       console.log('Deleting file cuz fileUrl issue')
//       await deleteFile(uploadedFile.$id)
//       throw Error
//     }

//     // Convert tags into array - replace all empty strings with '' and split by comma
//     const tags = post.tags?.replace(/ /g, '').split(',') || []

//     // Create post
//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.postCollectionId,
//       ID.unique(),
//       {
//         creator: post.userId,
//         caption: post.caption,
//         imageUrl: fileUrl,
//         imageId: uploadedFile.$id,
//         location: post.location,
//         tags: tags,
//       }
//     )

//     if (!newPost) {
//       await deleteFile(uploadedFile.$id)
//       throw Error
//     }

//     return newPost
//   } catch (error) {
//     console.log(error)
//   }
// }

//! export async function uploadFile(file: File) {
//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       file
//     )

//     return uploadedFile
//   } catch (error) {
//     console.log(error)
//   }
// }
