
import MovieList from '@/components/movie/MovieList';
import HeroSection from '@/components/home/HeroSection'; 
import RankedMovieList from '@/components/movie/RankedMovieList';
import { getMoviesByCategory } from '@/lib/MovieService';


export default async function HomePage() {
  const trendingMovies = await getMoviesByCategory('trending');
  const popularMovies = await getMoviesByCategory('popular');
  const classicsMovies = await getMoviesByCategory('classics');
  const editorChoiceMovies = await getMoviesByCategory('editor-choice');


  return (
    <>
      <HeroSection />
      <div className="bg-background -mt-4 md:-mt-8 relative z-10"> {/* Ensure content below hero is on black bg */}
        {trendingMovies.length > 0 && <RankedMovieList title="Trending Now" movies={trendingMovies.slice(0,10)} />} {/* Using RankedMovieList now */}
        
        <div className="container mx-auto px-4 space-y-12 pt-8"> {/* Add container and padding for subsequent lists */}
          {popularMovies.length > 0 && <MovieList title="Popular Movies" movies={popularMovies} />}
          {classicsMovies.length > 0 && <MovieList title="All-Time Classics" movies={classicsMovies} />}
          {editorChoiceMovies.length > 0 && <MovieList title="Editor's Choice" movies={editorChoiceMovies} />}
        </div>
      </div>
    </>
  );
}
