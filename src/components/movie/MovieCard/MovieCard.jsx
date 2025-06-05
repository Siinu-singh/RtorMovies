
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary/50">
        <CardHeader className="p-0 relative">
          <Image
            src={movie.posterUrl}
            alt={`Poster for ${movie.title}`}
            width={400}
            height={600}
            className="object-cover w-full aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="movie poster"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline group-hover:text-primary leading-tight line-clamp-2">
            {movie.title}
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">{movie.year}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-1 fill-highlight text-highlight" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
