
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import MovieStripPS5 from '@/components/ps5/MovieStripPS5';
import FeaturesSection from '@/components/movies/FeaturesSection'; // Added import

// Placeholder SVGs for controller buttons - these are also defined in BottomControlsPS5,
// but if we wanted to pass them as props, they could be defined here or imported.
// For this example, BottomControlsPS5 now internally defines its preferred icons.

const TriangleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L2 22h20L12 2z"></path></svg>
);
const SquareIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M3 3h18v18H3V3z"></path></svg>
);
const CrossIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
        if (data.length > 0) {
          setSelectedMovie(data[0]); // Select the first movie by default
        }
      } catch (e) {
        console.error("Failed to fetch movies:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen text-white items-center justify-center">
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen text-white items-center justify-center">
        <p>Error loading movies: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen text-white overflow-hidden">
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            key={selectedMovie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-0"
          >
            <Image
              src={selectedMovie.backdropUrl || "https://placehold.co/1920x1080.png?text=No+Backdrop"}
              alt={selectedMovie.title || "Selected movie backdrop"}
              fill
              objectFit="cover"
              className="opacity-40"
              data-ai-hint="movie backdrop scene"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Top spacer for Navbar: h-16 (4rem) for navbar + mt-2 (0.5rem) for its margin = 4.5rem */}
        <div className="h-[4.5rem] flex-shrink-0" />

        {/* Main content area for movie strip and details */}
        <div className="flex-grow flex flex-col justify-end pb-8"> 
          {selectedMovie && (
            <div className="text-center mb-8 px-4 mt-8 md:mt-12"> {/* Added top margin */}
              <motion.h1 
                key={selectedMovie.id + "-title"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5}}
                className="text-4xl font-bold text-white"
              >
                {selectedMovie.title}
              </motion.h1>
            </div>
          )}
          <MovieStripPS5 movies={movies} onMovieSelect={setSelectedMovie} selectedMovieId={selectedMovie?.id} />
        </div>
        
        <FeaturesSection />
      </div>
    </div>
  );
}
