import { createLazyFileRoute } from '@tanstack/react-router'

import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, Github, Linkedin } from 'lucide-react'

export const Route = createLazyFileRoute('/')({
  component: Home,
})

const tools = [
  {
    title: "Downloader",
    description: "Download videos, images, and files from various platforms",
    url: "/downloader",
    icon: <Download className="h-6 w-6" />,
    status: "live",
    comingSoon: false
  },
  {
    title: "Image Converter",
    description: "Convert between different image formats with ease",
    url: "#",
    icon: <Download className="h-6 w-6" />,
    status: "planned",
    comingSoon: true
  },
  {
    title: "PDF Tools",
    description: "Merge, split, and compress PDF documents",
    url: "#",
    icon: <Download className="h-6 w-6" />,
    status: "planned",
    comingSoon: true
  }
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="my-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          MasFana's Web Tools
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          A collection of useful web tools to make your online tasks easier.
          More tools coming soon!
        </p>

        {/* Social Links as Buttons */}
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/MasFana"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 shadow hover:shadow-md"
          >
            <Github className="h-5 w-5" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/adrianfathan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow hover:shadow-md"
          >
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </a>
        </div>
      </section>

      {/* Rest of your existing content... */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Available Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link to={tool.url} key={tool.title}>
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {tool.icon}
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  {tool.comingSoon ? (
                    <Badge variant="secondary">Coming Soon</Badge>
                  ) : (
                    <Badge>Live</Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription>{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">More Tools Coming</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          I'm constantly working on adding new tools to this collection.
          If you have any suggestions, feel free to reach out!
        </p>

      </section>
    </div>
  )
}