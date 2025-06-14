'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function TvShowGrid({ tvShows }) {
  if (!tvShows || tvShows.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">No TV shows found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {tvShows.map((show) => (
        <motion.div
          key={show.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <Link href={`/tv-shows/${show.id}`}>
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={show.poster || '/placeholder.jpg'}
                alt={show.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">{show.title}</h3>
              {show.genre && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {show.genre.map((g) => (
                    <span
                      key={g}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
