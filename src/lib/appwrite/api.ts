import { ID, Query } from 'appwrite'
import { account, appwriteConfig, avatars, databases, storage } from './config'


// ROUGH SKETCH OF FUNCTION
export async function addLyricsToSong(lyricsFile: File) {

  //* Validate file successfully parsed
  if(!lyricsFile) throw Error('No file found')



  try {
    const uploadedLyricsFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      lyricsFile
    )
    return uploadedLyricsFile
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