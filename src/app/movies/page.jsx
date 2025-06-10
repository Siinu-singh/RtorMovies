// This will be a Server Component
import { primeTheme } from '@/theme/theme';
import { getAllMovies } from '@/lib/MovieService';
import MovieHeroCarousel from '@/components/movies/MovieHeroCarousel';
import MovieRow from '@/components/movies/MovieRow';

export const metadata = {
  title: 'Movies | Prime Video',
  description: 'Explore a vast collection of movies, from blockbusters to indie gems.',
};

export default async function MoviesPage() {
  const allMovies = await getAllMovies(); // Fetch movies server-side

  // Categorize movies
  const heroMovies = allMovies.filter(m => m.categories?.includes("trending") || m.categories?.includes("popular")).sort((a,b) => b.rating - a.rating).slice(0, 7);

  const categories = [
    { 
      title: "Top 10 movies in India", 
      movies: allMovies.filter(m => m.categories?.includes("popular") || m.categories?.includes("trending")).sort((a,b) => b.rating - a.rating).slice(0, 10),
      isRanked: true,
      slug: "top-10-india"
    },
    { 
      title: "Drama movies", 
      movies: allMovies.filter(m => Array.isArray(m.genre) && m.genre.includes("Drama")).sort((a,b) => b.year - a.year).slice(0, 12),
      slug: "drama"
    },
    { 
      title: "Latest movies", 
      movies: allMovies.sort((a, b) => b.year - a.year).slice(0, 12),
      slug: "latest"
    },
    { 
      title: "Comedy movies", 
      movies: allMovies.filter(m => Array.isArray(m.genre) && m.genre.includes("Comedy")).sort((a,b) => b.year - a.year).slice(0, 12),
      slug: "comedy"
    },
    {
      title: "Movies in English", // Assuming movies.json would need a 'language' field for better filtering
      movies: allMovies.filter(m => m.language === "English" || !m.language).sort((a,b) => b.rating - a.rating).slice(0,12), // Basic fallback
      slug: "english-movies"
    },
    {
      title: "Romantic Comedies", // Example of a more specific combined genre
      movies: allMovies.filter(m => Array.isArray(m.genre) && m.genre.includes("Comedy") && m.genre.includes("Romance")).sort((a,b) => b.year - a.year).slice(0,12),
      slug: "romantic-comedies"
    }
    // Add more categories as needed, e.g., based on other genres or criteria from your movies.json
  ];

  return (
    <div style={{ backgroundColor: primeTheme.colors.backgroundDarker, color: primeTheme.colors.textPrimary }} className="min-h-screen">
      {/* Navbar is in root layout, assuming it's styled appropriately */}
      
      <MovieHeroCarousel movies={heroMovies} />

      <main className="py-6 md:py-8">
         {/* MovieRow handles its own internal padding for scrollable content */}
         <div className="space-y-6 md:space-y-10">
            {categories.map(category => (
              category.movies.length > 0 && (
                <MovieRow 
                  key={category.title}
                  title={category.title}
                  movies={category.movies}
                  isRankedList={!!category.isRanked}
                  categorySlug={category.slug || category.title.toLowerCase().replace(/\s+/g, '-')}
                />
              )
            ))}
        </div>
      </main>
    </div>
  );
}
