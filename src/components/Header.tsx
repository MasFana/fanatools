import { Link } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { cn } from '@/lib/utils'

const routes = [
  { title: "Home", url: "/" },
  { title: "Downloader", url: "/downloader" },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto pr-2 md:pr-0">
        {/* Desktop Navigation */}
        <NavigationMenu viewport={false} className="hidden md:flex">
          <NavigationMenuList>
            {routes.map((route) => {
              return (
                <NavigationMenuItem key={route.url}>
                  <NavigationMenuLink asChild className={cn(
                    navigationMenuTriggerStyle(),
                    '[&.active]:underline underline-offset-8 font-normal [&.active]:font-bold'
                  )}>
                    <Link to={route.url}>{route.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="p-2">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent title='menu' aria-describedby={undefined} side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>
                Menu MasFana's
              </SheetTitle>
              <SheetDescription>
                Menu kumpulan tools MasFana
              </SheetDescription>
            </SheetHeader>
            {routes.map((route) => {

              return (
                <Link
                  key={route.url}
                  to={route.url}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    '[&.active]:underline underline-offset-8 font-normal [&.active]:font-bold'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {route.title}
                </Link>
              )
            })}

          </SheetContent>
        </Sheet>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </header>
  )
}