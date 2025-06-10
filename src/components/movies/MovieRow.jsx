'use client';

import React from 'react';
import MovieCard from './MovieCard'; // Adjust path as necessary
import { ChevronRight } from 'lucide-react';

// Placeholder theme, replace with your actual theme
const primeTheme = {
  colors: {
    accentBlueHover: '#007bff', // From page.jsx
    textPrimary: '#ffffff',
  }
};

const MovieRow = ({ title, movies, isRankedList = false, categorySlug = '#' }) => {
  if (!movies || movies.length === 0) {
    return null; // Don't render if no movies
  }

  // Determine card width for scrolling calculations or styling
  // These are approximate and can be fine-tuned with Tailwind classes
  const cardWidth = isRankedList ? 'w-60 md:w-72 lg:w-80' : 'w-40 md:w-48 lg:w-56'; 
  const rankedCardWidth = 'w-[calc(theme(spacing.60)+theme(spacing.12))] md:w-[calc(theme(spacing.72)+theme(spacing.16))]'; // Approx poster + number

  return (
    <section className="mb-6 md:mb-10">
      <div className="flex justify-between items-center mb-3 md:mb-4 px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-semibold" style={{ color: primeTheme.colors.textPrimary }}>
          {title}
        </h2>
        <a 
          href={`/movies/category/${categorySlug}`} // Example link, adjust as needed
          className="text-sm font-medium hover:underline flex items-center" 
          style={{ color: primeTheme.colors.accentBlueHover }}
        >
          See more <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
      
      <div className="relative">
        <div className="flex overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-600 scrollbar-track-transparent space-x-3 md:space-x-4 px-4 md:px-0 -mb-4">
          {movies.map((movie, index) => (
            <div 
              key={movie.id || index} 
              className={`flex-shrink-0 ${isRankedList ? rankedCardWidth : cardWidth} ${isRankedList && index === 0 ? 'ml-2' : ''} ${isRankedList && index === movies.length -1 ? 'mr-2' : ''}`}
            >
              <MovieCard 
                movie={movie} 
                isRanked={isRankedList} 
                rank={isRankedList ? index : undefined} 
              />
            </div>
          ))}
           {/* Spacer to allow last card to be fully visible if not using padding on parent */}
          <div className="flex-shrink-0 w-1 md:w-4"></div>
        </div>
      </div>
    </section>
  );
};

export default MovieRow;