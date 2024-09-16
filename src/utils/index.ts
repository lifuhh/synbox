import {
  FormatYoutubeResponseFunction,
  InfiniteGalleryVideoItem,
  UploadedSrtLine,
  YoutubePlaylistApiResponse,
  YoutubePlaylistItem,
  YoutubeSearchApiResponse,
  YoutubeSearchItem,
  formattedSearchResult,
  formattedYoutubeVideoItemForCarousel,
} from '@/types'

import {
  // japaneseToRomajiMap,
  romajiRegex,
  romajiToHiraganaMap,
} from './charactersMap'

import { isKanji, toRomaji } from 'wanakana'

// ? Function to shuffle array randomly
export const shuffleArray = (array: unknown[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const handleRedirect = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

export const validateJSON = (text: string) => {
  try {
    JSON.parse(text)
    return true
  } catch (error) {
    return false
  }
}

// ? Function to trim long text into "..." if longer than given maxLength
export function trimLength(text: string, maxLength: number, trail: boolean) {
  const tooLong = text.length > maxLength

  const editedText = tooLong ? text.substring(0, maxLength) : text

  return trail ? (tooLong ? editedText + '...' : editedText) : editedText
}

//?Function to display time properly for Video Time Display
export function formatTimeDisplay(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const remainingSeconds = seconds % 60
  const remainingMinutes = minutes % 60
  return `${hours ? `${hours}:` : ''}${pad(remainingMinutes)}:${pad(
    remainingSeconds,
  )}`
}

// ? Helper function to pad 0 in front of time when single digit numbers appear
function pad(string: number) {
  return ('0' + string).slice(-2)
}

// ? Function to convert uploaded File to URL - for file uploads
export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

// ? Youtube helper functions

export function formatYoutubeChartsResponse(
  data: YoutubePlaylistApiResponse,
): { title: string; id: string }[] {
  const items = data.items.map(
    (item: YoutubePlaylistItem): { title: string; id: string } => {
      return {
        title: item.snippet.title,
        id: item.snippet.resourceId?.videoId,
      }
    },
  )

  return items
}

export function formatYoutubePlaylistResponse(
  data: YoutubePlaylistApiResponse,
): formattedYoutubeVideoItemForCarousel[] {
  const items = data.items.map(
    (item: YoutubePlaylistItem): formattedYoutubeVideoItemForCarousel => {
      const maxDescriptionLength = 80

      return {
        title: item.snippet.title,
        channel: item.snippet.videoOwnerChannelTitle || 'Unknown',
        description: trimLength(
          item.snippet.description,
          maxDescriptionLength,
          true,
        ),
        thumbnailUrl: item.snippet.thumbnails.high.url,
        videoId: item.snippet.resourceId?.videoId,
      }
    },
  )

  const shuffledResults = shuffleArray(
    items,
  ) as formattedYoutubeVideoItemForCarousel[]

  return shuffledResults.slice(0, 20)
}

export const formatYoutubeInfiniteGalleryResponse: FormatYoutubeResponseFunction =
  (data: YoutubePlaylistApiResponse): InfiniteGalleryVideoItem[] => {
    const items = data.items.map((item): InfiniteGalleryVideoItem => {
      const maxDescriptionLength = 80

      return {
        title: item.snippet.title,
        channel: item.snippet.videoOwnerChannelTitle || 'Unknown',
        description: trimLength(
          item.snippet.description,
          maxDescriptionLength,
          true,
        ),
        thumbnailUrl: item.snippet.thumbnails.high.url,
        videoId: item.snippet.resourceId?.videoId || '',
      }
    })

    return items
  }

export function formatYoutubeSearchResponse(
  data: YoutubeSearchApiResponse,
): formattedSearchResult[] {
  const maxSearchResultsTitleLength = 22

  const items = data.items.map(
    (item: YoutubeSearchItem): formattedSearchResult => {
      return {
        title: trimLength(
          item.snippet.title,
          maxSearchResultsTitleLength,
          false,
        ),
        channel: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails?.default.url || '',
        videoId: typeof item.id === 'string' ? item.id : item.id.videoId,
      }
    },
  )

  return items
}

//? Converts "PT3M40S" to "03:40"
export function formatDuration(duration: string): string {
  if (!duration) return '-00:01'

  if (typeof duration === 'string' && duration.startsWith('PT')) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)

    if (match) {
      const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0
      const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0
      const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0

      const paddedMinutes = minutes.toString().padStart(2, '0')
      const paddedSeconds = seconds.toString().padStart(2, '0')

      if (hours > 0) {
        const paddedHours = hours.toString().padStart(2, '0')
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
      } else {
        return `${paddedMinutes}:${paddedSeconds}`
      }
    } else {
      return '-00:01'
    }
  } else {
    const totalSeconds =
      typeof duration === 'number' ? duration : parseInt(duration)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const paddedMinutes = minutes.toString().padStart(2, '0')
    const paddedSeconds = seconds.toString().padStart(2, '0')

    if (hours > 0) {
      const paddedHours = hours.toString().padStart(2, '0')
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    } else {
      return `${paddedMinutes}:${paddedSeconds}`
    }
  }
}

export function formatCountToString(count: number | string): string {
  if (!count) return '-1'

  if (typeof count === 'string') {
    count = parseInt(count)
  }

  // Convert "752531" to "752K"
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  } else {
    return count.toString()
  }
}

export const extractVideoId = (input: string): string | null => {
  // Check if the input is already a valid 11-character video ID
  if (/^[\w-]{11}$/.test(input)) {
    return input
  }

  // Regular expression for finding a YouTube video ID in various URL formats
  const videoIdPattern =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]{11})/

  // If the URL doesn't start with 'http://' or 'https://', prepend 'https://'
  const fullUrl =
    input.startsWith('http://') || input.startsWith('https://')
      ? input
      : `https://${input}`

  try {
    const match = fullUrl.match(videoIdPattern)
    if (match && match[1]) {
      return match[1]
    }

    // If no match found using regex, try parsing as URL
    const parsedUrl = new URL(fullUrl)
    const videoId = parsedUrl.searchParams.get('v')
    if (videoId && videoId.length === 11) {
      return videoId
    }
  } catch (error) {
    console.error('Error parsing YouTube URL:', error)
  }

  return null
}

export const createAppwriteIdFromYoutubeId = (id: string): string => {
  if (validateYoutubeIdForAppwrite(id)) {
    return id
  }
  return encodeYoutubeIdForAppwrite(id)
}

export const getYouTubeIdFromAppwriteId = (appwriteId: string): string => {
  if (appwriteId.startsWith('yt_')) {
    return decodeYoutubeIdForAppwrite(appwriteId)
  }
  return appwriteId
}

const validateYoutubeIdForAppwrite = (id: string): boolean => {
  const validChars = /^[a-zA-Z0-9_]{1,36}$/
  return validChars.test(id) && !id.startsWith('_')
}

const encodeYoutubeIdForAppwrite = (id: string): string => {
  const prefix = 'yt_'
  const encodedId = btoa(id)
  return `${prefix}${encodedId}`
}

const decodeYoutubeIdForAppwrite = (id: string): string => {
  const prefix = 'yt_'
  if (id.startsWith(prefix)) {
    const encodedPart = id.slice(prefix.length)
    return atob(encodedPart)
  }
  throw new Error('Invalid encoded ID format')
}

export const delayApiResponse = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

//! Everything below is Deprecated >>>

// ! Deprecated - Old LYRICS PROCESSING FUNCTIONS
//? This is the core processing function
//* Given '知りたいその秘密ミステリアス' and 'shiritai sono himitsu misuteriasu', returns the HTML for the lyrics w/ furigana
// export function formatLyricsLineSrt(lyric: string, romaji: string) {
//   //? Generates ["出会", "、", "い", "共", "「", "に", "過", "ごし", "」", "てき", "、", "日々"]
//   const separatedLyrics =
//     splitLyricsIntoChunksSeparatingKanjiWithoutRomaji(lyric)

//   //? Generates [ ["知", "shi"], ["秘密", "himitsu"] ]
//   const kanjiRomajiMatches = kanjiToRomajiMatcher(
//     Array.from(separatedLyrics),
//     romaji,
//   )

//   let finalProcessedLyricsLine = ''

//   for (const chunk of separatedLyrics) {
//     if (!isKanji(chunk)) {
//       finalProcessedLyricsLine += chunk
//     } else {
//       if (kanjiRomajiMatches.length > 0) {
//         const [kanji, romaji] = kanjiRomajiMatches.shift() as [string, string]

//         let hiraganaOfKanji

//         if (romaji.includes('EDITME_')) {
//           hiraganaOfKanji = getCorrespondingHiraganaFromList(
//             splitRomajiIntoSyllables(romaji.split('EDITME_')[1].toLowerCase()),
//           )
//           finalProcessedLyricsLine += generateRubySnippet(
//             kanji,
//             hiraganaOfKanji,
//             true,
//           )
//         } else {
//           hiraganaOfKanji = getCorrespondingHiraganaFromList(
//             splitRomajiIntoSyllables(romaji.toLowerCase()),
//           )
//           finalProcessedLyricsLine += generateRubySnippet(
//             kanji,
//             hiraganaOfKanji,
//             false,
//           )
//         }
//       } else {
//         finalProcessedLyricsLine += generateRubySnippet(chunk, 'FIXME', true)
//       }
//     }
//   }
//   return finalProcessedLyricsLine
// }

// //* Given '出会い、共「に過ごし」てき、日々', returns ["出会", "、", "い", "共", "「", "に", "過", "ごし", "」", "てき", "、", "日々"]
// function splitLyricsIntoChunksSeparatingKanjiWithoutRomaji(
//   lyrics: string,
// ): string[] {
//   let charBuffer = ''
//   let kanjiBuffer = ''
//   const lyricsBlock = []

//   for (const char of lyrics) {
//     const charIsKanji = isKanji(char)

//     if (charIsKanji) {
//       if (charBuffer !== '') {
//         lyricsBlock.push(charBuffer)
//         charBuffer = ''
//       }
//       kanjiBuffer += char
//     } else {
//       if (kanjiBuffer !== '') {
//         lyricsBlock.push(kanjiBuffer)
//         kanjiBuffer = ''
//       }
//       if (isJapSpecialCharacter(char)) {
//         if (charBuffer !== '') {
//           lyricsBlock.push(charBuffer)
//           charBuffer = ''
//         }
//         lyricsBlock.push(char)
//       } else {
//         charBuffer += char
//       }
//     }
//   }

//   if (charBuffer !== '') {
//     lyricsBlock.push(charBuffer)
//   }
//   if (kanjiBuffer !== '') {
//     lyricsBlock.push(kanjiBuffer)
//   }
//   return lyricsBlock
// }

// //? Given ["出会", "、", "い", "共", "「", "に", "過", "ごし", "」", "てき", "、", "日々"] and romaji "deai itomo ni sugoshi teki hibi", returns [ ["出会", "deai"], ["共", "tomo"] ]
// function kanjiToRomajiMatcher(
//   lyrics: string[],
//   romaji: string,
// ): [string, string][] {
//   let nospaceRomaji = romaji.replace(/\s/g, '')
//   // console.log('This is lyrics List')
//   // console.log(lyrics)
//   // console.log('This is nospace romaji: ')
//   // console.log(nospaceRomaji)

//   const lyricsList = lyrics

//   const kanjiRomajiMatches: [string, string][] = []

//   while (lyricsList.length > 0) {
//     const lyricsChunk = lyricsList.shift() as string

//     if (isJapSpecialCharacter(lyricsChunk)) {
//       continue
//     }

//     //! If chunk IS kanji
//     if (isKanji(lyricsChunk)) {
//       // console.log('This is kanji chunk: ' + lyricsChunk)

//       if (lyricsList.length >= 1) {
//         let nextLyricsText = lyricsList[0]

//         while (isJapSpecialCharacter(nextLyricsText)) {
//           lyricsList.shift()
//           if (lyricsList.length === 0) {
//             nextLyricsText = 'END'
//           } else {
//             nextLyricsText = lyricsList[0]
//           }
//         }

//         const nextAllKanjiBuffer = []
//         //! Special processing - if situation is kanji + specialcharacter + kanji + kanji + nonkanji e.g. '今、静かな夜の中で'
//         if (isKanji(nextLyricsText)) {
//           nextAllKanjiBuffer.push(lyricsChunk)
//           //? After exiting this loop, nextLyricsText is either non-Kanji or "FIXME"
//           while (isKanji(nextLyricsText)) {
//             const nextImmediateKanji = lyricsList.shift() as string
//             nextAllKanjiBuffer.push(nextImmediateKanji)
//             if (lyricsList.length === 0) {
//               nextLyricsText = 'END_FIXME'
//             }
//             nextLyricsText = lyricsList[0]
//           }
//         }

//         //* Possible situations
//         //* 1. All normal, nextLyricsText is non-Kanji, nextAllKanjiBuffer is empty
//         //* 2. nextLyricsText = 'END', nextAllKanjiBuffer is empty, means only left with 1 kanji to match with remaining romaji
//         //* 3. nextLyricsText = 'END_FIXME', nextAllKanjiBuffer has kanji, means theres bunch of kanji to fix matching with remaining romaji
//         //* 4. nextAllKanjiBuffer has kanji, nextLyricsText is non-kanji, means theres a bunch of kanji to be matched with some romaji slice

//         if (nextLyricsText === 'END') {
//           //* Process case 2
//           if (nospaceRomaji.length == 0) {
//             kanjiRomajiMatches.push([lyricsChunk, 'EDITME_'])
//             continue
//           } else {
//             kanjiRomajiMatches.push([lyricsChunk, nospaceRomaji])
//           }
//         }
//         if (nextLyricsText === 'END_FIXME') {
//           //* Process case 3
//           for (const kanji of nextAllKanjiBuffer) {
//             if (nospaceRomaji.length == 0) {
//               kanjiRomajiMatches.push([kanji, 'EDITME_'])
//               continue
//             } else {
//               kanjiRomajiMatches.push([kanji, 'EDITME_' + nospaceRomaji])
//             }
//           }
//           if (nospaceRomaji.length == 0) continue
//         }

//         //* Process case 1 and 4
//         const nextLyricsChunkRomaji = adjustPronunciationInRomaji(
//           toRomaji(nextLyricsText),
//         )

//         // console.log('This is next lyrics chunk: ' + nextLyricsChunkRomaji)

//         const nextLyricsChunkRomajiRegex = new RegExp(
//           nextLyricsChunkRomaji,
//           'i',
//         )

//         const match = nospaceRomaji.match(nextLyricsChunkRomajiRegex)

//         if (match && match.index !== undefined) {
//           let nextLyricsChunkRomajiIndex = match.index

//           const repeatedSyllableMatch = nospaceRomaji
//             .slice(nextLyricsChunkRomajiIndex)
//             .match(/^(\w+)\1/)
//           if (repeatedSyllableMatch) {
//             nextLyricsChunkRomajiIndex += repeatedSyllableMatch[0].length / 2 // Adjust to include the first instance of the repeated syllable if any
//           }

//           const kanjiMatchedRomajiChunk = nospaceRomaji.slice(
//             0,
//             nextLyricsChunkRomajiIndex,
//           )

//           // console.log('IMPORTANT')
//           // console.log('This is kanji matched chunk: ' + kanjiMatchedRomajiChunk)

//           // let nextLyricsChunkRomajiIndex = nospaceRomaji.search(
//           //   nextLyricsChunkRomajiRegex
//           // )

//           // const repeatedSyllableMatch = nospaceRomaji
//           //   .slice(nextLyricsChunkRomajiIndex)
//           //   .match(/^(\w+)\1/)
//           // if (repeatedSyllableMatch) {
//           //   nextLyricsChunkRomajiIndex += repeatedSyllableMatch[0].length / 2 // Adjust to include the first instance of the repeated syllable if any
//           // }

//           // const kanjiMatchedRomajiChunk = nospaceRomaji.slice(
//           //   0,
//           //   nextLyricsChunkRomajiIndex
//           // )

//           // console.log('IMPORTANT')
//           // console.log('This is kanji matched chunk: ' + kanjiMatchedRomajiChunk)

//           if (nextAllKanjiBuffer.length > 0) {
//             for (const kanji of nextAllKanjiBuffer) {
//               kanjiRomajiMatches.push([
//                 kanji,
//                 'EDITME_' + kanjiMatchedRomajiChunk,
//               ])
//             }
//           } else {
//             kanjiRomajiMatches.push([lyricsChunk, kanjiMatchedRomajiChunk])
//           }

//           // 3. Slice off the matched romaji from nospaceRomaji
//           nospaceRomaji = nospaceRomaji.slice(nextLyricsChunkRomajiIndex)
//           // console.log(
//           // 'This is post processing nospace romaji: ' + nospaceRomaji,
//           // )
//         }
//       } else {
//         // 2. If no more items in separatedLyrics, then the rest of the romaji is the romaji for the kanji
//         if (nospaceRomaji.length == 0) {
//           kanjiRomajiMatches.push([lyricsChunk, 'EDITME_'])
//         } else {
//           kanjiRomajiMatches.push([lyricsChunk, nospaceRomaji])
//         }
//       }
//       //! if chunk is NOT kanji
//     } else {
//       // slice off length of romaji from romaji lyrics string
//       const lyricsChunkRomaji = toRomaji(lyricsChunk)
//       const lyricsChunkLength = lyricsChunkRomaji.length
//       nospaceRomaji = nospaceRomaji.slice(lyricsChunkLength)
//     }
//   }

//   // console.log('This is kanji romaji match')
//   // kanjiRomajiMatches.forEach((subArray) => {
//   // console.log(subArray)
//   // })
//   return kanjiRomajiMatches
// }

// function adjustPronunciationInRomaji(romajiSubstring: string): string {
//   // Replace "ha" with a regex pattern that matches both "ha" and "wa"
//   let adjustedRomaji = romajiSubstring.replace(/ha/gi, '(ha|wa)')

//   // Similarly for "he" to match "he" or "e", and "wo" to match "wo" or "o"
//   adjustedRomaji = adjustedRomaji.replace(/he/gi, '(he|e)')
//   adjustedRomaji = adjustedRomaji.replace(/wo/gi, '(wo|o)')

//   return adjustedRomaji
// }

// function generateRubySnippet(
//   kanji: string,
//   hiragana: string,
//   error: boolean,
// ): string {
//   if (error) {
//     return `<ruby>${kanji}<rp>(</rp><rt>EDITME: ${hiragana}</rt><rp>)</rp></ruby>`
//   }
//   if (hiragana == '')
//     return `<ruby>${kanji}<rp>(</rp><rt>EDITME</rt><rp>)</rp></ruby>`
//   return `<ruby>${kanji}<rp>(</rp><rt>${hiragana}</rt><rp>)</rp></ruby>`
// }

// //* Given "himitsu", returns ["hi", "mi", "tsu"]
// function splitRomajiIntoSyllables(romaji: string): string[] {
//   const syllables = []
//   let match

//   while ((match = romajiRegex.exec(romaji)) !== null) {
//     syllables.push(match[0])
//   }
//   // Concatenate syllables and compare the length with the original Romaji
//   const concatenatedSyllables = syllables.join('')
//   if (concatenatedSyllables.length + 1 === romaji.length) {
//     // Find the position of the doubled consonant in the original Romaji
//     for (let i = 0; i < romaji.length - 1; i++) {
//       if (romaji[i] === romaji[i + 1]) {
//         // Find the corresponding position in the syllables list
//         let syllableLength = 0
//         for (let j = 0; j < syllables.length; j++) {
//           syllableLength += syllables[j].length
//           if (syllableLength >= i) {
//             syllables.splice(j + 1, 0, '-')
//             break
//           }
//         }
//         break
//       }
//     }
//   }
//   return syllables
// }

// function getCorrespondingHiraganaFromList(romajiList: string[]): string {
//   let hiragana = ''
//   for (const romaji of romajiList) {
//     hiragana += getCorrespondingHiragana(romaji)
//   }
//   return hiragana
// }

// //* Given "hi", returns "ひ"
// function getCorrespondingHiragana(romaji: string): string {
//   return romajiToHiraganaMap[romaji]
// }

// //? Don't think need this actually but whatever
// //* Given "ひ", returns "hi"
// // function getCorrespondingRomaji(characters: string): string {
// //   return japaneseToRomajiMap[characters]
// // }

// //* wanakana's isKanji will mark all these as false
// function isJapSpecialCharacter(char: string): boolean {
//   return (
//     char === '、' ||
//     char === '。' ||
//     char === '「' ||
//     char === '」' ||
//     char === '？' ||
//     char === '！' ||
//     char === ' ' ||
//     char === '『' ||
//     char === '』'
//   )
// }

// //? Deprecated - Lyrics Dropzone Helpers
// //! Stage One - parse Srt File into array of
// //! { index: number, startTime: string, endTime: string, text: string }
// export function parseSrt(srt: string): UploadedSrtLine[] {
//   const subtitleBlocks = srt.trim().split(/\n\s*\n/)
//   const subtitles = subtitleBlocks.map((subtitleBlock, index) => {
//     // eslint-disable-next-line prefer-const
//     let [timeString, ...textLines] = subtitleBlock.split('\n')
//     timeString = textLines[0]
//     textLines.shift() // remove index
//     const [startTime, endTime] = timeString.split(' --> ')
//     const text = textLines
//       .join('\n')
//       .replace(/<[^>]*>/g, '')
//       .replace(/\{.*?\}/g, '')
//     return {
//       index,
//       startTime,
//       endTime,
//       text,
//     }
//   })
//   return subtitles
// }

// //! Stage One - parse Romaji File into array of strings
// export function parseRomajiFile(fileContent: string): string[] {
//   const lines = fileContent.split(/\r\n|\n/) // Split by newline characters to get lines
//   const nonEmptyLines = lines.filter((line) => line.trim() !== '') // Filter out empty lines

//   return nonEmptyLines
// }

// export function stageThreeKanjiPairExtractor(allLyrics: string[]): {
//   [key: string]: [string, string, number]
// } {
//   const kanjiPairs: {
//     [key: string]: [string, string, number]
//   } = {}
//   let uniqueId = 500

//   const pattern = /<ruby>(.*?)<rp>\(<\/rp><rt>(.*?)<\/rt><rp>\)<\/rp><\/ruby>/g

//   let match

//   for (let i = 0; i < allLyrics.length; i++) {
//     const currentLine = allLyrics[i]

//     while ((match = pattern.exec(currentLine)) !== null) {
//       // match[1] will contain the kanji part, match[2] will contain the hiragana part
//       let key = `${currentLine}___${i}`
//       if (key in kanjiPairs) {
//         key += uniqueId
//         uniqueId++
//       }
//       kanjiPairs[key] = [match[1], match[2], i]
//     }
//   }

//   return kanjiPairs
// }

// export function stageThreeKeyExtractor(key: string): string {
//   const parts = key.split('___')
//   return parts[0]
// }
