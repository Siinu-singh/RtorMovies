'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus, Play, Info } from 'lucide-react'; // Assuming lucide-react for icons

// Placeholder theme, replace with your actual theme
const primeTheme = {
  colors: {
    accentBlue: '#00a8e1',
    accentBlueHover: '#007bff',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    backgroundDark: '#1a1a1a',
    backgroundDarker: '#0f1014', // From page.jsx
    overlayGradient: 'linear-gradient(to top, rgba(15, 16, 20, 1) 0%, rgba(15, 16, 20, 0.8) 20%, rgba(15, 16, 20, 0) 60%)',
  }
};

const MovieHeroCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define handleNext and handlePrev early, ensure movies.length is checked inside them if movies can be undefined initially
  const handleNext = () => {
    if (movies && movies.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }
  };

  const handlePrev = () => {
    if (movies && movies.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
    }
  };

  // Auto-scroll (optional)
  // This useEffect will now always be called. The logic inside handles the conditions.
  useEffect(() => {
    if (!isClient || !movies || movies.length === 0) {
      return; // Do nothing if not ready
    }

    const timer = setTimeout(() => {
      handleNext();
    }, 7000); // Change slide every 7 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, movies, isClient]); // Add movies and isClient to dependencies

  if (!isClient || !movies || movies.length === 0) {
    return (
      <div className="h-[70vh] bg-gray-800 flex items-center justify-center text-white text-3xl">
        Loading Hero...
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };


  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden" style={{ backgroundColor: primeTheme.colors.backgroundDarker }}>
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              handleNext();
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrev();
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          {currentMovie.backdropUrl && (
            <Image
              src={currentMovie.backdropUrl}
              alt={currentMovie.title || 'Movie backdrop'}
              fill
              quality={85}
              priority={currentIndex === 0} // Prioritize loading the first image
              className="object-cover opacity-70" // Added object-cover
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: primeTheme.colors.overlayGradient }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full md:w-2/3 lg:w-1/2 p-4 md:p-8 lg:p-12 pb-8 md:pb-16 lg:pb-24 z-10 text-white">
        {/* Movie Logo/Title - Assuming you might have a logo URL, otherwise use title */}
        {currentMovie.logoUrl ? (
          <Image src={currentMovie.logoUrl} alt={`${currentMovie.title} logo`} width={300} height={150} className="mb-3 md:mb-4 h-auto object-contain" /> // Added object-contain for logos
        ) : (
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 drop-shadow-lg" style={{ color: primeTheme.colors.textPrimary }}>
            {currentMovie.title}
          </h1>
        )}

        {/* Rank/Badge - Placeholder */}
        {currentMovie.rank && (
          <p className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{ color: primeTheme.colors.accentBlue }}>
            {currentMovie.rank}
          </p>
        )}
        
        <p className="text-sm md:text-base lg:text-lg mb-3 md:mb-4 line-clamp-3" style={{ color: primeTheme.colors.textSecondary }}>
          {currentMovie.description}
        </p>

        <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
          <button 
            className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors flex items-center space-x-2 text-sm md:text-base"
            style={{ minWidth: '140px' }}
          >
            <Play size={20} className="mr-1" /> Watch now
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 rounded-full transition-colors">
            <Plus size={20} md={24} />
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 md:p-3 rounded-full transition-colors">
            <Info size={20} md={24} />
          </button>
        </div>

        <p className="text-xs md:text-sm mb-1" style={{ color: primeTheme.colors.textSecondary }}>Watch with a Prime membership</p>
        
        <div className="flex items-center space-x-2 text-xs md:text-sm" style={{ color: primeTheme.colors.textSecondary }}>
          <span>{currentMovie.duration}</span>
          <span>•</span>
          <span>{currentMovie.year}</span>
          {/* Placeholder for Age Rating */}
          {currentMovie.ageRating && (
            <>
              <span>•</span>
              <span className="border border-gray-500 px-1 rounded-sm">{currentMovie.ageRating}</span>
            </>
          )}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-300
              ${currentIndex === index ? 'bg-white' : 'bg-gray-500 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next Arrows (optional, can be hidden on mobile) */}
      <button 
        onClick={handlePrev} 
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 md:p-3 rounded-full z-20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} md={30} />
      </button>
      <button 
        onClick={handleNext} 
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 md:p-3 rounded-full z-20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} md={30} />
      </button>
    </div>
  );
};

export default MovieHeroCarousel;