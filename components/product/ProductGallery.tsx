'use client';

import { useState } from 'react';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { productPhoto } from '@/lib/imagery';
import { cn } from '@/lib/utils';

export default function ProductGallery({ productId, color, name }: { productId: string; color: string; name: string }) {
  const photo = productPhoto(productId, color)!;
  const selectionKey = `${productId}:${color}`;
  const [selection, setSelection] = useState({key: selectionKey, index: 0});
  const active = selection.key === selectionKey ? selection.index : 0;
  const views = photo.views ?? photo.images.map((_,i) => i === 0 ? 'Front' : `View ${i+1}`);
  function choose(index: number) { setSelection({key: selectionKey, index: (index + photo.images.length) % photo.images.length}); }

  return (
    <section aria-label={`${name} image gallery`} onKeyDown={(event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); choose(active + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); choose(active - 1); }
    }}>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-bone">
        <div key={`${selectionKey}:${active}`} className="product-view-frame h-full w-full">
          <PlaceholderImage productId={productId} color={color} view={active} label={`${name}: ${color}, ${views[active]} view`} priority />
        </div>
        <span className="absolute left-4 top-4 bg-ivory/95 px-3 py-1.5 text-[10px] uppercase tracking-widest text-ink">{views[active]} view</span>
        {photo.images.length > 1 && <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 sm:px-4">
          <button type="button" aria-label="Previous product view" title="Previous view" onClick={() => choose(active - 1)} className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-ivory/95 text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-ink hover:bg-ink hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink active:bg-ink active:text-ivory sm:h-12 sm:w-12">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" aria-label="Next product view" title="Next view" onClick={() => choose(active + 1)} className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-ivory/95 text-ink shadow-sm backdrop-blur-sm transition-colors hover:border-ink hover:bg-ink hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink active:bg-ink active:text-ivory sm:h-12 sm:w-12">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5"><path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>}
      </div>
      {photo.images.length > 1 && <>
        <div className="mt-3 flex items-center justify-center">
          <p className="text-xs text-stone" aria-live="polite">{views[active]} · {active+1} / {photo.images.length}</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {photo.images.map((src,i) => <button key={src} type="button" onClick={() => choose(i)} aria-label={`Show ${views[i]} view of ${name} in ${color}`} aria-pressed={active===i} className={cn('group min-w-0 border bg-ivory p-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',active===i?'border-ink':'border-line hover:border-stone')}>
            <div className="aspect-[3/4] overflow-hidden bg-bone"><PlaceholderImage src={src} label={`${color} ${views[i]} view`} /></div>
            <span className="mt-2 block pb-1 text-[10px] uppercase tracking-widest text-graphite">{views[i]}</span>
          </button>)}
        </div>
      </>}
      <p className="mt-4 text-[11px] leading-relaxed text-stone">AI-generated product views in {color}. These illustrations represent the style and colour, rather than the exact branded item.</p>
    </section>
  );
}
