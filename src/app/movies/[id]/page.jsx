import { notFound } from 'next/navigation';
// Assuming MovieRow is the horizontal scrolling list from the new movies page
import MovieRow from '@/components/movies/MovieRow';
import MovieDetailHero from '@/components/movies/MovieDetailHero';
import DetailTabs from '@/components/movies/DetailTabs';
import { getAllMovies, getMovieById, getMoviesByGenre } from '@/lib/MovieService';
import { primeTheme } from '@/theme/theme'; // Assuming this is your theme file
// Removed Image, Badge, and lucide-react icons from here as they are used within sub-components

export async function generateStaticParams() {
  const movies = await getAllMovies();
  return movies.map((movie) => ({
    id: movie.id.toString(), // Ensure ID is a string
  }));
}

export async function generateMetadata({ params }) {
  const movie = await getMovieById(params.id.toString());
  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }
  return {
    title: `${movie.title} | Prime Video`,
    description: movie.description,
  };
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovieById(params.id.toString());

  if (!movie) {
    notFound();
  }
  
  // Enhance movie object with placeholder data for new fields if not present
  const enhancedMovie = {
    ...movie,
    logoUrl: movie.logoUrl || null, // e.g., '/images/logos/movie-logo.png'
    rankInCountry: movie.rankInCountry || (movie.categories?.includes('trending') ? '#1 in India' : null), // Example logic
    tags: movie.tags || ['TOP 10', 'X-RAY', 'UHD'], // Example
    ageRating: movie.ageRating || 'U/A 16+', // Example
    rentOptions: movie.rentOptions || [{ quality: "UHD", price: "₹279" }], // Example
    // Add other new fields with defaults if necessary
  };

  const relatedMovies = movie.genre && movie.genre.length > 0 
    ? (await getMoviesByGenre(movie.genre[0], movie.id.toString())).slice(0,10) // Limit related
    : [];

  return (
    <div style={{ backgroundColor: primeTheme.colors.backgroundDarker }} className="min-h-screen">
      <MovieDetailHero movie={enhancedMovie} />
      <DetailTabs movie={enhancedMovie} relatedMovies={relatedMovies} />
      {/* Footer can be added here or in the main layout */}
    </div>
  );
}
