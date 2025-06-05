
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Clock } from 'lucide-react';
import MovieList from '@/components/movie/MovieList';
import { getAllMovies, getMovieById, getMoviesByGenre } from '@/lib/MovieService';

export async function generateStaticParams() {
  const movies = await getAllMovies();
  return movies.map((movie) => ({
    id: movie.id,
  }));
}

export default async function MovieDetailPage({ params }) {
  const movie = await getMovieById(params.id);

  if (!movie) {
    notFound();
  }
  
  const relatedMovies = movie.genre && movie.genre.length > 0 
    ? await getMoviesByGenre(movie.genre[0], movie.id) 
    : [];

  return (
    <div className="space-y-12">
      <section className="relative min-h-[60vh] -mx-4 -mt-8 md:-mx-8 md:-mt-12">
        {movie.backdropUrl && (
          <Image
            src={movie.backdropUrl}
            alt={`Backdrop for ${movie.title}`}
            fill
            objectFit="cover"
            className="opacity-30"
            data-ai-hint="movie backdrop"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative container mx-auto px-4 py-12 flex flex-col md:flex-row items-end min-h-[60vh]">
            <div className="md:w-1/3 lg:w-1/4 mb-8 md:mb-0 md:mr-8 flex-shrink-0">
              <Image
                src={movie.posterUrl}
                alt={`Poster for ${movie.title}`}
                width={400}
                height={600}
                className="rounded-lg shadow-2xl object-cover aspect-[2/3]"
                data-ai-hint="movie poster cinematic"
                priority
              />
            </div>
            <div className="md:w-2/3 lg:w-3/4 space-y-4">
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">{movie.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1.5 fill-highlight text-highlight" />
                  <span className="text-lg font-semibold text-foreground">{movie.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>{movie.duration}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="outline" className="text-sm">{g}</Badge>
                ))}
              </div>
            </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-headline font-semibold mb-3">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.description}</p>
          </div>
          <div>
            <h2 className="text-2xl font-headline font-semibold mb-3">Cast</h2>
            <ul className="space-y-1 text-muted-foreground">
              {movie.cast.slice(0, 5).map((actor) => ( 
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {relatedMovies.length > 0 && (
        <section className="container mx-auto px-4">
          <MovieList title="Related Movies" movies={relatedMovies} />
        </section>
      )}
    </div>
  );
}
