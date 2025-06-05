
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/theme-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils/Utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700'],
  variable: '--font-poppins' 
});

export const metadata = {
  title: 'RtorMovies - Your Ultimate Movie Destination',
  description: 'Discover, watch, and get recommendations for movies. RtorMovies brings the cinema to you.',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inter is loaded via next/font */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(inter.variable, poppins.variable, "font-body antialiased flex flex-col min-h-screen overflow-x-hidden")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
