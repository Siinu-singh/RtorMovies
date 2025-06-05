
import MovieList from '@/components/movie/MovieList';
import HeroSection from '@/components/home/HeroSection'; 
import { getMoviesByCategory } from '@/lib/MovieService';


export default async function HomePage() {
  const trendingMovies = await getMoviesByCategory('trending');
  const popularMovies = await getMoviesByCategory('popular');
  const classicsMovies = await getMoviesByCategory('classics');
  const editorChoiceMovies = await getMoviesByCategory('editor-choice');


  return (
    <>
      <HeroSection />
      <div className="space-y-12">
        {trendingMovies.length > 0 && <MovieList title="Trending Now" movies={trendingMovies} />}
        {popularMovies.length > 0 && <MovieList title="Popular Movies" movies={popularMovies} />}
        {classicsMovies.length > 0 && <MovieList title="All-Time Classics" movies={classicsMovies} />}
        {editorChoiceMovies.length > 0 && <MovieList title="Editor's Choice" movies={editorChoiceMovies} />}
      </div>
    </>
  );
}
