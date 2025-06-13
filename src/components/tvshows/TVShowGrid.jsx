
'use client';

import TvShowCard from './TVShowCard';
import { motion, AnimatePresence } from 'framer-motion';

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // This will be overridden by TvShowCard's individual delay
    },
  },
};

export default function TvShowGrid({ tvShows }) {
  if (!tvShows || tvShows.length === 0) {
    return <p className="text-center text-muted-foreground py-10 text-lg">No TV shows match your criteria.</p>;
  }

  return (
    <motion.div
      key={tvShows.map(s => s.id).join('-')} // Force re-render for AnimatePresence on filter change
      variants={gridVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-4"
    >
      <AnimatePresence>
        {tvShows.map((tvShow, index) => (
          <TvShowCard key={tvShow.id} tvShow={tvShow} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
