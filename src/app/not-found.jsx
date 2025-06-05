
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <AlertTriangle className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-6xl font-headline font-bold mb-4">404</h1>
      <h2 className="text-3xl font-headline font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild size="lg">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
