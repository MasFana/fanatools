import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Facebook, Instagram, Twitter, Music2, Youtube, HardDrive, Image, Download } from 'lucide-react'
import type { ReactElement } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createLazyFileRoute('/downloader/')({
  component: IndexDownloaderPage,
})

type ListDownloader = {
  name: string
  path: string
  description?: string
  icon?: ReactElement<any>
  color?: string
}

export const ListDownloaders: ListDownloader[] = [
  {
    name: 'YouTube',
    path: '/downloader/youtube',
    description: 'Download videos, music, and thumbnails from YouTube',
    icon: <Youtube className="w-5 h-5" />,
    color: 'bg-red-500',
  },
  {
    name: 'Instagram',
    path: '/downloader/instagram',
    description: 'Download posts, reels, stories, and IGTV videos',
    icon: <Instagram className="w-5 h-5" />,
    color: 'bg-pink-600',
  },
  {
    name: 'TikTok',
    path: '/downloader/tiktok',
    description: 'Download videos without watermark from TikTok',
    icon: <Music2 className="w-5 h-5" />,
    color: 'bg-black',
  },
  {
    name: 'Twitter/X',
    path: '/downloader/twitter',
    description: 'Download videos and GIFs from Twitter/X',
    icon: <Twitter className="w-5 h-5" />,
    color: 'bg-blue-400',
  },
  {
    name: 'Facebook',
    path: '/downloader/facebook',
    description: 'Download videos from Facebook posts and reels',
    icon: <Facebook className="w-5 h-5" />,
    color: 'bg-blue-600',
  },
  {
    name: 'Pinterest',
    path: '/downloader/pinterest',
    description: 'Download images and videos from Pinterest',
    icon: <Image className="w-5 h-5" />,
    color: 'bg-red-600',
  }
]

export function IndexDownloaderPage() {
  return (
    <div className="container py-8 mx-auto text-center">
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold tracking-tight">MasFana's Social Media Downloader</h1>
        <p className="text-muted-foreground">
          Download content from various platforms with ease
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ListDownloaders.map((downloader) => (
          <Card key={downloader.name} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${downloader.color} text-white`}>
                  {downloader.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{downloader.name}</CardTitle>
                  <CardDescription>{downloader.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link to={downloader.path}>
                  <Download className="mr-2 h-4 w-4" />
                  Open Downloader
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}