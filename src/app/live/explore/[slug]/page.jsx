import exploreData from '@/data/live-tv/explore.json';
import ChannelCard from '@/components/cards/ChannelCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Function to fetch data for a specific slug
async function getExploreItem(slug) {
  const item = exploreData.find((e) => e.slug === slug);
  return item;
}

export async function generateMetadata({ params }) {
  const item = await getExploreItem(params.slug);
  if (!item) {
    return {
      title: 'Content Not Found',
      description: 'The requested live TV content could not be found.',
    };
  }
  return {
    title: `${item.name} - Explore Live TV | RtorMovies`,
    description: item.description || `Explore ${item.name} on RtorMovies Live TV.`,
  };
}

// This function can be used if you need to pre-render paths at build time for SSG
// For SSR, it's not strictly necessary but good for optimization if applicable.
// export async function generateStaticParams() {
//   return exploreData.map((item) => ({
//     slug: item.slug,
//   }));
// }

export default async function ExploreSlugPage({ params }) {
  const item = await getExploreItem(params.slug);

  if (!item) {
    notFound(); // Triggers the not-found.jsx page
  }

  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <div className="mb-8">
        <nav aria-label="breadcrumb" className="text-sm text-neutral-400 mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/live-tv" className="hover:text-yellow-400">Live TV</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">
              <span className="font-semibold text-neutral-300">Explore</span>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center text-yellow-500" aria-current="page">
              {item.name}
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-yellow-400">{item.name}</h1>
        {item.description && <p className="text-lg text-neutral-300 max-w-3xl">{item.description}</p>}
      </div>

      {item.items && item.items.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-neutral-100">Channels in {item.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {item.items.map((channel) => (
              <ChannelCard key={channel.slug} item={channel} basePath="explore" />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-neutral-400">
            No specific channels to display for "{item.name}" at the moment.
          </p>
          <Link href="/live-tv" className="mt-6 inline-block bg-yellow-500 text-neutral-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition-colors">
            Back to Live TV
          </Link>
        </div>
      )}
    </div>
  );
}