import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: 'Live TV - RtorMovies',
    description: 'Explore Live TV channels, featured content, and various categories.',
  };
}

export default function LiveTVPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Live TV</h1>
      <p className="text-lg text-neutral-300 mb-12 text-center">
        Discover a wide range of live television content. Use the navigation menu to explore channels,
        featured programming, and various categories.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Explore Channels</h2>
          <p className="text-neutral-400 mb-4">
            Browse through all available live channels and find something new to watch.
          </p>
          <Link href="/live/explore/browse-channels" className="inline-block bg-yellow-500 text-neutral-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors">
            Browse All Channels
          </Link>
        </div>

        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Featured Content</h2>
          <p className="text-neutral-400 mb-4">
            Check out our handpicked featured channels and special programming.
          </p>
          {/* You might want to link to a specific featured item or a general featured page */}
          <Link href="/live/featured/fifa-plus" className="inline-block bg-yellow-500 text-neutral-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors">
            View Featured
          </Link>
        </div>

        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Categories</h2>
          <p className="text-neutral-400 mb-4">
            Explore live TV content organized by categories like News, Sports, Movies, and more.
          </p>
          {/* You might want to link to a specific category or a general categories overview page */}
          <Link href="/live/categories/hit-tv" className="inline-block bg-yellow-500 text-neutral-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors">
            Discover Categories
          </Link>
        </div>
      </div>
    </div>
  );
}