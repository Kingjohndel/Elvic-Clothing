import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="hero-original-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3a3733" /><stop offset="100%" stopColor="#0a0a0a" /></linearGradient>
            <pattern id="hero-original-pattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="40" stroke="#f6f3ee" strokeOpacity="0.05" strokeWidth="1" /></pattern>
          </defs>
          <rect width="600" height="800" fill="url(#hero-original-gradient)" />
          <rect width="600" height="800" fill="url(#hero-original-pattern)" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
      </div>

      <div className="container-elvic relative z-10 w-full py-12 md:py-16">
        <p
          className="hero-enter text-eyebrow text-xs font-medium text-bone/80"
        >
          Elvic Clothing — Autumn Collection
        </p>

        <h1
          className="hero-enter hero-enter-title mt-5 max-w-3xl font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl"
        >
          Wear Your Identity.
        </h1>

        <p
          className="hero-enter hero-enter-description mt-6 max-w-md text-base leading-relaxed text-bone/85"
        >
          Considered pieces, curated with intention. ELVIC brings together the labels worth wearing: for people who want their clothing to speak before they do.
        </p>

        <div
          className="hero-enter hero-enter-actions mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/shop" variant="campaignSolid" size="lg" className="w-full sm:w-auto">
            Shop Collection
          </Button>
          <Button href="/about" variant="campaignOutline" size="lg" className="w-full sm:w-auto">
            Discover Elvic
          </Button>
        </div>
      </div>
    </section>
  );
}
