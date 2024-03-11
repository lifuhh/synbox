import {
  YoutubePlaylistApiResponse,
  YoutubePlaylistItem,
  YoutubeSearchApiResponse,
  YoutubeSearchItem,
  formattedSearchResult,
  formattedYoutubeVideoItemForCarousel,
} from '@/types'

import {
  japaneseToRomajiMap,
  romajiRegex,
  romajiToHiraganaMap,
} from './charactersMap'

import { isKanji, toHiragana, toRomaji } from 'wanakana'

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export function formatYoutubePlaylistResponse(
  data: YoutubePlaylistApiResponse
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
          true
        ),
        thumbnailUrl: item.snippet.thumbnails.high.url,
        videoId: item.snippet.resourceId?.videoId,
      }
    }
  )
  return items
}

export function formatYoutubeSearchResponse(
  data: YoutubeSearchApiResponse
): formattedSearchResult[] {
  const maxSearchResultsTitleLength = 22

  console.log('formatting search response')

  const items = data.items.map(
    (item: YoutubeSearchItem): formattedSearchResult => {
      return {
        title: trimLength(
          item.snippet.title,
          maxSearchResultsTitleLength,
          false
        ),
        channel: item.snippet.channelTitle,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        videoId: item.id.videoId,
      }
    }
  )

  console.log(items)

  return items
}

function trimLength(text: string, maxLength: number, trail: boolean) {
  const editedText =
    text.length > maxLength ? text.substring(0, maxLength) : text

  return trail ? editedText + '...' : editedText
}

//* Video Time Display Functions
export function formatTimeDisplay(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const remainingSeconds = seconds % 60
  const remainingMinutes = minutes % 60
  return `${hours ? `${hours}:` : ''}${pad(remainingMinutes)}:${pad(
    remainingSeconds
  )}`
}

function pad(string: number) {
  return ('0' + string).slice(-2)
}

//* LYRICS PROCESSING FUNCTIONS

//* Given '知りたいその秘密ミステリアス' and 'shiritai sono himitsu misuteriasu', returns the HTML for the lyrics w/ furigana
export function formatLyricsLineSrt(lyric: string, romaji: string) {
  let processedLyricsLine = ''
  const [cleansedLyric, type, specialChar] = lyricSpecialCharacterRemover(lyric)

  if (type === 2) {
    processedLyricsLine += '「'
  }

  const separatedLyrics =
    splitLyricsIntoChunksSeparatingKanjiWithoutRomaji(cleansedLyric)
  const kanjiRomajiMatch = kanjiToRomajiMatcher(
    Array.from(separatedLyrics),
    romaji
  )

  for (const lyricsChunk of separatedLyrics) {
    console.log('This is lyricsChunk: ' + lyricsChunk)
    if (!isKanji(lyricsChunk)) {
      processedLyricsLine += lyricsChunk
    } else {
      const kanjiMatchingHiragana = getCorrespondingHiraganaFromList(
        splitRomajiIntoSyllables(kanjiRomajiMatch[lyricsChunk])
      )

      processedLyricsLine += generateRubySnippet(
        lyricsChunk,
        kanjiMatchingHiragana
      )
    }
  }

  return processedLyricsLine + specialChar
}

//Type: 0 - normal, 1 - ending special, 2 - wrapped with 「」, 3 - ending with ...
function lyricSpecialCharacterRemover(lyric: string): [string, number, string] {
  // Test for '?' and '!'
  if (/\?$/.test(lyric) || /!$/.test(lyric)) {
    return [lyric.slice(0, -1), 1, lyric[lyric.length - 1]]
  }
  // Test for brackets
  if (/^「.*」$/.test(lyric)) {
    return [lyric.substring(1, lyric.length - 1), 2, '」']
  }

  const dotsMatch = lyric.match(/\.*$/)
  if (dotsMatch && dotsMatch[0].length > 0) {
    return [lyric.replace(/\.*$/, ''), 3, dotsMatch[0]] // Remove all trailing dots and return the matched dots
  }
  return [lyric, 0, '']
}

//* Given '知りたいその秘密ミステリアス', returns ["知", "りたいその", "秘密", "ミステリアス"]
function splitLyricsIntoChunksSeparatingKanjiWithoutRomaji(
  lyrics: string
): string[] {
  let charBuffer = ''
  let kanjiBuffer = ''
  const lyricsBlock = []

  for (const char of lyrics) {
    const charIsKanji = isKanji(char)

    if (charIsKanji) {
      if (charBuffer !== '') {
        lyricsBlock.push(charBuffer)
        charBuffer = ''
      }
      kanjiBuffer += char
    } else {
      if (kanjiBuffer !== '') {
        lyricsBlock.push(kanjiBuffer)
        kanjiBuffer = ''
      }
      charBuffer += char
    }
  }

  if (charBuffer !== '') {
    lyricsBlock.push(charBuffer)
  }
  if (kanjiBuffer !== '') {
    lyricsBlock.push(kanjiBuffer)
  }
  return lyricsBlock
}

//? UNUSED FOR NOW: Given '知りたいその秘密ミステリアス', returns ["知", "ritaisono", "秘密", "misuteriasu"]
// function splitLyricsIntoChunksSeparatingKanji(lyrics: string): string[] {

//   //* First change lyrics into romaji wherever applicable
//   const romajiLyrics = toRomaji(lyrics)

//   let charBuffer = ''
//   let kanjiBuffer = ''
//   const lyricsBlock = []

//   for (const char of romajiLyrics) {
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
//       charBuffer += char
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

//* Given ["知", "ritaisono", "秘密", "misuteriasu"] and "shiritai sonohimitsumisuteriasu", returns {知: "shi", 秘密: "himitsu"}
function kanjiToRomajiMatcher(
  lyrics: string[],
  romaji: string
): { [key: string]: string } {
  let nospaceRomaji = romaji.replace(/\s/g, '')

  const lyricsList = lyrics

  const kanjiRomajiMatch: { [key: string]: string } = {}

  while (lyricsList.length > 0) {
    const lyricsChunk = lyricsList.shift() as string

    if (isKanji(lyricsChunk)) {
      if (lyricsList.length >= 1) {
        // 1. Identify index of ending of kanji romaji
        const nextLyricsChunk = toRomaji(lyricsList[0])
        // 2. If current chunk is Kanji, next chunk can't be kanji
        const nextLyricsChunkRegex = new RegExp(nextLyricsChunk, 'i')
        const nextLyricsChunkIndex = nospaceRomaji.search(nextLyricsChunkRegex)
        const kanjiMatchedChunk = nospaceRomaji.slice(0, nextLyricsChunkIndex)
        kanjiRomajiMatch[lyricsChunk] = kanjiMatchedChunk
        // 3. Slice off the matched romaji from nospaceRomaji
        nospaceRomaji = nospaceRomaji.slice(nextLyricsChunkIndex)
      } else {
        // 2. If no more items in separatedLyrics, then the rest of the romaji is the romaji for the kanji
        if (!(lyricsChunk in kanjiRomajiMatch)) {
          kanjiRomajiMatch[lyricsChunk] = nospaceRomaji
        }
      }
    } else {
      // slice off length of romaji from romaji lyrics string
      const lyricsChunkRomaji = toRomaji(lyricsChunk)
      const lyricsChunkLength = lyricsChunkRomaji.length
      nospaceRomaji = nospaceRomaji.slice(lyricsChunkLength)
    }
  }
  return kanjiRomajiMatch
}

function generateRubySnippet(kanji: string, hiragana: string): string {
  if (hiragana == '') return kanji
  return `<ruby>${kanji}<rp>(</rp><rt>${hiragana}</rt><rp>)</rp></ruby>`
}

//* Given "himitsu", returns ["hi", "mi", "tsu"]
function splitRomajiIntoSyllables(romaji: string): string[] {
  const syllables = []
  let match

  while ((match = romajiRegex.exec(romaji)) !== null) {
    syllables.push(match[0])
  }
  // Concatenate syllables and compare the length with the original Romaji
  const concatenatedSyllables = syllables.join('')
  if (concatenatedSyllables.length + 1 === romaji.length) {
    // Find the position of the doubled consonant in the original Romaji
    for (let i = 0; i < romaji.length - 1; i++) {
      if (romaji[i] === romaji[i + 1]) {
        // Find the corresponding position in the syllables list
        let syllableLength = 0
        for (let j = 0; j < syllables.length; j++) {
          syllableLength += syllables[j].length
          if (syllableLength >= i) {
            syllables.splice(j + 1, 0, '-')
            break
          }
        }
        break
      }
    }
  }
  return syllables
}

function getCorrespondingHiraganaFromList(romajiList: string[]): string {
  let hiragana = ''
  for (const romaji of romajiList) {
    hiragana += getCorrespondingHiragana(romaji)
  }
  return hiragana
}

//* Given "hi", returns "ひ"
function getCorrespondingHiragana(romaji: string): string {
  return romajiToHiraganaMap[romaji]
}

//? Don't think need this actually but whatever
//* Given "ひ", returns "hi"
function getCorrespondingRomaji(characters: string): string {
  return japaneseToRomajiMap[characters]
}
