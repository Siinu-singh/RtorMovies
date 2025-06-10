'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Plus, ChevronDown } from 'lucide-react'; // Assuming lucide-react for icons

// Placeholder theme, replace with your actual theme
const primeTheme = {
  colors: {
    accentBlue: '#00a8e1',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    backgroundDark: '#1a1a1a', // A bit lighter for card elements if needed
    backgroundCardHover: '#2c2c2c', // Example hover color
  }
};

const MovieCard = ({ movie, isRanked = false, rank }) => {
  if (!movie) return null;

  return (
    <div 
      className={`group relative aspect-[2/3] bg-gray-800 rounded-md overflow-hidden shadow-lg 
                  transform transition-all duration-300 ease-in-out 
                  hover:scale-105 hover:shadow-xl hover:z-10 
                  ${isRanked ? 'flex items-end' : ''}`}
      style={{ backgroundColor: primeTheme.colors.backgroundDark }}
    >
      {isRanked && rank !== undefined && (
        <div 
          className="absolute left-0 bottom-0 z-10 text-white font-bold
                     transform -translate-x-1/3 translate-y-1/4" // Adjust for precise overlap
          style={{ 
            fontSize: 'clamp(6rem, 15vw, 10rem)', // Responsive font size
            lineHeight: '0.7',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            color: '#A9A9A9' // A slightly off-white for the number
          }}
        >
          {rank + 1}
        </div>
      )}
      
      <Image
        src={movie.posterUrl || 'https://placehold.co/400x600?text=No+Image'}
        alt={movie.title || 'Movie poster'}
        fill
        className={`object-cover transition-opacity duration-300 ${isRanked ? 'relative z-0 ml-[30%]' : ''} group-hover:opacity-70`} // Adjust margin for ranked, added object-cover
        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
      />

      {/* Hover Overlay Content - Not shown for ranked cards in the reference image style */}
      {!isRanked && (
        <div 
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 
                     transition-all duration-300 ease-in-out p-3
                     flex flex-col justify-end opacity-0 group-hover:opacity-100"
        >
          <h3 className="text-md lg:text-lg font-semibold text-white mb-1 line-clamp-2">{movie.title}</h3>
          
          <div className="flex items-center justify-between mb-2">
            <button 
              className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={`Play ${movie.title}`}
            >
              <Play size={18} />
            </button>
            <div className="flex items-center space-x-1">
              <button 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                aria-label={`Add ${movie.title} to watchlist`}
              >
                <Plus size={18} />
              </button>
              <button 
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-colors"
                aria-label={`More info for ${movie.title}`}
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-300 space-x-2">
            <span>{movie.year}</span>
            {movie.duration && <span>• {movie.duration}</span>}
            {/* Placeholder for Age Rating */}
            {movie.ageRating && <span className="border border-gray-500 px-1 rounded-sm text-xs">{movie.ageRating}</span>}
          </div>
          {movie.genre && Array.isArray(movie.genre) && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              {movie.genre.slice(0, 2).join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieCard;