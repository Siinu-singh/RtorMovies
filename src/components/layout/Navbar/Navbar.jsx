
"use client";

import * as React from "react";
import Link from 'next/link';
import { Search, ChevronDown, LayoutGrid, UserCircle, Grid as GridIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  ListItem, 
  navigationMenuTriggerStyle 
} from "@/components/ui/navigation-menu";
import { cn } from "@/utils/Utils";

const genres = [
  { title: "Action and adventure", href: "/browse/genre/action" },
  { title: "Anime", href: "/browse/genre/anime" },
  { title: "Comedy", href: "/browse/genre/comedy" },
  { title: "Documentary", href: "/browse/genre/documentary" },
  { title: "Drama", href: "/browse/genre/drama" },
  { title: "Fantasy", href: "/browse/genre/fantasy" },
  { title: "Horror", href: "/browse/genre/horror" },
  { title: "Kids", href: "/browse/genre/kids" },
  { title: "Mystery and thrillers", href: "/browse/genre/mystery" },
  { title: "Romance", href: "/browse/genre/romance" },
  { title: "Science fiction", href: "/browse/genre/scifi" },
];

const featuredCollections = [
  { title: "Home Premiere", href: "/collections/home-premiere" },
  { title: "New Releases", href: "/collections/new-releases" },
  { title: "MX Player", href: "/collections/mx-player" },
  { title: "Critically acclaimed", href: "/collections/critically-acclaimed" },
  { title: "Kids", href: "/collections/kids" },
];


export default function Navbar() {
  const [activePath, setActivePath] = React.useState("/movies"); 

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);


  return (
    <header className="sticky top-0 z-50 mx-6 mt-2 rounded-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setActivePath('/')}>
            <span className="font-extrabold text-2xl text-foreground tracking-tighter">RtorMovies</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), activePath === '/' ? 'text-foreground font-semibold border-t-2 border-foreground' : 'text-muted-foreground hover:text-foreground')}
                    onClick={() => setActivePath('/')}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(activePath.startsWith('/movies') || activePath.startsWith('/browse/genre') || activePath.startsWith('/collections') ? 'text-foreground font-semibold border-t-2 border-foreground' : 'text-muted-foreground hover:text-foreground')}
                >
                  Movies
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-6 p-6 w-[700px] lg:w-[800px]">
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-muted-foreground">GENRES</h3>
                      <ul className="space-y-1.5">
                        {genres.slice(0, Math.ceil(genres.length / 2)).map((genre) => (
                          <ListItem key={genre.title} title={genre.title} href={genre.href} onClick={() => setActivePath(genre.href)}>
                            
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                    <div>
                       <h3 className="mb-3 text-sm font-medium text-muted-foreground opacity-0">GENRES</h3> 
                       <ul className="space-y-1.5">
                        {genres.slice(Math.ceil(genres.length / 2)).map((genre) => (
                           <ListItem key={genre.title} title={genre.title} href={genre.href} onClick={() => setActivePath(genre.href)}>
                            
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-muted-foreground">FEATURED COLLECTIONS</h3>
                      <ul className="space-y-1.5">
                        {featuredCollections.map((collection) => (
                          <ListItem key={collection.title} title={collection.title} href={collection.href} onClick={() => setActivePath(collection.href)}>
                            
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/tv-shows" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), activePath === '/tv-shows' ? 'text-foreground font-semibold border-t-2 border-foreground' : 'text-muted-foreground hover:text-foreground')}
                    onClick={() => setActivePath('/tv-shows')}
                  >
                    TV shows
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/live-tv" legacyBehavior passHref>
                  <NavigationMenuLink
                   className={cn(navigationMenuTriggerStyle(), activePath === '/live-tv' ? 'text-foreground font-semibold border-t-2 border-foreground' : 'text-muted-foreground hover:text-foreground')}
                   onClick={() => setActivePath('/live-tv')}
                  >
                    Live TV
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          
          <Link href="/subscriptions" className="flex items-center text-sm text-muted-foreground hover:text-foreground" onClick={() => setActivePath('/subscriptions')}>
            <LayoutGrid className="h-5 w-5 mr-1" />
            Subscriptions
          </Link>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground px-2">
            EN
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
             <GridIcon className="h-6 w-6" /> 
            <span className="sr-only">Categories</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
