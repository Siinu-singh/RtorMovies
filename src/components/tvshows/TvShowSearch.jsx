
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "circOut", staggerChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "circOut" } },
};

export default function TvShowSearch({ onSearchChange, searchTerm }) {
  const [isFocused, setIsFocused] = useState(false);

  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  const currentSearchTerm = searchTerm !== undefined ? searchTerm : internalSearchTerm;
  const handleInputChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    } else {
      setInternalSearchTerm(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for actual search submission logic
    console.log("Search submitted:", currentSearchTerm);
  };

  return (
    <motion.div
      className="py-8 md:py-12 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        variants={itemVariants}
        className="text-2xl sm:text-3xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent"
      >
        Find Your Favorite TV Shows
      </motion.h2>

      <motion.div 
        variants={itemVariants}
        className="max-w-xl mx-auto relative"
      >
        <motion.div
          className="absolute inset-0 rounded-full p-px z-0" 
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'circOut' }}
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-[#d53369] to-[#daae51]" />
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 flex items-center gap-0 sm:gap-1 rounded-full bg-card shadow-lg backdrop-blur-sm overflow-hidden m-px"
        >
          <div className="relative flex-grow h-full">
            <Input
              type="text"
              placeholder="Search TV Shows..."
              value={currentSearchTerm}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "w-full h-12 sm:h-14 pl-6 pr-4 text-base sm:text-lg text-foreground placeholder:text-muted-foreground/60",
                "bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-full"
              )}
              aria-label="Search TV Shows"
            />
          </div>
          <div className="p-1.5 sm:p-1 flex items-center"> 
            <Button
              type="submit"
              size="icon"
              className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 rounded-full text-primary-foreground shadow-md transition-all duration-300 ease-in-out",
                "bg-gradient-to-r from-primary via-orange-500 to-orange-600 hover:shadow-primary/40 hover:shadow-lg hover:brightness-110 active:scale-95"
              )}
              aria-label="Search"
            >
              <Search size={20} />
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
