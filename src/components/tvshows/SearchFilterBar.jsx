"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { hiAnimeTheme } from '@/theme/theme'; // Path should be correct if @ points to src

export default function SearchFilterBar({ onSearchChange }) { // onSearchChange can be used later for actual filtering
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-8 p-4 rounded-lg relative"
      style={{ backgroundColor: hiAnimeTheme.colors.backgroundLight }}
    >
      <div className="relative flex items-center">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" 
          style={{ color: hiAnimeTheme.colors.textSecondary }} 
        />
        <input
          type="text"
          placeholder="Search TV shows by title, genre..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-3 pl-10 rounded-md focus:ring-2 focus:outline-none"
          style={{
            backgroundColor: hiAnimeTheme.colors.backgroundDark,
            color: hiAnimeTheme.colors.textPrimary,
            borderColor: hiAnimeTheme.colors.accentOrange, // Initial border, focus ring will be accentOrange
            ringColor: hiAnimeTheme.colors.accentOrange, // For the focus ring
          }}
        />
      </div>
      {/* Placeholder for filter buttons/dropdowns */}
      {/* 
      <div className="mt-4 flex space-x-2">
        <button style={{backgroundColor: hiAnimeTheme.colors.accentBlue, color: hiAnimeTheme.colors.textPrimary}} className="px-3 py-1 rounded text-sm">Genre</button>
        <button style={{backgroundColor: hiAnimeTheme.colors.accentTeal, color: hiAnimeTheme.colors.textPrimary}} className="px-3 py-1 rounded text-sm">Rating</button>
      </div> 
      */}
    </motion.div>
  );
}