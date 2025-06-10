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

  const heroShows = allShows.slice(0, 3); // Example: first 3 shows for hero

  return (
    <div style={{ backgroundColor: primeTheme.colors.backgroundDarker, color: primeTheme.colors.textPrimary }} className="min-h-screen">
      {/* Navbar is in root layout */}
      
      <TVHeroCarousel shows={heroShows} />

      <main className="space-y-8 md:space-y-12 pb-12 pt-8"> {/* Added pt-8 to give space after hero */}
        <div className="px-4 md:px-8 lg:px-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6" style={{color: primeTheme.colors.textPrimary}}>TV shows</h1>
            {/* Placeholder for TVShowRow components */}
            {categories.map(category => (
              <section key={category.title} className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl md:text-2xl font-semibold" style={{color: primeTheme.colors.textPrimary}}>{category.title}</h2>
                  <a href="#" className="text-sm font-medium hover:underline" style={{color: primeTheme.colors.accentBlueHover}}>
                    See more &amp;gt;
                  </a>
                </div>
                <TVShowRow shows={category.shows} title="" /> {/* Title is already displayed above the row */}
              </section>
            ))}
        </div>
      </main>
    </div>
  );
}