
import MovieCard from '@/components/movie/MovieCard';

export default function MovieList({ title, movies }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-headline font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
