'use client';

import { motion } from 'framer-motion';
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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="text-eyebrow text-xs font-medium text-bone/80"
        >
          Elvic Clothing — Autumn Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          className="mt-5 max-w-3xl font-display text-6xl leading-[0.95] sm:text-7xl md:text-8xl"
        >
          Wear Your Identity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          className="mt-6 max-w-md text-base leading-relaxed text-bone/85"
        >
          Considered pieces, curated with intention. ELVIC brings together the labels worth wearing: for people who want their clothing to speak before they do.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button href="/shop" variant="invert" size="lg">
            Shop Collection
          </Button>
          <Button href="/about" variant="invertOutline" size="lg">
            Discover Elvic
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
