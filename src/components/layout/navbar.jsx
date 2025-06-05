
import Link from 'next/link';
import { Film } from 'lucide-react';
import { ThemeToggleButton } from '@/components/ui/theme-toggle-button';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-auto">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline">RtorMovies</span>
        </Link>
        <nav className="flex items-center space-x-4">
          {/* Future navigation links can go here */}
          {/* <Link href="/browse" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Browse</Link> */}
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
}
