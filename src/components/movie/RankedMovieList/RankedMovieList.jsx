
import RankedMovieCard from '@/components/movie/RankedMovieCard';
import { ChevronRight } from 'lucide-react';

export default function RankedMovieList({ title, movies }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  // For a more accurate curve, an SVG or a complex mask would be needed.
  // This is a simplified CSS attempt for the top glow.
  const topGlowStyle = {
    background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(40, 20, 80, 0.25) 0%, rgba(15, 23, 42, 0) 60%)', 
  };

  return (
    <section className="py-8 relative mb-8">
      <div
        className="absolute -top-16 left-0 right-0 h-32 md:h-40 z-0 pointer-events-none"
        style={topGlowStyle}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-headline font-semibold text-white">{title}</h2>
        </div>
        <div className="relative group">
          <div className="flex overflow-x-auto space-x-6 md:space-x-8 pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-transparent hover:scrollbar-thumb-gray-600/70">
            {movies.map((movie, index) => (
              <RankedMovieCard key={movie.id} movie={movie} rank={index + 1} />
            ))}
          </div>
          {/* Example for fade-out overlay at the end of the list if not using buttons */}
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden group-hover:md:block"/>
        </div>
      </div>
    </section>
  );
}
