"use client";

import { motion } from 'framer-motion';
import TVShowCard from './TVShowCard';

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for each child
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function TVShowGrid({ shows }) {
  if (!shows || shows.length === 0) {
    return <p className="text-textSecondary text-center py-10">No TV shows found.</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {shows.map((show) => (
        <TVShowCard key={show.id} show={show} variants={cardVariants} />
      ))}
    </motion.div>
  );
}