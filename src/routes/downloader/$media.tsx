import { createFileRoute, redirect } from '@tanstack/react-router'
import { youtube, igdl, ttdl, fbdown, twitter, capcut, pinterest, mediafire, gdrive } from '@/lib/downloader'
import { useState } from 'react'
import { Download, Link, Loader2, Check, X, Image as ImageIcon, Video, Music2, File, Youtube, Instagram, Facebook, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IndexDownloaderPage } from './index.lazy'

const downloaderMap = {
  "youtube": youtube,
  "instagram": igdl,
  "tiktok": ttdl,
  "facebook": fbdown,
  "twitter": twitter,
  "capcut": capcut,
  "pinterest": pinterest,
  "mediafire": mediafire,
  "google-drive": gdrive
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
  capcut: {
    name: "CapCut",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "bg-purple-500",
    placeholder: "https://www.capcut.com/...",
    example: "https://www.capcut.com/template/123456789"
  },
  pinterest: {
    name: "Pinterest",
    icon: <ImageIcon className="w-5 h-5" />,
    color: "bg-red-600",
    placeholder: "https://www.pinterest.com/...",
    example: "https://www.pinterest.com/pin/123456789"
  },
  mediafire: {
    name: "MediaFire",
    icon: <File className="w-5 h-5" />,
    color: "bg-orange-500",
    placeholder: "https://www.mediafire.com/...",
    example: "https://www.mediafire.com/file/abc123/file.pdf"
  },
  "google-drive": {
    name: "Google Drive",
    icon: <File className="w-5 h-5" />,
    color: "bg-green-500",
    placeholder: "https://drive.google.com/...",
    example: "https://drive.google.com/file/d/123456789/view"
  }
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

function DownloaderPage() {
  const { media } = Route.useLoaderData()
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const currentService = serviceInfo[media]
  const downloaderFunction = downloaderMap[media]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await downloaderFunction(url)
      setResult(response)
    } catch (err) {
      setError(err.message || 'Failed to fetch download. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderMediaPreview = () => {
    if (!result) return null

    if (result.thumbnail) {
      return (
        <div className="mt-4 rounded-lg overflow-hidden border">
          <img
            src={result.thumbnail}
            alt="Media preview"
            className="w-full h-auto max-h-64 object-contain"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400?text=Preview+Not+Available'
              e.currentTarget.className = 'w-full h-64 bg-gray-100 object-cover flex items-center justify-center text-gray-400'
            }}
          />
        </div>
      )
    }

    return null
  }

  const renderDownloadOptions = () => {
    if (!result) return null

    if (result.status === false) {
      return (
        <Alert variant="destructive" className="mt-6">
          <X className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {result.message || 'Failed to fetch download links.'}
          </AlertDescription>
        </Alert>
      )
    }

    return (
      <div className="mt-6 space-y-4">
        {result.title && (
          <div className="space-y-1">
            <h3 className="font-medium">Title</h3>
            <p className="text-sm">{result.title}</p>
          </div>
        )}

        {renderMediaPreview()}

        {/* Video Options */}
        {result.video?.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Video Options</h3>
            <div className="grid gap-2">
              {result.video.map((item, index) => (
                <div key={`video-${index}`} className="border rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-500" />
                    <span>Video {index + 1}</span>
                    {item.resolution && <Badge variant="secondary">{item.resolution}</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(item.url)}>
                      {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
                    </Button>
                    <Button asChild size="sm">
                      <a href={item.url} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio Options */}
        {result.audio?.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Audio Options</h3>
            <div className="grid gap-2">
              {result.audio.map((item, index) => (
                <div key={`audio-${index}`} className="border rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music2 className="h-5 w-5 text-purple-500" />
                    <span>Audio {index + 1}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(item.url)}>
                      {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
                    </Button>
                    <Button asChild size="sm">
                      <a href={item.url} download target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single URL Results */}
        {result.url && !result.video && !result.audio && (
          <div className="space-y-2">
            <h3 className="font-medium">Download Link</h3>
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <Download className="h-5 w-5 text-green-500" />
                <span className="truncate">{result.url}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.url)}>
                  {copied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
                </Button>
                <Button asChild size="sm">
                  <a href={result.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${currentService.color} text-white`}>
              {currentService.icon}
            </div>
            <div>
              <CardTitle>{currentService.name} Downloader</CardTitle>
              <CardDescription>
                Paste your {currentService.name} link below to download content
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">{currentService.name} URL</Label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  placeholder={currentService.placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Example: <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setUrl(currentService.example)}
                >
                  {currentService.example}
                </span>
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 space-y-4">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          )}

          {/* Results */}
          {!isLoading && renderDownloadOptions()}
        </CardContent>
      </Card>
      <IndexDownloaderPage notIndex={true} />
    </div>
  )
}