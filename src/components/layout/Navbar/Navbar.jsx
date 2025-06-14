"use client";

import * as React from "react";
import { useState } from "react"; // Added useState
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ChevronDown, LayoutGrid, UserCircle, Grid as GridIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LiveDropdown from '@/components/navbar/LiveDropdown'; // Added LiveDropdown import
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
import { primeTheme } from '@/theme/theme'; // Import the new theme

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
  const pathname = usePathname();
  const [isLiveTvOpen, setIsLiveTvOpen] = useState(false);

  // Add this custom class for neon effect
  const neonTextClass = "bg-gradient-to-r from-blue-400 via-blue-100 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]";

  return (
    <header
      className="sticky top-0 z-50 shadow-md" // Removed mx-6, mt-2, rounded-lg for a full-width feel
      style={{ backgroundColor: primeTheme.colors.backgroundDarker }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4 md:space-x-6"> {/* Adjusted spacing */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={`font-bold text-2xl md:text-3xl tracking-tight ${neonTextClass}`}>
              RtorMovies
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-sm font-medium",
                    (pathname === '/') ? neonTextClass : 'text-textSecondary hover:text-textPrimary'
                  )}
                  style={{ backgroundColor: 'transparent' }}
                  asChild
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/movies"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-sm font-medium",
                    (pathname && pathname.startsWith('/movies')) ? neonTextClass : 'text-textSecondary hover:text-textPrimary'
                  )}
                  style={{ backgroundColor: 'transparent' }}
                  asChild
                >
                  <Link href="/movies">Movies</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/tv-shows"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-sm font-medium",
                    (pathname === '/tv-shows') ? neonTextClass : 'text-textSecondary hover:text-textPrimary'
                  )}
                  style={{ backgroundColor: 'transparent' }}
                  asChild
                >
                  <Link href="/tv-shows">TV shows</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* Live TV Dropdown Item */}
              <NavigationMenuItem className="relative"
                onMouseEnter={() => setIsLiveTvOpen(true)}
                onMouseLeave={() => setIsLiveTvOpen(false)}
              >
                <Link
                  href="/live-tv"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-sm font-medium cursor-pointer",
                    (pathname === '/live-tv' || pathname.startsWith('/live/')) ? neonTextClass : 'text-textSecondary hover:text-textPrimary'
                  )}
                  style={{ backgroundColor: 'transparent' }}
                >
                  Live TV
                </Link>
                <LiveDropdown isOpen={isLiveTvOpen} onClose={() => setIsLiveTvOpen(false)} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-sm font-medium",
                    (pathname && (pathname.startsWith('/browse/genre') || pathname.startsWith('/collections'))) ? neonTextClass : 'text-textSecondary hover:text-textPrimary'
                  )}
                  style={{ backgroundColor: 'transparent' }}
                >
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-6 p-6 w-[700px] lg:w-[800px]" style={{ backgroundColor: primeTheme.colors.backgroundLight, borderColor: primeTheme.colors.backgroundDarker }}>
                    <div>
                      <h3 className="mb-3 text-sm font-medium" style={{ color: primeTheme.colors.textMuted }}>GENRES</h3>
                      <ul className="space-y-1.5">
                        {genres.map((genre) => ( // Simplified mapping
                          <ListItem key={genre.title} title={genre.title} href={genre.href} style={{ color: primeTheme.colors.textSecondary, '&:hover': { color: primeTheme.colors.textPrimary } }}>
                            {/* Content for ListItem if any */}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                    {/* For simplicity, I'm only showing one column of genres now. You can re-add the two-column split if needed. */}
                    <div>
                      <h3 className="mb-3 text-sm font-medium" style={{ color: primeTheme.colors.textMuted }}>FEATURED COLLECTIONS</h3>
                      <ul className="space-y-1.5">
                        {featuredCollections.map((collection) => (
                          <ListItem key={collection.title} title={collection.title} href={collection.href} style={{ color: primeTheme.colors.textSecondary, '&:hover': { color: primeTheme.colors.textPrimary } }}>
                            {/* Content for ListItem if any */}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2 md:space-x-3"> {/* Adjusted spacing */}
          <Button variant="ghost" size="icon" className="hover:bg-backgroundLight" style={{ color: primeTheme.colors.textSecondary }}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          {/* "EN" dropdown placeholder */}
          <Button variant="ghost" className="text-sm font-medium hover:bg-backgroundLight" style={{ color: primeTheme.colors.textSecondary }}>
            EN <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          {/* <Button variant="ghost" size="icon" className="hover:bg-backgroundLight" style={{ color: primeTheme.colors.textSecondary }}>
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Button> */}
           {/* Prime Join Button - Example
          <Button
            className={`text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-sm ${neonTextClass}`}
            style={{ backgroundColor: 'transparent' }}
          >
            Join Prime
          </Button> */}
        </div>
      </div>
    </header>
  );
}
