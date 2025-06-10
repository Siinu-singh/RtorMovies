"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import TVShowCardPrime from './TVShowCardPrime'; // Correctly points to the new card
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { primeTheme } from '@/theme/theme';

const rowContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function TVShowRow({ title, shows }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -scrollRef.current.offsetWidth * 0.7 : scrollRef.current.offsetWidth * 0.7;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!shows || shows.length === 0) {
    return null; // Or some placeholder if a row title is present but no shows
  }

  return (
    <section className="mb-8 md:mb-12 relative group">
      <div className="flex justify-between items-center mb-3 px-4 md:px-0">
        <h2 className="text-xl md:text-2xl font-semibold" style={{ color: primeTheme.colors.textPrimary }}>{title}</h2>
        <a href="#" className="text-sm font-medium hover:underline" style={{ color: primeTheme.colors.accentBlueHover }}>
          See more &amp;gt;
        </a>
      </div>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block -ml-4"
          aria-label="Scroll left"
        >
          <ChevronLeft size={28} />
        </button>
        <motion.div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-3 md:space-x-4 pb-4 -mb-4 px-4 md:px-0 scrollbar-hide" // scrollbar-hide for cleaner look
          variants={rowContainerVariants}
          initial="hidden"
          animate="visible" // Can also use whileInView for scroll-triggered animation
        >
          {shows.map((show) => (
            // Using a new TVShowCardPrime which will have the Prime Video style
            <TVShowCardPrime key={show.id} show={show} variants={cardVariants} />
          ))}
        </motion.div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block -mr-4"
          aria-label="Scroll right"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}