import featuredData from '@/data/live-tv/featured.json';
import ChannelCard from '@/components/cards/ChannelCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Function to fetch data for a specific slug
async function getFeaturedItem(slug) {
  const item = featuredData.find((e) => e.slug === slug);
  // In a real app, you might fetch sub-items here if 'items' is just a reference
  return item;
}

export async function generateMetadata({ params }) {
  const item = await getFeaturedItem(params.slug);
  if (!item) {
    return {
      title: 'Content Not Found',
      description: 'The requested live TV content could not be found.',
    };
  }
  return {
    title: `${item.name} - Featured Live TV | RtorMovies`,
    description: item.description || `Watch ${item.name} on RtorMovies Live TV.`,
  };
}

// export async function generateStaticParams() {
//   return featuredData.map((item) => ({
//     slug: item.slug,
//   }));
// }

export default async function FeaturedSlugPage({ params }) {
  const item = await getFeaturedItem(params.slug);

  if (!item) {
    notFound();
  }

  // Assuming 'item' itself is the channel to display, or it might have a list of sub-items.
  // For featured channels, often the slug directly refers to THE channel.
  // If 'item.items' is supposed to be populated, ensure your data structure or fetching logic handles that.
  const channelsToShow = item.items && item.items.length > 0 ? item.items : [item];


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
              <span className="font-semibold text-neutral-300">Featured</span>
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

      {/* Displaying the featured item itself as a card, or a list if it has sub-items */}
      {channelsToShow && channelsToShow.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {/* If the featured item itself is what we want to show, and it has a thumbnail */}
          {/* This assumes the structure of featuredData items matches what ChannelCard expects */}
          {channelsToShow.map((channel) => (
            <ChannelCard key={channel.slug || item.slug} item={channel} basePath="featured" />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-neutral-400">
            Content for "{item.name}" is currently unavailable.
          </p>
          <Link href="/live-tv" className="mt-6 inline-block bg-yellow-500 text-neutral-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition-colors">
            Back to Live TV
          </Link>
        </div>
      )}
    </div>
  );
}