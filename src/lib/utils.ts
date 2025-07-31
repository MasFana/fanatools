import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { igdl, pinterest, youtube, ttdl, twitter, fbdown } from './downloader'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type DownloadResult = {
  title?: string,
  thumbnail?: string
  audio?: string[]
  media?: string[]
  file?: string[]
}

export function Downloader(url: string) {
  return {
    ig: async function (): Promise<DownloadResult[]> {
      return igdl(url).then(e => {
        console.log(e.result)
        if (e.result?.[0].url) {
          
          const result = e.result?.map(item => ({
            title: '',
            thumbnail: item.thumbnail,
            media: [item.url],
            audio: [],
            file: []
          }))

          return result.filter((obj, index, self) =>
            index === self.findIndex((t) => t.thumbnail === obj.thumbnail) // Filter dupes
          );

        } else return []
      })
    },
    yt: async function (): Promise<DownloadResult[]> {
      return youtube(url).then(e =>
        e.title ?
          ([{
            title: e.title,
            thumbnail: e.thumbnail,
            audio: e.mp3 ? [e.mp3] : [],
            media: e.mp4 ? [e.mp4] : [],
            file: []
          }]) : []
      )
    },
    tt: async function (): Promise<DownloadResult[]> {
      return ttdl(url).then(e =>
        e.title ?
          [{
            title: e.title,
            thumbnail: e.thumbnail,
            audio: e.audio ? [e.audio[0]] : [],
            media: e.video ? [e.video[0]] : [],
            file: []
          }] : []
      )
    },
    tw: async function (): Promise<DownloadResult[]> {
      return twitter(url).then(e =>
        e.url ?
          [{
            title: e.title || '',
            thumbnail: '',
            media: e.url ? [e.url[0].hd] : [],
            audio: [],
            file: []
          }] : []
      )
    }, fb: async function (): Promise<DownloadResult[]> {
      return fbdown(url).then(e =>
        e.HD ?
          [{
            title: '',
            thumbnail: '',
            media: e.HD ? [e.HD] : [],
            audio: [],
            file: []
          }] : []
      )
    }, pin: async function (): Promise<DownloadResult[]> {
      return pinterest(url).then(e =>
        e.result ? [{
          title: e.result.title || '',
          thumbnail: e.result.image || '',
          media: [e.result.image, e.result.video_url].filter((url): url is string => url != null),
          audio: [],
          file: []
        }] : []
      )
    }
  }
}