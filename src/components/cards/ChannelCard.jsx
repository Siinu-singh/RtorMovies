'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ChannelCard = ({ item, basePath }) => {
  // basePath could be 'explore', 'featured', or 'categories'
  // item is an object like: { name, slug, description, thumbnail, items (optional) }

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    hover: {
      scale: 1.03,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)',
      transition: { duration: 0.2 }
    }
  };

  // Fallback thumbnail if not provided
  const thumbnailUrl = item.thumbnail || '/images/placeholder-thumbnail.jpg'; // Ensure you have a placeholder

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg group"
    >
      <Link href={`/watch/${item.slug}`} className="block">
        <div className="relative w-full aspect-video">
          <Image
            src={thumbnailUrl}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={true} // Consider making this conditional based on position (e.g., for above-the-fold items)
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-yellow-400 transition-colors">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-xs text-neutral-400 mb-3 h-8 overflow-hidden text-ellipsis">
              {item.description}
            </p>
          )}
          {/* The "Watch Now" button might be better placed on the detail page (/watch/[slug]) */}
          {/* Or, if it's a direct link to play, it can stay here. */}
          {/* For now, the whole card is a link to /watch/[slug] */}
        </div>
      </Link>
      {/* Example of an explicit "Watch Now" button if needed, linking to the same detail page */}
      {/* <div className="p-4 pt-0">
        <Link href={`/watch/${item.slug}`}>
          <button className="w-full bg-yellow-500 text-neutral-900 font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors text-sm">
            Watch Now
          </button>
        </Link>
      </div> */}
    </motion.div>
  );
};

export default ChannelCard;