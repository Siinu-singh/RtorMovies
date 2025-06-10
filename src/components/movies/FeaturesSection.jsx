"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

const mainHeroMovie = {
  title: "THE WITCHER",
  season: "Season 1",
  rating: 4.5, 
  genres: ["Crime", "Drama", "Mystery"],
  description: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
  backgroundImageUrl: "https://images.unsplash.com/photo-1589386097996-195942005f0d?auto=format&fit=crop&w=1920&q=80&blend=000000&bm=multiply&balph=50", // Darkened placeholder
  posterUrl: "https://images.unsplash.com/photo-1602704670003-553092f7501a?auto=format&fit=crop&w=200&h=300&q=80" // Placeholder Witcher poster
};

const StarRating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`w-5 h-5 ${starValue <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
          />
        );
      })}
      <span className="ml-2 text-sm text-gray-300">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function MovieHeroSection() { // Renamed component for clarity, file name remains FeaturesSection.jsx
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        // Ensure the main hero movie is also in the carousel, or add it
        const moviesWithHero = [
          { id: 'hero-witcher', title: mainHeroMovie.title, poster_path: mainHeroMovie.posterUrl, isHeroPlaceholder: true },
          ...data.slice(0, 9) // Take up to 9 other movies
        ];
        setCarouselMovies(moviesWithHero);
      } catch (error) {
        console.error("Error fetching carousel movies:", error);
        // Fallback data in case of API error
        setCarouselMovies([
          { id: 'hero-witcher', title: mainHeroMovie.title, poster_path: mainHeroMovie.posterUrl, isHeroPlaceholder: true },
          { id: 'daredevil', title: 'Daredevil', poster_path: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd84627?w=200&h=300', isHeroPlaceholder: false },
          { id: 'narcos', title: 'Narcos', poster_path: 'https://images.unsplash.com/photo-1587300003489-559951588957?w=200&h=300', isHeroPlaceholder: false },
          { id: 'jessica', title: 'Jessica Jones', poster_path: 'https://images.unsplash.com/photo-1635805737704-445951515a20?w=200&h=300', isHeroPlaceholder: false },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const getImageUrl = (path, isPlaceholder = false) => {
    if (isPlaceholder || path?.startsWith('http')) return path;
    return path ? `https://image.tmdb.org/t/p/w300${path}` : 'https://via.placeholder.com/200x300?text=No+Image';
  }

  return (
    <section className="relative bg-black text-white min-h-[80vh] md:min-h-[90vh] flex flex-col justify-between -mx-4 md:-mx-8 -mt-8">
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={mainHeroMovie.backgroundImageUrl}
          alt={mainHeroMovie.title}
          layout="fill"
          objectFit="cover"
          quality={85}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 pt-24 md:pt-32 lg:pt-40 flex-grow flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase">
            {mainHeroMovie.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-1 md:mt-2 mb-3 md:mb-4">{mainHeroMovie.season}</p>
          
          <div className="mb-3 md:mb-4">
            <StarRating rating={mainHeroMovie.rating} />
          </div>
          
          <div className="flex space-x-2 mb-4 md:mb-6">
            {mainHeroMovie.genres.map(genre => (
              <span key={genre} className="text-xs md:text-sm text-gray-400 border border-gray-600 px-2 py-1 rounded-full">
                {genre}
              </span>
            ))}
          </div>

          <p className="max-w-xl text-sm md:text-base text-gray-300 leading-relaxed mb-6 md:mb-8">
            {mainHeroMovie.description}
          </p>

          <div className="flex space-x-3 md:space-x-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-6 py-3">
              <Play className="mr-2 h-5 w-5 md:h-6 md:w-6" /> Play
            </Button>
            <Button variant="outline" size="lg" className="border-gray-400 text-white hover:bg-white/10 px-6 py-3">
              <Plus className="mr-2 h-5 w-5 md:h-6 md:w-6" /> My List
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Movie Carousel */}
      <div className="relative z-10 pb-8 md:pb-12 pt-6 md:pt-8 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="container mx-auto px-4 md:px-8 relative">
          <AnimatePresence>
            {!isLoading && carouselMovies.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center"
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-0 md:-left-4 z-20 text-white bg-black/30 hover:bg-black/60 backdrop-blur-sm hidden md:inline-flex"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <div ref={scrollContainerRef} className="flex space-x-3 md:space-x-4 overflow-x-auto scrollbar-hide py-2 px-1 -mx-1">
                  {carouselMovies.map((movie, index) => (
                    <motion.div
                      key={movie.id || index}
                      className={`flex-shrink-0 w-[100px] h-[150px] sm:w-[120px] sm:h-[180px] md:w-[140px] md:h-[210px] rounded-md overflow-hidden 
                                  ${movie.isHeroPlaceholder ? 'border-2 border-sky-400 shadow-lg shadow-sky-500/50' : 'border-2 border-transparent hover:border-sky-500/70'}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.05 }}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    >
                      <Image
                        src={getImageUrl(movie.poster_path, movie.isHeroPlaceholder)}
                        alt={movie.title}
                        width={140}
                        height={210}
                        className="object-cover w-full h-full"
                        unoptimized={movie.poster_path?.startsWith('http')} // if it's a full URL (placeholder), don't optimize
                      />
                    </motion.div>
                  ))}
                </div>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 md:-right-4 z-20 text-white bg-black/30 hover:bg-black/60 backdrop-blur-sm hidden md:inline-flex"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {isLoading && (
            <div className="h-[150px] sm:h-[180px] md:h-[210px] flex items-center justify-center">
              <p className="text-gray-400">Loading movies...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
