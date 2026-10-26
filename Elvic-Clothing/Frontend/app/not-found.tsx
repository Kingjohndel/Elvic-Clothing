import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-elvic flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-eyebrow text-xs font-medium text-stone">404</p>
      <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-graphite">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Return Home</Button>
        <Button href="/shop" variant="secondary">
          Shop Collection
        </Button>
      </div>
    </div>
  );
}
