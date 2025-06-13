'use client';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import TvCategoryTile from "@/components/tvshows/TvCategoryTile";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export default function TvCategorySection({ genres, selectedGenre, onSelectGenre }) {
  if (!genres || genres.length === 0) {
    return null;
  }

  const allGenresOption = "All Shows";

  return (
    <div className="mb-8 md:mb-12 px-4 overflow-hidden px-[60px]">
      <h2 className={cn(
        "text-xl font-semibold mb-4",
        "bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent"
      )}>Categories</h2>
      <div className="flex flex-nowrap overflow-x-auto hide-scrollbar gap-3 py-2">
        <motion.div
          className="flex space-x-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <TvCategoryTile
            genre={allGenresOption}
            isActive={selectedGenre === null || selectedGenre === allGenresOption}
            onSelectGenre={() => onSelectGenre(allGenresOption)}
          />
          {genres.map((genre) => (
            <motion.div key={genre} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <TvCategoryTile
                genre={genre}
                isActive={selectedGenre === genre}
                onSelectGenre={onSelectGenre}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
