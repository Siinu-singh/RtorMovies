
"use client";

import React, { useEffect } from 'react';
import MovieCardPS5 from './MovieCardPS5';

export default function MovieStripPS5({ movies, onMovieSelect, selectedMovieId }) {
  useEffect(() => {
    // Auto-select the first movie if none is selected and movies are available
    if (!selectedMovieId && movies && movies.length > 0 && typeof onMovieSelect === 'function') {
      onMovieSelect(movies[0]);
    }
  }, [movies, selectedMovieId, onMovieSelect]);

  if (!movies || movies.length === 0) {
    return <div className="h-[200px] flex items-center justify-center text-gray-400">Loading movies or none available...</div>;
  }

  // Index of the selected movie in the original list for styling adjacent cards
  const selectedIndex = movies.findIndex(movie => movie.id === selectedMovieId);

  return (
    <div
      className="relative w-full flex items-center group py-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 hover:scrollbar-thumb-slate-600 scrollbar-track-transparent px-4"
    >
      <div
        className="flex items-center space-x-3 sm:space-x-4" 
      >
        {movies.map((movie, index) => {
          const isSelected = selectedMovieId === movie.id;
          
          let isAdjacent = false;
          if (selectedIndex !== -1) { // Check if a movie is selected
            const prevIndex = selectedIndex - 1;
            const nextIndex = selectedIndex + 1;
            // Check if the current card is immediately before or after the selected card
            if (index === prevIndex || index === nextIndex) {
              isAdjacent = true;
            }
          }
          
          return (
            <MovieCardPS5
              key={movie.id} 
              movie={movie}
              onSelect={() => typeof onMovieSelect === 'function' && onMovieSelect(movie)}
              isSelected={isSelected}
              isAdjacentToSelected={isAdjacent && !isSelected} // Adjacent only if not the selected card itself
            />
          );
        })}
      </div>
    </div>
  );
}
