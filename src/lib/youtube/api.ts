import {
  YoutubePlaylistApiResponse,
  YoutubeSearchApiResponse,
  YoutubeSearchItem,
  YoutubeSearchResultInfo,
  formattedSearchResult,
  formattedYoutubeVideoItemForCarousel,
} from '@/types'
import {
  formatYoutubePlaylistResponse,
  formatYoutubeSearchResponse,
} from '@/utils'
import axios from 'axios'

const YoutubeApiKey = import.meta.env.VITE_GOOGLE_API_KEY

//?TEST_DRIVE_QUERY

export async function getSongInfoById(
  videoId: string,
): Promise<YoutubeSearchItem> {
  const response = await axios.get<YoutubeSearchItem>(
    `https://www.googleapis.com/youtube/v3/videos`,
    {
      //TODO: check params and types of this req
      params: {
        key: YoutubeApiKey,
        part: ['snippet', 'statistics', 'contentDetails'],
        id: videoId,
      },
    },
  )

  if (!response) throw new Error('Failed to fetch vid details')

  // TODO: write a formatter for this req
  // const formattedResponse =

  return {
    kind: '',
    etag: '',
    id: {
      kind: '',
      videoId: '',
    },
    snippet: {
      publishedAt: '',
      channelId: '',
      title: '',
      description: '',
      thumbnails: undefined,
      channelTitle: '',
      liveBroadcastContent: '',
      publishTime: '',
    },
  }
}

export async function getLandingPagePlaylist(): Promise<
  formattedYoutubeVideoItemForCarousel[]
> {
  // console.log('fetching landing page playlist')

  const response = await axios.get<YoutubePlaylistApiResponse>(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        key: YoutubeApiKey,
        part: 'snippet',
        playlistId: 'PLzJ1mqwxogpFuFCk1YfUE1c0gWtnIutfz',
        maxResults: 50,
      },
    },
  )

  if (!response) throw new Error('Failed to fetch playlist items')

  const processedResponse = formatYoutubePlaylistResponse(response.data)
  // console.log('Successfully fetched response')
  // console.log(processedResponse)

  return processedResponse
}

export async function getYoutubeVideoInfo(
  videoId: string,
): Promise<YoutubeSearchResultInfo> {
  console.log('YT API: Getting info for vid id: ' + videoId)

  const response = await axios.get<YoutubeSearchApiResponse>(
    `https://www.googleapis.com/youtube/v3/videos`,
    {
      params: {
        key: YoutubeApiKey,
        part: 'snippet,statistics,contentDetails',
        id: videoId,
      },
    },
  )

  if (!response) throw new Error('Failed to fetch video info')

  const songResults = response.data.items

  if (songResults.length === 0) {
    throw new Error('No video found for this video ID')
  }

  const songInfo = songResults[0]
  const songData = {
    id: songInfo.id,
    title: songInfo.snippet.title,
    channelTitle: songInfo.snippet.channelTitle,
    description: songInfo.snippet.description,
    tags: songInfo.snippet.tags || [],
    defaultAudioLanguage: songInfo.snippet.defaultAudioLanguage || '',
    thumbnail: getHighestResThumbnail(songInfo.snippet.thumbnails),
    duration: songInfo.contentDetails.duration,
    statistics: songInfo.statistics,
  }

  console.log('Song Data received from youtube')
  console.log(songData)

  return songData
}

export async function getYoutubeSearchResults(
  searchTerm: string,
): Promise<formattedSearchResult[]> {
  // console.log('fetching search results for ' + searchTerm)

  //! Search Replacement
  const response = tempData

  // const response = await axios.get<YoutubeApiResponse>(
  //   `https://www.googleapis.com/youtube/v3/search`,
  //   {
  //     params: {
  //       key: YoutubeApiKey,
  //       part: 'snippet',
  //       q: searchTerm,
  //       type: 'video',
  //       videoEmbeddable: 'true',
  //       safeSearch: 'none',
  //       regionCode: 'JP',
  //       order: 'relevance',
  //       maxResults: 10,
  //     },
  //   }
  // )

  // console.log(response)

  if (!response) throw new Error('Failed to fetch search results')

  const processedResponse = formatYoutubeSearchResponse(response)
  // const processedResponse = formatYoutubeSearchResponse(response.data)

  // console.log('response finished processing')
  // console.log(processedResponse)

  return processedResponse
}

function getHighestResThumbnail(thumbnails: any) {
  const resolutionOrder = ['maxres', 'standard', 'high', 'medium', 'default']

  for (const res of resolutionOrder) {
    if (thumbnails[res] && thumbnails[res].url) {
      return thumbnails[res].url
    }
  }

  // If no thumbnail is found, return a default or placeholder URL
  return 'https://example.com/placeholder-thumbnail.jpg'
}

const tempData: YoutubeSearchApiResponse = {
  kind: 'youtube#searchListResponse',
  etag: 'wVO2QKutHC_Mw8_7en7_8ov9wSQ',
  nextPageToken: 'CAoQAA',
  regionCode: 'SG',
  pageInfo: {
    totalResults: 942515,
    resultsPerPage: 10,
  },
  items: [
    {
      kind: 'youtube#searchResult',
      etag: 's_BJwPyPD-BLwg35arFCnSbnZKo',
      id: {
        kind: 'youtube#video',
        videoId: 'YHjU4n6gWOE',
      },
      snippet: {
        publishedAt: '2020-03-04T10:00:10Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title: '【MV】ラブレター feat. 春茶 / コバソロ',
        description:
          '配信限定 2nd album「Clumsy」収録曲 「ラブレター feat. 春茶」LISTEN & DL →https://linkco.re/prxtScat この動画は皆さんから ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/YHjU4n6gWOE/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/YHjU4n6gWOE/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/YHjU4n6gWOE/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2020-03-04T10:00:10Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'Pf0-BXLmuEl7ywK5iWrmBcF59i0',
      id: {
        kind: 'youtube#video',
        videoId: 'kmPgjr0EL64',
      },
      snippet: {
        publishedAt: '2019-05-01T09:58:15Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title: '【MV】春に揺られど君想う feat. こぴ / コバソロ',
        description:
          '配信限定 2nd album「Clumsy」収録曲 配信サイト一覧→https://linkco.re/prxtScat 春に揺られど君想う feat. こぴ / KOBASOLO 作詞 ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/kmPgjr0EL64/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/kmPgjr0EL64/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/kmPgjr0EL64/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2019-05-01T09:58:15Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'WsVvJi6nVivXelfcLuSC76ScyLg',
      id: {
        kind: 'youtube#video',
        videoId: 'EZdEEui52pc',
      },
      snippet: {
        publishedAt: '2021-01-28T10:00:13Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '大切なもの/ロードオブメジャー(By コバソロ &amp; けんいち(元ロードオブメジャー) &amp; えみい(テーマパークガール))',
        description:
          '今回はロードオブメジャーの大切なものをご本人様とデュエットカバーしました。今回のボーカルはけんいちさんとえみい(テーマ ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/EZdEEui52pc/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/EZdEEui52pc/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/EZdEEui52pc/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2021-01-28T10:00:13Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: '35PcZ-5rd4V91hE3Du4Pc_zGCyA',
      id: {
        kind: 'youtube#video',
        videoId: 'NyXApXudtaU',
      },
      snippet: {
        publishedAt: '2016-10-31T10:00:30Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '【女性が歌う】小さな恋のうた/MONGOL800(Full Covered by コバソロ &amp; 杏沙子)歌詞付き',
        description:
          '今回はMONGOL800の小さな恋のうたをフルカバーしました。Voをしてくれたのはシンガーソングライターの杏沙子さん。',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/NyXApXudtaU/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/NyXApXudtaU/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/NyXApXudtaU/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2016-10-31T10:00:30Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'H1TQhlcaypjgYVZREPPw7g1NCv0',
      id: {
        kind: 'youtube#video',
        videoId: 'saq0a2eG5y4',
      },
      snippet: {
        publishedAt: '2016-01-04T10:21:46Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '【女性が歌う】ヒロイン/back number (Full Cover by Kobasolo &amp; 杏沙子)',
        description:
          '今回はbacknumberのヒロインをカバーしました。今回Voをしてくれたのはシンガーソングライターの杏沙子さん。チャンネル ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/saq0a2eG5y4/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/saq0a2eG5y4/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/saq0a2eG5y4/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2016-01-04T10:21:46Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'PQHekK22EUv_IiASEKxmaOANrYk',
      id: {
        kind: 'youtube#video',
        videoId: 'CwLTQmrXLww',
      },
      snippet: {
        publishedAt: '2020-09-16T10:00:12Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '【ドラゴンボールGT】DAN DAN 心魅かれてく/FIELD OF VIEW(Covered by コバソロ &amp; 未来)',
        description:
          '今回はドラゴンボールGTのopのFIELD OF VIEW /DAN DAN 心魅かれてく(作詞 ZARD/坂井泉水)をカバーしました。今回の ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/CwLTQmrXLww/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/CwLTQmrXLww/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/CwLTQmrXLww/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2020-09-16T10:00:12Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'rOv6eLv-lLK5T7AypL56vvmMG6A',
      id: {
        kind: 'youtube#video',
        videoId: 'Ei8BOmKPns8',
      },
      snippet: {
        publishedAt: '2023-09-29T10:00:08Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '【女性が歌う】Vaundy / 怪獣の花唄(Covered by コバソロ &amp; かんのじゅリ。)',
        description:
          '今回はVaundyさんの怪獣の花唄をカバーしました。今回のボーカルはかんのじゅリ。さん！チャンネル登録してね！',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/Ei8BOmKPns8/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/Ei8BOmKPns8/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/Ei8BOmKPns8/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2023-09-29T10:00:08Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: '2S8r5j7mvmUxRvCPMj7j9R6DRU8',
      id: {
        kind: 'youtube#video',
        videoId: '8qK5qHpJXfI',
      },
      snippet: {
        publishedAt: '2019-05-16T09:58:13Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '【女性が歌う】まちがいさがし / 菅田将暉(Covered by コバソロ &amp; 相沢)',
        description:
          '今回はパーフェクトワールド主題歌で米津玄師さん楽曲提供の菅田将暉さんの まちがいさがし をカバーしました。今回のボーカル ...',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/8qK5qHpJXfI/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/8qK5qHpJXfI/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/8qK5qHpJXfI/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2019-05-16T09:58:13Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'CmhkZv1Sw2oSTruHxj6VUYtCG0s',
      id: {
        kind: 'youtube#video',
        videoId: 'FR91CB5SBWU',
      },
      snippet: {
        publishedAt: '2020-01-05T10:00:13Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '命に嫌われている。/ カンザキイオリ(Covered by コバソロ &amp; 相沢)',
        description:
          '今回はカンザキイオリさんの命に嫌われているをカバーしました。今回のボーカルは相沢さん！MV主演は五味未知子さん！',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/FR91CB5SBWU/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/FR91CB5SBWU/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/FR91CB5SBWU/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2020-01-05T10:00:13Z',
      },
    },
    {
      kind: 'youtube#searchResult',
      etag: 'HFCP_lf4tHGcssrEahH3v84hKPc',
      id: {
        kind: 'youtube#video',
        videoId: 'Fd78zMXdRx0',
      },
      snippet: {
        publishedAt: '2019-04-16T08:57:43Z',
        channelId: 'UCDbQblY1XASbgqOXmy6FOFQ',
        title:
          '宇多田ヒカル / First Love(Covered by コバソロ &amp; YUJEONG &amp; SOYEON from LABOUM)',
        description:
          '今回は宇多田ヒカルさんのFirst Loveをカバーしました。今回のボーカルはLABOUMのYUJEONGさんとSOYEONさん！',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/Fd78zMXdRx0/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/Fd78zMXdRx0/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/Fd78zMXdRx0/hqdefault.jpg',
            width: 480,
            height: 360,
          },
        },
        channelTitle: 'kobasolo',
        liveBroadcastContent: 'none',
        publishTime: '2019-04-16T08:57:43Z',
      },
    },
  ],
}
