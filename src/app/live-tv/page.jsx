
import AnimatedPage from '@/components/live-tv/AnimatedPage';
import SectionTitle from '@/components/live-tv/SectionTitle';

export const metadata = {
  title: 'Live TV',
  description: 'Watch Live TV channels on Mp4movies.',
};

export default function LiveTvPage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        <SectionTitle>Live TV</SectionTitle>
        <p className="text-muted-foreground">
          Live TV streaming will be available here soon. Stay tuned!
        </p>
      </div>
    </AnimatedPage>
  );
}
