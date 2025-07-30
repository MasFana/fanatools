
import { useLoaderData } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ClipboardPaste, X, Download, Loader2, Image as ImageIcon, Video, Music2, Youtube, Instagram, Facebook, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Downloader } from '@/lib/utils'
import type { DownloadResult } from '@/lib/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { IndexDownloaderPage } from './index.lazy'

const downloaderMap = {
  "youtube": '',
  "instagram": '',
  "tiktok": '',
  "facebook": '',
  "twitter": '',
  "pinterest": '',

}

const serviceInfo = {
  youtube: {
    name: "YouTube",
    icon: <Youtube className="w-5 h-5" />,
    color: "bg-red-500",
    placeholder: "https://www.youtube.com/watch?v=...",
    example: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  instagram: {
    name: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
    color: "bg-pink-600",
    placeholder: "https://www.instagram.com/p/...",
    example: "https://www.instagram.com/p/CxyzABC123/"
  },
  tiktok: {
    name: "TikTok",
    icon: <Music2 className="w-5 h-5" />,
    color: "bg-black",
    placeholder: "https://www.tiktok.com/@...",
    example: "https://www.tiktok.com/@user/video/123456789"
  },
  facebook: {
    name: "Facebook",
    icon: <Facebook className="w-5 h-5" />,
    color: "bg-blue-600",
    placeholder: "https://www.facebook.com/...",
    example: "https://www.facebook.com/watch/?v=123456789"
  },
  twitter: {
    name: "Twitter/X",
    icon: <Twitter className="w-5 h-5" />,
    color: "bg-blue-400",
    placeholder: "https://twitter.com/...",
    example: "https://twitter.com/user/status/123456789"
  },
  pinterest: {
    name: "Pinterest",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "bg-red-600",
    placeholder: "https://www.pinterest.com/...",
    example: "https://www.pinterest.com/pin/123456789"
  },
}

export const Route = createFileRoute('/downloader/$media')({
  component: DownloaderPage,
  loader: async ({ params }) => {
    const { media } = params
    if (!media || !(media in downloaderMap)) {
      redirect({
        to: '/downloader',
        throw: true
      })
    }
    return { media }
  }
})


export function DownloaderPage() {
  const { media } = useLoaderData({ from: Route.id }) as { media: keyof typeof serviceInfo }
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<DownloadResult[]>([])

  // Add this inside your DownloaderPage component
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
    } catch (err) {
      setError('Failed to access clipboard')
    }
  }

  const handleClear = () => {
    setUrl('')
    setError(null)
  }

  const currentService = serviceInfo[media]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults([])

    try {
      const downloader = Downloader(url)
      let data: DownloadResult[] = []

      // Type-safe downloader dispatch
      switch (media) {
        case 'youtube': data = await downloader.yt(); break
        case 'instagram': data = await downloader.ig(); break
        case 'tiktok': data = await downloader.tt(); break
        case 'twitter': data = await downloader.tw(); break
        case 'facebook': data = await downloader.fb(); break
        case 'pinterest': data = await downloader.pin(); break
        default:
          const exhaustiveCheck: never = media
          throw new Error(`Unhandled media type: ${exhaustiveCheck}`)
      }

      if (!data.length) {
        throw new Error('No downloadable content found')
      }

      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch download links')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="container max-w-3xl py-8 mx-auto">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${currentService.color}`}>
                {currentService.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{currentService.name} Downloader</h1>
                <p className="text-muted-foreground">Paste your {currentService.name} URL below</p>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex relative">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={currentService.placeholder}
                    className="p-6"
                    disabled={isLoading}
                  ></Input>
                  {url ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={handleClear}
                      aria-label="Clear URL"
                    >
                      <X className="w-12 h-12 text-muted-foreground" /> {/* Increased from w-5 h-5 */}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={handlePaste}
                      aria-label="Paste URL"
                    >
                      <ClipboardPaste className="w-12 h-12 text-muted-foreground" /> {/* Added explicit size */}
                    </Button>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !url.trim()}
                  aria-label="Extract content"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-full animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-full" />
                  )}
                  Extract
                </Button>
              </div>

              {error && (
                <Alert variant="default">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </form>
        </Card>

        {/* Loading state */}
        {isLoading && <ContentSkeleton />}

        {/* Results display */}
        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            {results.map((result, index) => (
              <ContentCard
                key={index}
                result={result}
                mediaType={media}
              />
            ))}
          </div>
        )}
      </div>
      <IndexDownloaderPage />
    </>
  )
}

// Extracted skeleton component
function ContentSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

// Extracted content card component
function ContentCard({
  result,
  mediaType
}: {
  result: DownloadResult
  mediaType: keyof typeof serviceInfo
}) {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {result.title && (
          <h2 className="text-xl font-semibold">{result.title}</h2>
        )}

        {result.thumbnail && (
          <ThumbnailImage
            src={result.thumbnail}
            alt={`${serviceInfo[mediaType].name} thumbnail`}
          />
        )}

        <Separator />

        <div className="space-y-4">
          {(result.media ?? []).length > 0 && (
            <DownloadSection
              title="Media Files"
              icon={
                <Video className="h-4 w-4" />
              }
              items={result.media ?? []}
              variant="default"
              labelPrefix={"Download Media"}
            />
          )}
          {(result.audio ?? []).length > 0 && (
            <DownloadSection
              title="Audio Files"
              icon={<Music2 className="h-4 w-4" />}
              items={result.audio ?? []}
              variant="outline"
              labelPrefix="Download Audio"
            />
          )}

        </div>
      </CardContent>
    </Card>
  )
}

// Extracted thumbnail component
function ThumbnailImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border">
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

// Extracted download section component
function DownloadSection({
  title,
  icon,
  items,
  variant,
  labelPrefix
}: {
  title: string
  icon: React.ReactNode
  items: string[]
  variant: 'default' | 'outline'
  labelPrefix: string
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        <span>{title}</span>
        <Badge variant="secondary">{items.length}</Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((url, i) => (
          <Button
            key={i}
            asChild
            variant={variant}
            className="w-full"
          >
            <a
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              {labelPrefix} {items.length > 1 ? `${i + 1}` : ''}
            </a>
          </Button>
        ))}
      </div>
    </div>
  )
}
