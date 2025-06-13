
'use client';

import { motion } from 'framer-motion';

export default function TvGradientHeading({ text }) {
  return (
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold text-center py-8 md:py-12 bg-gradient-to-r from-[#d53369] to-[#daae51] bg-clip-text text-transparent"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "circOut" }}
    >
      {text}
    </motion.h1>
  );
}
