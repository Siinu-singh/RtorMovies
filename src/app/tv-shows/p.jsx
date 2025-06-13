import { getAllTVShows } from '@/lib/getTVShows';
import { primeTheme } from '@/theme/theme'; // Using primeTheme now
// import TVShowGrid from '@/components/tvshows/TVShowGrid'; // Will be replaced by TVShowRow
import TVHeroCarousel from '@/components/tvshows/TVHeroCarousel';
import TVShowRow from '@/components/tvshows/TVShowRow'; // Placeholder for new component

export const metadata = {
  title: 'TV Shows | RtorMovies',
  description: 'Browse our extensive collection of TV shows, from thrilling adventures to captivating dramas.',
};

// This is a Server Component
export default async function TVShowsPage() {
  const allShows = await getAllTVShows();

  // For simplicity, we'll categorize shows directly here.
  // In a real app, this might come from the API or be more dynamic.
  const categories = [
    { title: "Top TV", shows: allShows.slice(0, 5) }, // Example slice
    { title: "Throwback TV", shows: allShows.slice(1, 6).reverse() }, // Example slice
    { title: "Comedy TV", shows: allShows.filter(s => s.genre.includes("Comedy")).slice(0,5) },
    // Add more categories as needed
  ];

  const heroShows = allShows.slice(0, 3); 

  return (
    <div style={{ backgroundColor: primeTheme.colors.backgroundDarker, color: primeTheme.colors.textPrimary }} className="min-h-screen">
      {/* Navbar is in root layout */}
      
      <TVHeroCarousel shows={heroShows} />

      
    </div>
  );
}