"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Plus, ChevronDown } from 'lucide-react'; // ChevronDown for more info
import { primeTheme } from '@/theme/theme';

export default function TVShowCardPrime({ show, variants }) {
  if (!show) return null;

  return (
    <motion.div
      variants={variants}
      className="relative flex-shrink-0 w-[160px] md:w-[180px] lg:w-[200px] aspect-[16/9] rounded overflow-hidden group cursor-pointer"
      style={{ backgroundColor: primeTheme.colors.backgroundLight }}
      whileHover="hover" // Define a hover state for parent to control children
    >
      <Link href={`/tv-shows/${show.id}`} className="block w-full h-full">
        <Image
          src={show.posterUrl || "https://placehold.co/320x180/191E25/FFFFFF?text=Poster"}
          alt={`Poster for ${show.title}`}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        
        {/* Prime-like overlay on hover - simplified */}
        <motion.div
          className="absolute inset-0 bg-black/70 p-3 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 1, transition: { duration: 0.3 } }
          }}
        >
          <h3 
            className="text-sm font-semibold line-clamp-2 mb-1"
            style={{ color: primeTheme.colors.textPrimary }}
          >
            {show.title}
          </h3>
          <div className="flex items-center space-x-2 mt-auto">
            <button 
              className="p-1.5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: primeTheme.colors.white, color: primeTheme.colors.black}}
              onClick={(e) => { e.preventDefault(); alert(`Play ${show.title}`); }} // Prevent link navigation
              aria-label="Play"
            >
              <Play size={16} className="fill-black" />
            </button>
            <button 
              className="p-1.5 rounded-full border"
              style={{ 
                backgroundColor: 'rgba(40,40,40,0.7)', 
                borderColor: primeTheme.colors.textSecondary, 
                color: primeTheme.colors.textPrimary 
              }}
              onClick={(e) => { e.preventDefault(); alert(`Add ${show.title} to watchlist`); }}
              aria-label="Add to watchlist"
            >
              <Plus size={16} />
            </button>
             <button 
              className="p-1.5 rounded-full border ml-auto" // ml-auto to push to the right
              style={{ 
                backgroundColor: 'rgba(40,40,40,0.7)', 
                borderColor: primeTheme.colors.textSecondary, 
                color: primeTheme.colors.textPrimary 
              }}
              onClick={(e) => { e.preventDefault(); alert(`More info for ${show.title}`); }}
              aria-label="More info"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}