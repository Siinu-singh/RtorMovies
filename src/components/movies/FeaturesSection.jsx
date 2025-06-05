
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const TvIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="featTvScreenGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" /> 
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
    <rect x="3" y="6" width="18" height="10" rx="1.5" fill="url(#featTvScreenGrad)" />
    <path d="M9 17L9.5 18.5H14.5L15 17H9Z" className="fill-slate-500" />
     <rect x="2" y="5" width="20" height="12" rx="2.5" strokeWidth="1.5" className="stroke-slate-600" />
  </svg>
);

const DownloadShowsIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="featDlCircleGrad" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="#f472b6" /> 
        <stop offset="100%" stopColor="#c026d3" />
      </radialGradient>
    </defs>
    <circle cx="12" cy="12" r="9" fill="url(#featDlCircleGrad)" />
    <path d="M12 9V15M12 15L9.5 12.5M12 15L14.5 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WatchEverywhereIcon = ({ className }) => (
   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="featPopperGrad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#d946ef" />
      </linearGradient>
    </defs>
    <path d="M9 16L12 7L15 16L13.5 16C12.6716 16 12.1716 14.5 12 16C11.8284 14.5 11.3284 16 10.5 16L9 16Z" fill="url(#featPopperGrad)"/>
    <circle cx="7.5" cy="10" r="0.75" fill="#facc15" />
    <rect x="15" y="8" width="1.5" height="1.5" rx="0.25" fill="#a78bfa" />
    <path d="M11 5L11.25 4.5L11.5 5" stroke="#ec4899" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const KidsProfileIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="8" height="8" rx="1.5" fill="#a855f7" className="opacity-90" transform="rotate(-5 10 14)"/>
    <circle cx="8.5" cy="12.5" r="0.5" fill="white" transform="rotate(-5 10 14)"/>
    <circle cx="11.5" cy="12.5" r="0.5" fill="white" transform="rotate(-5 10 14)"/>
    <path d="M8.5 14.5 Q10 15 11.5 14.5" stroke="white" strokeWidth="0.5" fill="none" transform="rotate(-5 10 14)"/>

    <rect x="10" y="6" width="9" height="9" rx="2" fill="#ec4899" className="opacity-90" transform="rotate(5 14.5 10.5)"/>
    <circle cx="13" cy="9" r="0.6" fill="white" transform="rotate(5 14.5 10.5)"/>
    <circle cx="16" cy="9" r="0.6" fill="white" transform="rotate(5 14.5 10.5)"/>
    <path d="M13 11.5 Q14.5 12.5 16 11.5" stroke="white" strokeWidth="0.5" fill="none" transform="rotate(5 14.5 10.5)"/>
  </svg>
);


const featuresData = [
  {
    title: "Enjoy on your TV",
    description: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    icon: <TvIcon className="w-14 h-14 md:w-16 md:h-16 text-purple-400" />
  },
  {
    title: "Download your shows to watch offline",
    description: "Save your favourites easily and always have something to watch.",
    icon: <DownloadShowsIcon className="w-14 h-14 md:w-16 md:h-16" />
  },
  {
    title: "Watch everywhere",
    description: "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
    icon: <WatchEverywhereIcon className="w-14 h-14 md:w-16 md:h-16" />
  },
  {
    title: "Create profiles for kids",
    description: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership.",
    icon: <KidsProfileIcon className="w-14 h-14 md:w-16 md:h-16" />
  }
];

const cardVariants = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.03, 
    y: -5,
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const iconContainerVariants = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -4, // Icon lifts a bit more
    scale: 1.1, // Icon scales up a bit more
    transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.05 } 
  }
};

export default function FeaturesSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-[#1A1128] rounded-2xl p-6 flex flex-col justify-between h-full shadow-xl cursor-pointer"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
              <motion.div 
                className="mt-6 self-end opacity-90"
                variants={iconContainerVariants} 
                // No need for initial/whileHover here, it inherits from parent's state if variant names match
              >
                {feature.icon}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

