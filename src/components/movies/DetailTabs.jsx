'use client';

import React, { useState } from 'react';
// Assuming MovieRow is the horizontal scrolling list from the new movies page
import MovieRow from '@/components/movies/MovieRow'; 
import { primeTheme } from '@/theme/theme';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; // Added for episode thumbnails
import { ChevronDown, PlayCircle } from 'lucide-react'; // For sort button and play icon

const DetailTabs = ({ movie, relatedMovies, tvShowEpisodes }) => {
  const isTVShow = !!(tvShowEpisodes && tvShowEpisodes.length > 0 || movie?.type === 'tv');
  const [activeTab, setActiveTab] = useState(isTVShow ? 'episodes' : 'related');

  const tabButtonVariants = {
    initial: { opacity: 0.7 },
    hover: { opacity: 1, transition: { duration: 0.2 } },
    active: { opacity: 1 },
  };

  const tabContentVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } },
  };
  
  // Placeholder for season selection and sorting - state would be needed
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc' for episode order

  const TabButton = ({ label, tabName }) => (
    <motion.button
      variants={tabButtonVariants}
      initial="initial"
      whileHover="hover"
      animate={activeTab === tabName ? "active" : "initial"}
      onClick={() => setActiveTab(tabName)}
      className={`whitespace-nowrap pb-3 md:pb-4 px-1 border-b-2 font-medium text-base md:text-lg transition-colors focus:outline-none relative
        ${activeTab === tabName ? 'border-sky-400 text-sky-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}
    >
      {label}
      {activeTab === tabName && (
        <motion.div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-sky-400" layoutId="underline" />
      )}
    </motion.button>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10" style={{ backgroundColor: primeTheme.colors.backgroundDarker, color: primeTheme.colors.textPrimary }}>
      <div className="border-b border-gray-700/50 mb-6 md:mb-8">
        <nav className="-mb-px flex space-x-5 md:space-x-8" aria-label="Tabs">
          {isTVShow && <TabButton label="Episodes" tabName="episodes" />}
          <TabButton label="Related" tabName="related" />
          <TabButton label="Details" tabName="details" />
        </nav>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'episodes' && isTVShow && (
          <motion.div key="episodes" variants={tabContentVariants} initial="initial" animate="animate" exit="exit">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-white">Episodes</h3>
              {/* Placeholder for Season Selector & Sort */}
              <button className="flex items-center text-gray-300 hover:text-white text-sm md:text-base p-2 rounded-md bg-gray-700/50 hover:bg-gray-600/70 transition-colors">
                Sort <ChevronDown size={18} className="ml-1.5" />
              </button>
            </div>
            {tvShowEpisodes && tvShowEpisodes.length > 0 ? (
              <div className="space-y-4 md:space-y-5">
                {tvShowEpisodes
                  // .filter(ep => ep.seasonNumber === selectedSeason) // Example season filter
                  // .sort((a,b) => sortOrder === 'asc' ? a.episodeNumber - b.episodeNumber : b.episodeNumber - a.episodeNumber) // Example sort
                  .map((episode, index) => (
                  <motion.div
                    key={episode.id || index}
                    className="bg-gray-800/60 hover:bg-gray-700/80 p-3 md:p-4 rounded-lg flex items-center space-x-3 md:space-x-4 transition-colors cursor-pointer group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <div className="flex-shrink-0 w-32 h-20 md:w-40 md:h-24 bg-gray-700 rounded-md overflow-hidden relative">
                      {episode.thumbnailUrl && (
                        <Image src={episode.thumbnailUrl} alt={episode.title || 'Episode thumbnail'} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle size={36} className="text-white/80" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm md:text-base font-semibold text-white mb-0.5 md:mb-1 group-hover:text-sky-400 transition-colors">{`S${episode.seasonNumber} E${episode.episodeNumber} - ${episode.title}`}</h4>
                      <p className="text-xs text-gray-400 mb-1 md:mb-1.5">{episode.airDate ? `${episode.airDate} • ` : ''}{episode.duration} {episode.ageRating && `• ${episode.ageRating}`}</p>
                      <p className="text-xs md:text-sm text-gray-400 line-clamp-2 md:line-clamp-3">{episode.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : <p className="text-gray-400">No episodes available.</p>}
          </motion.div>
        )}

        {activeTab === 'related' && (
          <motion.div key="related" variants={tabContentVariants} initial="initial" animate="animate" exit="exit">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">Customers also watched</h3>
            {relatedMovies && relatedMovies.length > 0 ? (
              <MovieRow movies={relatedMovies} title="" categorySlug="related-items" isRankedList={false} />
            ) : <p className="text-gray-400">No related content found.</p>}
          </motion.div>
        )}

        {activeTab === 'details' && movie && (
          <motion.div key="details" variants={tabContentVariants} initial="initial" animate="animate" exit="exit" className="text-gray-300 space-y-5 md:space-y-6 max-w-3xl">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Synopsis</h3>
              <p className="leading-relaxed text-sm md:text-base">{movie.description || "Not available."}</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Cast & Crew</h3>
              <p className="text-sm md:text-base">
                <strong>Starring:</strong> {movie.cast?.join(', ') || "Not available."}
              </p>
              {/* Add Directors, Writers if available in your data */}
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">Genres</h3>
              <p className="text-sm md:text-base">{movie.genre?.join(', ') || "Not available."}</p>
            </motion.div>
             {/* Add more details like Audio Languages, Subtitles, etc. */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailTabs;