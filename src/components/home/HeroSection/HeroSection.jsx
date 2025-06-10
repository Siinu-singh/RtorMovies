"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play, Flame, Swords, Heart, Film, Ghost, Star as StarIcon, Tv2, ChevronRight } from 'lucide-react'; // Star renamed to StarIcon to avoid conflict if used as component name
import { motion, AnimatePresence } from 'framer-motion';

const featuredMovies = [
  {
    id: 'featured1',
    title: 'The Adventure of Blue Sword',
    src: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Placeholder
    alt: 'The Adventure of Blue Sword',
  },
  {
    id: 'featured2',
    title: "Recalling the journey of Dol's exciting story",
    src: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Placeholder
    alt: "Si Dol Movie",
  }
];

const categories = [
  { name: 'Trending', icon: Flame, href: '#' },
  { name: 'Action', icon: Swords, href: '#' },
  { name: 'Romance', icon: Heart, href: '#' },
  { name: 'Animation', icon: Film, href: '#' },
  { name: 'Horror', icon: Ghost, href: '#' },
  { name: 'Special', icon: StarIcon, href: '#' },
  { name: 'Drakor', icon: Tv2, href: '#' },
];

const trendingAnimationMovies = [
  { id: 1, title: 'Loetoeng Kasaroeng', year: '2023', rating: '7.8', src: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd84627?auto=format&fit=crop&w=200&q=60', alt: 'Loetoeng Kasaroeng' },
  { id: 2, title: 'Gajah Langka', year: '2023', rating: '6.0', src: 'https://images.unsplash.com/photo-1587300003489-559951588957?auto=format&fit=crop&w=200&q=60', alt: 'Gajah Langka' },
  { id: 3, title: 'Si Kang Satay', year: '2023', rating: '7.1', src: 'https://images.unsplash.com/photo-1635805737704-445951515a20?auto=format&fit=crop&w=200&q=60', alt: 'Si Kang Satay' },
  { id: 4, title: 'Mommy Cat', year: '2023', rating: '7.8', src: 'https://images.unsplash.com/photo-1611604548018-d864129f1099?auto=format&fit=crop&w=200&q=60', alt: 'Mommy Cat' },
  { id: 5, title: 'Hijaber Cantiq', year: '2023', rating: '6.1', src: 'https://images.unsplash.com/photo-1607462154517-47260768f335?auto=format&fit=crop&w=200&q=60', alt: 'Hijaber Cantiq' },
  { id: 6, title: 'Xatra-X', year: '2022', rating: '6.5', src: 'https://images.unsplash.com/photo-1620146103001-14595504c800?auto=format&fit=crop&w=200&q=60', alt: 'Xatra-X' },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId);
  }, [featuredMovies.length]);

  const currentMovie = featuredMovies[currentIndex];
  const slideVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }
    })
  };


  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-white py-8 md:py-12 -mx-4 md:-mx-8 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Top Featured Movies Section - Now a Carousel */}
        <div className="relative w-full aspect-[16/8] rounded-xl overflow-hidden shadow-2xl mb-10 md:mb-16 group">
          <AnimatePresence initial={false} custom={currentIndex}>
            <motion.div
              key={currentIndex} // Important for AnimatePresence to detect changes
              custom={currentIndex > 0 ? 1 : -1} // Simple direction, can be improved
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0" // Make slides overlay
            >
              <Image
                src={currentMovie.src}
                alt={currentMovie.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                priority={currentIndex === 0} // Prioritize first image
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-8 flex flex-col justify-end">
                <motion.h2
                  key={currentMovie.id + "-title"} // Ensure text also animates
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }} // Slightly delayed after slide
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg"
                >
                  {currentMovie.title}
                </motion.h2>
                <motion.div
                  key={currentMovie.id + "-button"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }} // Slightly delayed after title
                >
                  <Button variant="secondary" size="lg" className="bg-white/90 hover:bg-white text-slate-900 w-fit backdrop-blur-sm">
                    <Play className="mr-2 h-5 w-5" />
                    Let Play Movie
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category Filters Section */}
        <div className="mb-10 md:mb-16">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            {categories.map(category => (
              <Button 
                key={category.name} 
                variant="outline" 
                className="bg-slate-800/70 hover:bg-slate-700/90 border-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg backdrop-blur-sm"
                asChild
              >
                <a href={category.href}>
                  <category.icon className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {category.name}
                </a>
              </Button>
            ))}
          </div>
        </div>

        {/* Trending in Animation Section */}
        <div>
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white">Trending in Animation</h3>
            <Button variant="link" className="text-sky-400 hover:text-sky-300 px-0">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {trendingAnimationMovies.map(movie => (
              <div key={movie.id} className="bg-slate-800/70 rounded-lg overflow-hidden group shadow-lg transition-all hover:shadow-sky-500/30 hover:scale-[1.02]">
                <div className="aspect-[2/3] relative">
                  <Image 
                    src={movie.src} 
                    alt={movie.alt} 
                    layout="fill" 
                    objectFit="cover" 
                    className="group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>
                <div className="p-2.5 md:p-3">
                  <h4 className="text-sm md:text-base font-semibold text-white truncate mb-1" title={movie.title}>{movie.title}</h4>
                  <div className="text-xs text-slate-400 flex items-center">
                    <StarIcon className="w-3 h-3 mr-1 text-yellow-400 fill-yellow-400" />
                    <span>{movie.rating}</span>
                    <span className="mx-1.5">|</span>
                    <span>{movie.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
