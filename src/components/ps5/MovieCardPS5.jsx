
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/utils/Utils';

export default function MovieCardPS5({ movie, onSelect, isSelected, isAdjacentToSelected }) {
  if (!movie) {
    return null;
  }

  // Determine animation scale (when NOT hovered)
  let animateScale = 1;
  if (isSelected) {
    animateScale = 1.1;
  } else if (isAdjacentToSelected) {
    animateScale = 1.05; 
  }

  // Determine hover scale
  let hoverTargetScale;
  if (isSelected) {
    hoverTargetScale = 1.1; // No further scaling on hover if already selected
  } else if (isAdjacentToSelected) {
    hoverTargetScale = 1.20; // Further increased hover scale for adjacent cards
  } else {
    hoverTargetScale = 1.18; // Further increased hover scale for default cards
  }


  return (
    <motion.div
      data-movie-id={movie.id}
      onClick={onSelect}
      className={cn(
        "relative flex-shrink-0 w-[130px] h-[180px] sm:w-[150px] sm:h-[210px] rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ease-in-out",
        isSelected ? "border-blue-500 shadow-2xl" : "border-transparent hover:border-gray-600"
      )}
      animate={{ scale: animateScale }}
      whileHover={{ scale: hoverTargetScale }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      <Image
        src={movie.posterUrl || "https://placehold.co/200x300.png?text=No+Poster"}
        alt={movie.title || "Movie poster"}
        fill
        objectFit="cover"
        className="transition-opacity duration-300"
        data-ai-hint="movie poster game"
        priority={isSelected} // Prioritize loading image for selected card
      />
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/30 pointer-events-none"
        />
      )}
    </motion.div>
  );
}

