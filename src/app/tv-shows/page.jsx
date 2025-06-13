'use client'; // This page needs to be a client component for state and interactions

import { useState, useEffect } from 'react';
import { primeTheme } from '@/theme/theme';
// import TVHeroCarousel from '@/components/tvshows/TVHeroCarousel';
// import { getAllTVShows } from '@/lib/getTVShows';


import AnimatedPage from '@/components/tvshows/AnimatedPage';
import TvGradientHeading from '@/components/tvshows/TvGradientHeading';
import TvCategorySection from '@/components/tvshows/TvCategorySection';
import TvShowGrid from '@/components/tvshows/TVShowGrid';
import { Skeleton } from "@/components/ui/skeleton";
import TvShowSearch from '@/components/tvshows/TvShowSearch';

// Moved getAllGenres function here
function getAllGenres(tvShows) {
  if (!tvShows || tvShows.length === 0) {
    return [];
  }
  const allGenresSet = new Set();
  tvShows.forEach(show => {
    if (show.genre && Array.isArray(show.genre)) {
      show.genre.forEach(g => allGenresSet.add(g));
    }
  });
  return Array.from(allGenresSet).sort();
}


function TvShowsPageContent() {
  const [allTvShows, setAllTvShows] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All Shows");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch('/data/tvshows.json');
        if (!response.ok) {
          console.warn("Direct fetch of tvshows.json failed. Trying dynamic import for demo.");
          const dataModule = await import('@/data/tvshows.json');
          const shows = dataModule.default;

          setAllTvShows(shows);
          setFilteredTvShows(shows);
          setGenres(getAllGenres(shows));

        } else {
          const shows = await response.json();
          setAllTvShows(shows);
          setFilteredTvShows(shows);
          setGenres(getAllGenres(shows));
        }

      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let showsToFilter = allTvShows;

    if (selectedGenre && selectedGenre !== "All Shows") {
      showsToFilter = showsToFilter.filter(show => 
        show.genre && show.genre.includes(selectedGenre)
      );
    }

    if (searchTerm) {
      showsToFilter = showsToFilter.filter(show =>
        show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (show.description && show.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTvShows(showsToFilter);
  }, [selectedGenre, allTvShows, searchTerm]);

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    let title = 'TV Shows | Mp4movies';
    if (searchTerm) {
      title = `Search: ${searchTerm} | TV Shows | Mp4movies`;
    } else if (selectedGenre) {
      title = `${selectedGenre} TV Shows | Mp4movies`;
    }
    document.title = title;
  }, [selectedGenre, searchTerm]);


  // const allShows = getAllTVShows();
  // const heroShows = allShows.slice(0, 3);

  console.log("filteredTvShows", filteredTvShows);


  return (
    <AnimatedPage>
      <div className="container mx-auto ">
        {/* <TVHeroCarousel shows={heroShows} /> */}
        <TvGradientHeading text="Discover TV Shows" />

        {/* New Search Component */}
        <TvShowSearch
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {isLoading && genres.length === 0 && (
          <div className="mb-8 md:mb-12 px-4">
            <Skeleton className="h-8 w-1/4 mb-4" />
            <div className="flex space-x-3">
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-24 rounded-lg" />)}
            </div>
          </div>
        )}
        {!isLoading && genres.length > 0 && (
          <TvCategorySection
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={handleSelectGenre}
          />
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl shadow-lg overflow-hidden">
                <Skeleton className="aspect-[2/3] w-full" />
                <div className="p-3">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2 mb-1" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <TvShowGrid tvShows={filteredTvShows} />
          </div>
        )}
      </div>


    </AnimatedPage>
  );
}


export default function TvShowsPage() {
  return <TvShowsPageContent />;
}
