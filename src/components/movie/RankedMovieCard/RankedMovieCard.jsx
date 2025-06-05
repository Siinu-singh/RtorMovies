
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/Utils';

export default function RankedMovieCard({ movie, rank }) {
  return (
    <Link href={`/movies/${movie.id}`} className="block group relative flex-shrink-0 w-40 md:w-48 transition-all duration-300 ease-in-out hover:scale-105">
      <div className="aspect-[2/3] overflow-hidden rounded-md">
        <Image
          src={movie.posterUrl}
          alt={`Poster for ${movie.title}`}
          width={200}
          height={300}
          className="object-cover w-full h-full"
          data-ai-hint="movie poster trending"
        />
      </div>
      <div
        className={cn(
          "absolute -bottom-2 -left-3 md:-bottom-3 md:-left-4 text-7xl sm:text-8xl md:text-9xl font-black text-white select-none z-10",
          "font-headline" 
        )}
        style={{
          WebkitTextStroke: '3px black',
          paintOrder: 'stroke fill',
          textStroke: '3px black', // Standard property
        }}
      >
        {rank}
      </div>
    </Link>
  );
}
