import PlaceholderImage from '@/components/ui/PlaceholderImage';

export default function CampaignSection() {
  return (
    <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <PlaceholderImage tone={8} monogram={false} />
        <div className="absolute inset-0 bg-ink/35" />
      </div>
      <div className="relative z-10 px-6 text-center">
        <p className="text-eyebrow text-xs font-medium text-bone/70">The Elvic Campaign</p>
        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-6xl md:text-7xl">
          Confidence
          <br className="hidden sm:block" /> is a Silhouette.
        </h2>
      </div>
    </section>
  );
}
