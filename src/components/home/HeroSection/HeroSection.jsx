
"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

const collageMovies = [
  { id: 'h1', src: 'https://images.unsplash.com/photo-1645221559842-5a542abbb40b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxlcGljJTIwYWR2ZW50dXJlfGVufDB8fHx8MTc0OTA5MDU1MXww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Featured Movie 1', className: 'z-20 shadow-2xl', rotation: '0deg', hint: 'epic adventure' },
  { id: 'h2', src: 'https://images.unsplash.com/photo-1616749147360-851364dadbeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzY2ktZmklMjB0aHJpbGxlcnxlbnwwfHx8fDE3NDkwOTA1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Featured Movie 2', className: 'z-10 shadow-xl -rotate-[10deg] translate-x-[-100px] md:translate-x-[-140px]', hint: 'sci-fi thriller' },
  { id: 'h3', src: 'https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbmltYXRlZCUyMGZhbnRhc3l8ZW58MHx8fHwxNzQ5MDkwNTUxfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Featured Movie 3', className: 'z-10 shadow-xl rotate-[10deg] translate-x-[100px] md:translate-x-[140px]', hint: 'animated fantasy' },
  { id: 'h4', src: 'https://images.unsplash.com/photo-1475738278104-aff5ab463b1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxjb21lZHklMjBzcGVjaWFsfGVufDB8fHx8MTc0OTA5MDU1Mnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Featured Movie 4', className: 'z-0 shadow-lg -rotate-[20deg] translate-x-[-180px] md:translate-x-[-260px] opacity-70 hidden sm:block', hint: 'comedy special' },
  { id: 'h5', src: 'https://images.unsplash.com/photo-1652004329896-f78a898ffcb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhY3Rpb24lMjBkcmFtYXxlbnwwfHx8fDE3NDkwOTA1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Featured Movie 5', className: 'z-0 shadow-lg rotate-[20deg] translate-x-[180px] md:translate-x-[260px] opacity-70 hidden sm:block', hint: 'action drama' },
  { id: 'h6', src: 'https://images.unsplash.com/photo-1525065792993-2a7eefe2737e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxpbmRpZSUyMGZpbG18ZW58MHx8fHwxNzQ5MDkwNTUyfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Featured Movie 6', className: 'z-[-10] shadow-md -rotate-[25deg] translate-x-[-230px] md:translate-x-[-340px] opacity-50 hidden md:block', hint: 'indie film' },
  { id: 'h7', src: 'https://images.unsplash.com/photo-1515871204537-49a5fe66a31f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjbGFzc2ljJTIwcm9tYW5jZXxlbnwwfHx8fDE3NDkwOTA1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Featured Movie 7', className: 'z-[-10] shadow-md rotate-[25deg] translate-x-[230px] md:translate-x-[340px] opacity-50 hidden md:block', hint: 'classic romance' },
];

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"], 
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 1, 0]); 

  const collageY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]); // Images move up slower

  return (
    <section
      ref={heroRef}
      className="bg-black text-white -mx-4 md:-mx-8 -mt-8 mb-12 relative h-[150vh]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 lg:gap-16 items-center relative w-full">
          <motion.div
            className="md:pr-8 z-10"
            style={{ y: textY, opacity: textOpacity }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold mb-4 leading-tight">
              Movie rentals on RtorMovies
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Early Access to new movies, before digital subscription.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-base font-semibold rounded-md">
              Rent now
            </Button>
          </motion.div>
          
          <motion.div
            className="relative h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center mt-8 md:mt-0"
            style={{ y: collageY }}
          >
            {collageMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                className={`absolute transform-gpu ${movie.className}`}
                style={{
                  transform: `translateY(-50%) rotate(${movie.rotation}) translateX(${index * 10 - (collageMovies.length * 5)}px)`,
                }}
              >
                <div className="transform transition-transform hover:scale-105">
                  <Image
                    src={movie.src}
                    alt={movie.alt}
                    width={240}
                    height={360}
                    className={`rounded-md border-2 border-transparent hover:border-yellow-500/50 object-cover 
                      ${movie.id === 'h1' ? 'w-[160px] h-[240px] sm:w-[200px] sm:h-[300px] lg:w-[240px] lg:h-[360px]' : ''}
                      ${movie.id === 'h2' || movie.id === 'h3' ? 'w-[140px] h-[210px] sm:w-[160px] sm:h-[240px] lg:w-[200px] lg:h-[300px]' : ''}
                      ${movie.id === 'h4' || movie.id === 'h5' ? 'w-[120px] h-[180px] sm:w-[140px] sm:h-[210px] lg:w-[180px] lg:h-[270px]' : ''}
                      ${movie.id === 'h6' || movie.id === 'h7' ? 'w-[100px] h-[150px] sm:w-[120px] sm:h-[180px] lg:w-[160px] lg:h-[240px]' : ''}
                    `}
                    data-ai-hint={movie.hint}
                    priority={movie.id === 'h1'}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
