"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { hiAnimeTheme } from '@/theme/theme'; // Corrected path

export default function TVShowCard({ show, variants }) {
  if (!show) return null;

  return (
    <motion.div
      variants={variants}
      className="bg-backgroundLight rounded-lg overflow-hidden shadow-lg group"
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0px 0px 15px 0px ${hiAnimeTheme.colors.accentOrange}`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={`/tv-shows/${show.id}`} className="block"> {/* Assuming a dynamic route for show details later */}
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={show.posterUrl || "https://placehold.co/400x600.png?text=No+Poster"}
            alt={`Poster for ${show.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            priority={false} // Set to true for above-the-fold images if needed
          />
        </div>
        <div className="p-4">
          <h3 
            className="text-lg font-semibold truncate group-hover:text-accentOrange transition-colors duration-200"
            style={{ color: hiAnimeTheme.colors.textPrimary }}
            title={show.title}
          >
            {show.title}
          </h3>
          <p className="text-xs mt-1" style={{ color: hiAnimeTheme.colors.textSecondary }}>
            {show.releaseYear} • {show.genre.slice(0, 2).join(', ')}
          </p>
          <div className="flex items-center mt-2">
            <Star className="w-4 h-4 mr-1" style={{ color: hiAnimeTheme.colors.accentOrange, fill: hiAnimeTheme.colors.accentOrange }} />
            <span className="text-sm font-medium" style={{ color: hiAnimeTheme.colors.textPrimary }}>
              {show.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}