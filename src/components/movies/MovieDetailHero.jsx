'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { 
  PlayCircle, 
  PlusCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download,
  Film // Placeholder for X-RAY or parental guidance
} from 'lucide-react';
import { primeTheme } from '@/theme/theme'; // Assuming this is your theme file
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.12,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const MovieDetailHero = ({ movie }) => {
  if (!movie) return null;

  const displayMovie = {
    ...movie,
    title: movie.title || "Movie Title",
    description: movie.description || "No description available.",
    backdropUrl: movie.backdropUrl || 'https://placehold.co/1920x1080?text=No+Backdrop',
    logoUrl: movie.logoUrl,
    rankInCountry: movie.rankInCountry,
    tags: movie.tags || ['UHD', 'X-RAY', 'TOP 10'], // Ensure TOP 10 is available for styling
    duration: movie.duration || 'N/A',
    year: movie.year || 'N/A',
    ageRating: movie.ageRating || '13+',
    imdbRating: movie.rating ? movie.rating.toFixed(1) : 'N/A',
    rentOptions: movie.rentOptions || [{ quality: "UHD", price: "₹279" }], // Match image
    parentalGuidanceIconUrl: movie.parentalGuidanceIconUrl, // Add this to your data
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-[80vh] md:min-h-[90vh] w-full text-white overflow-hidden" // Increased min-height
    >
      <Image
        src={displayMovie.backdropUrl}
        alt={`Backdrop for ${displayMovie.title}`}
        fill
        className="object-cover opacity-30 md:opacity-40" // Slightly more opacity
        priority
        quality={85} // Slightly higher quality
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${primeTheme.colors.backgroundDarker} 10%, rgba(15, 16, 20, 0.9) 30%, rgba(15, 16, 20, 0.4) 65%, transparent 100%)` // Adjusted gradient
        }}
      />
      
      <motion.div
        variants={contentContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end h-full pb-10 md:pb-16 lg:pb-24 space-y-3 md:space-y-4" // Increased bottom padding
      >
        <motion.div variants={itemVariants}>
          {displayMovie.logoUrl ? (
            <Image src={displayMovie.logoUrl} alt={`${displayMovie.title} logo`} width={350} height={140} className="object-contain mb-2 md:mb-3 max-h-[100px] md:max-h-[140px]" />
          ) : (
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-2xl">{displayMovie.title}</h1>
          )}
        </motion.div>

        {displayMovie.rankInCountry && (
          <motion.p variants={itemVariants} className="text-md md:text-lg font-semibold" style={{ color: primeTheme.colors.accentBlue }}>
            {displayMovie.rankInCountry}
          </motion.p>
        )}
        
        <motion.p variants={itemVariants} className="text-sm md:text-base max-w-xl lg:max-w-2xl line-clamp-3 text-gray-200 leading-relaxed">
          {displayMovie.description}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-x-3 md:gap-x-4 gap-y-2 text-xs md:text-sm text-gray-300 pt-1">
          {displayMovie.tags?.includes("TOP 10") && <Badge variant="default" className="bg-yellow-500 text-black font-semibold px-2 py-0.5 text-xs">TOP 10</Badge>}
          {displayMovie.imdbRating !== 'N/A' && <span className="font-semibold">IMDb {displayMovie.imdbRating}</span>}
          <span>{displayMovie.duration}</span>
          <span>{displayMovie.year}</span>
          {displayMovie.tags?.includes("X-RAY") && <Badge variant="outline" className="border-gray-500 text-gray-300 px-2 py-0.5 text-xs">X-RAY</Badge>}
          {displayMovie.tags?.includes("UHD") && <Badge variant="outline" className="border-gray-500 text-gray-300 px-2 py-0.5 text-xs">UHD</Badge>}
          <Badge variant="outline" className="border-gray-500 text-gray-300 px-2 py-0.5 text-xs">{displayMovie.ageRating}</Badge>
          {displayMovie.parentalGuidanceIconUrl && (
            <Image src={displayMovie.parentalGuidanceIconUrl} alt="Parental Guidance" width={16} height={16} className="opacity-70" />
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 md:gap-3 pt-3 md:pt-4">
          {/* Main Action Buttons */}
          <button className="bg-white text-black px-5 py-2.5 md:px-6 md:py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors flex items-center space-x-2 text-sm md:text-base shadow-lg">
            <PlayCircle size={22} className="mr-0.5" /> <span>Watch with Prime</span>
          </button>
          {displayMovie.rentOptions?.[0] && (
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 md:px-6 md:py-3 rounded-md font-semibold transition-colors flex items-center space-x-2 text-sm md:text-base">
              Rent {displayMovie.rentOptions[0].quality} {displayMovie.rentOptions[0].price}
            </button>
          )}
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-3 py-2.5 md:px-4 md:py-3 rounded-md font-semibold transition-colors text-sm md:text-base">
            More purchase options
          </button>
          {/* Icon Buttons */}
          <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2.5 md:p-3 rounded-full transition-colors"><PlusCircle size={20} /></button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2.5 md:p-3 rounded-full transition-colors"><ThumbsUp size={20} /></button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2.5 md:p-3 rounded-full transition-colors"><ThumbsDown size={20} /></button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2.5 md:p-3 rounded-full transition-colors"><Share2 size={20} /></button>
          </div>
        </motion.div>
        <motion.p variants={itemVariants} className="text-xs text-gray-400 pt-1">
          Watch with a Prime membership.
        </motion.p>
        {displayMovie.rentOptions && (
          <motion.p variants={itemVariants} className="text-xs text-gray-400">
            Rentals include 30 days to start watching this video and 48 hours to finish once started.
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  );
};

export default MovieDetailHero;