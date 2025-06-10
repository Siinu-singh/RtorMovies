'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef }
from 'react';

// Import data (adjust paths if your data files are elsewhere)
import exploreData from '@/data/live-tv/explore.json';
import featuredData from '@/data/live-tv/featured.json';
import categoriesData from '@/data/live-tv/categories.json';

const LiveDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);


  const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scaleY: 0.95 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scaleY: 0.95, transition: { duration: 0.15, ease: "easeIn" } }
  };

  const renderSection = (title, items, basePath) => (
    <div className="mb-6 last:mb-0">
      <h3 className="text-sm font-semibold text-yellow-400 mb-3 uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/live/${basePath}/${item.slug}`}
              className="block text-neutral-300 hover:text-white hover:bg-neutral-700/50 px-3 py-1.5 rounded-md transition-colors duration-150 text-sm"
              onClick={onClose}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-0 mt-2 w-[600px] bg-neutral-800/95 backdrop-blur-md shadow-2xl rounded-lg p-6 z-50 border border-neutral-700"
          style={{
            // Mimic Plex dropdown position slightly offset from the "Live TV" nav item
            // You might need to adjust this based on your navbar structure
            transform: 'translateX(-20%)', // Example offset
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8">
            {/* Column 1: Explore & Featured Channels */}
            <div className="col-span-1">
              {renderSection('Explore', exploreData, 'explore')}
              {renderSection('Featured Channels', featuredData, 'featured')}
            </div>

            {/* Column 2 & 3: Categories */}
            {/* Split categories into two columns for better layout */}
            <div className="col-span-1">
              {renderSection('Categories', categoriesData.slice(0, Math.ceil(categoriesData.length / 2)), 'categories')}
            </div>
            <div className="col-span-1">
              {renderSection('', categoriesData.slice(Math.ceil(categoriesData.length / 2)), 'categories')}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveDropdown;