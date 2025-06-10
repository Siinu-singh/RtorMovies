import categoriesData from '@/data/live-tv/categories.json';
import ChannelCard from '@/components/cards/ChannelCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Function to fetch data for a specific slug
async function getCategoryItem(slug) {
  const item = categoriesData.find((e) => e.slug === slug);
  // In a real app, 'item.items' might be fetched here if it's a list of channels for that category
  // For now, assuming 'item.items' is populated in the JSON or this page shows category info
  return item;
}

export async function generateMetadata({ params }) {
  const item = await getCategoryItem(params.slug);
  if (!item) {
    return {
      title: 'Category Not Found',
      description: 'The requested live TV category could not be found.',
    };
  }
  return {
    title: `${item.name} - Live TV Categories | RtorMovies`,
    description: item.description || `Explore live TV channels in the ${item.name} category on RtorMovies.`,
  };
}

// export async function generateStaticParams() {
//   return categoriesData.map((item) => ({
//     slug: item.slug,
//   }));
// }

export default async function CategorySlugPage({ params }) {
  const item = await getCategoryItem(params.slug);

  if (!item) {
    notFound();
  }

  // 'item.items' should contain the list of channels for this category.
  // If it's empty, we'll show a message.
  const channelsInCategory = item.items || [];

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
                <span className="font-semibold text-neutral-300">Categories</span>
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

      {channelsInCategory.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-neutral-100">Channels in {item.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {channelsInCategory.map((channel) => (
              <ChannelCard key={channel.slug} item={channel} basePath="categories" />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 bg-neutral-800/50 rounded-lg">
          <p className="text-xl text-neutral-400 mb-2">
            No channels currently listed under "{item.name}".
          </p>
          <p className="text-neutral-500 mb-6">Check back soon for new additions!</p>
          <Link href="/live-tv" className="mt-4 inline-block bg-yellow-500 text-neutral-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 transition-colors">
            Explore Other Categories
          </Link>
        </div>
      )}
    </div>
  );
}