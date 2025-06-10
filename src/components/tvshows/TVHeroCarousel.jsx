"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Assuming you have this
import { Play, Plus, Info } from 'lucide-react';
import { primeTheme } from '@/theme/theme';

const slideVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] } },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
};

export default function TVHeroCarousel({ shows }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!shows || shows.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shows.length);
    }, 7000); // Change slide every 7 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, shows]);

  if (!shows || shows.length === 0) {
    return (
      <div className="h-[70vh] w-full flex items-center justify-center" style={{backgroundColor: primeTheme.colors.backgroundDark}}>
        <p style={{color: primeTheme.colors.textSecondary}}>No hero shows available.</p>
      </div>
    );
  }

  const currentShow = shows[currentIndex];

  return (
    <div className="relative h-[70vh] w-full overflow-hidden" style={{backgroundColor: primeTheme.colors.black }}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentShow.id}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={currentShow.backdropUrl || "https://placehold.co/1920x1080/0F171E/FFFFFF?text=Backdrop"}
            alt={`Backdrop for ${currentShow.title}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={currentIndex === 0}
          />
          <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to right, rgba(15,23,30,0.9) 0%, rgba(15,23,30,0.7) 30%, rgba(15,23,30,0.3) 60%, transparent 100%)'
            }}
          />
           <div 
            className="absolute inset-0" 
            style={{
              background: 'linear-gradient(to top, rgba(15,23,30,0.8) 0%, transparent 50%)'
            }}
          />

          <motion.div 
            variants={contentVariants}
            initial="initial"
            animate="animate"
            className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16 max-w-2xl z-10"
          >
            {/* Show Logo or Title - Prime often uses a stylized logo image here */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3" style={{ color: primeTheme.colors.textPrimary }}>
              {currentShow.title}
            </h1>
            
            <div className="flex items-center space-x-2 mb-3 text-sm">
              {currentShow.genre.slice(0,2).map(g => (
                <span key={g} style={{color: primeTheme.colors.textSecondary}}>{g}</span>
              ))}
              {currentShow.genre.length > 2 && <span style={{color: primeTheme.colors.textSecondary}}>• ...</span>}
            </div>

            <p className="text-sm md:text-base mb-4 line-clamp-3" style={{ color: primeTheme.colors.textSecondary }}>
              {currentShow.description}
            </p>

            <div className="flex items-center space-x-3">
              <Button 
                asChild
                className="px-6 py-3 text-base font-semibold rounded-sm"
                style={{ backgroundColor: primeTheme.colors.white, color: primeTheme.colors.black }}
              >
                <Link href={`/tv-shows/${currentShow.id}/play`}> {/* Example play link */}
                  <Play className="mr-2 h-5 w-5 fill-black" /> Play
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-2 p-2"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: primeTheme.colors.white, backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <Plus className="h-6 w-6" />
                <span className="sr-only">Add to Watchlist</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full border-2 p-2"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: primeTheme.colors.white, backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                <Info className="h-6 w-6" />
                <span className="sr-only">More Info</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {shows.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-white' : 'bg-gray-500/70 hover:bg-gray-400/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}