import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink text-ivory">
      <div className="absolute inset-0">
        <Image
          src="/images/editorial/elvic-autumn-hero.webp"
          alt="Charcoal tailoring, ivory knitwear and warm neutral layers in a refined studio setting"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[65%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/65 to-ink/10 md:via-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/10" />
      </div>

      <div className="container-elvic relative z-10 w-full py-12 md:py-16">
        <p className="hero-enter text-eyebrow text-xs font-medium text-bone/80">
          Elvic Clothing — Autumn Collection
        </p>

        <h1 className="hero-enter hero-enter-title mt-5 max-w-3xl font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl">
          Wear Your Identity.
        </h1>

        <p className="hero-enter hero-enter-description mt-6 max-w-md text-base leading-relaxed text-bone/85">
          Considered pieces, curated with intention. ELVIC brings together the labels worth wearing:
          for people who want their clothing to speak before they do.
        </p>

        <div className="hero-enter hero-enter-actions mt-10 flex flex-wrap items-center gap-4">
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
