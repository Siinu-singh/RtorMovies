import { notFound } from 'next/navigation';
import MovieDetailHero from '@/components/movies/MovieDetailHero'; // Reusing for consistent hero look
import DetailTabs from '@/components/movies/DetailTabs';       // Reusing for consistent tab structure
import MovieRow from '@/components/movies/MovieRow';           // For related content
import { getAllTVShows, getTVShowById } from '@/lib/getTVShows'; // TV Show specific service
import { primeTheme } from '@/theme/theme';

// Function to get related TV shows (example: by genre, excluding current show)
async function getRelatedTVShows(currentShowId, genre) {
  if (!genre) return [];
  const allShows = await getAllTVShows();
  return allShows.filter(show => 
    show.id !== currentShowId && 
    show.genre?.includes(genre)
  ).slice(0, 10); // Limit to 10 related shows
}

export async function generateStaticParams() {
  const tvShows = await getAllTVShows();
  return tvShows.map((show) => ({
    id: show.id.toString(),
  }));
}

export async function generateMetadata({ params }) {
  const show = await getTVShowById(params.id.toString());
  if (!show) {
    return {
      title: 'TV Show Not Found',
    };
  }
  return {
    title: `${show.title} | Prime Video`,
    description: show.description,
  };
}

export default async function TVShowDetailPage({ params }) {
  const tvShow = await getTVShowById(params.id.toString());

  if (!tvShow) {
    notFound();
  }

  // Enhance TV show object with placeholder data for new fields if not present
  // This should align with the fields expected by MovieDetailHero and DetailTabs
  const enhancedTVShow = {
    ...tvShow,
    type: 'tv', // Explicitly mark as TV show for components if needed
    logoUrl: tvShow.logoUrl || null,
    rankInCountry: tvShow.rankInCountry || (tvShow.categories?.includes('trending') ? '#1 in India' : null),
    tags: tvShow.tags || ['POPULAR', 'X-RAY'], // Example tags for TV
    ageRating: tvShow.ageRating || '16+',
    // Assuming 'rating' is overall series rating
    imdbRating: tvShow.rating ? tvShow.rating.toFixed(1) : 'N/A', 
    // Episodes should be part of your tvshows.json structure
    // Example: tvShow.seasons[0].episodes or tvShow.episodes
    // For DetailTabs, we'll pass tvShow.episodes (or a transformed list)
  };

  // For TV shows, related content might be other TV shows of the same genre
  const relatedShows = tvShow.genre && tvShow.genre.length > 0
    ? await getRelatedTVShows(tvShow.id.toString(), tvShow.genre[0])
    : [];
  
  // Prepare episodes data for DetailTabs
  // This assumes your tvshows.json has an 'episodes' array or similar structure (e.g., nested in seasons)
  // Example: { id: 'ep1', title: 'Pilot', seasonNumber: 1, episodeNumber: 1, thumbnailUrl: '...', description: '...', duration: '45min', airDate: '2023-01-01', ageRating: '16+' }
  const episodesForTabs = tvShow.episodes || (tvShow.seasons?.[0]?.episodes) || [];


  return (
    <div style={{ backgroundColor: primeTheme.colors.backgroundDarker }} className="min-h-screen">
      <MovieDetailHero movie={enhancedTVShow} /> {/* Passing tvShow as 'movie' prop */}
      <DetailTabs 
        movie={enhancedTVShow} // Passing tvShow as 'movie' for general details
        relatedMovies={relatedShows} // Passing related TV shows as 'relatedMovies'
        tvShowEpisodes={episodesForTabs} // Passing episodes data
      />
      {/* Footer can be added here or in the main layout */}
    </div>
  );
}