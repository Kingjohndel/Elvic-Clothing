'use client';
import { useEffect, useRef } from 'react';
export default function SizeGuideDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key !== 'Tab') return;
      const nodes = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]') ?? [],
      );
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Size guide"
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      <div className="absolute inset-0 bg-ink/40" onClick={() => onClose()} />
      <div className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto bg-ivory p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Size Guide</h2>
          <button
            type="button"
            onClick={() => onClose()}
            aria-label="Close size guide"
            className="flex h-9 w-9 items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-eyebrow text-xs text-stone">
                <th className="py-2 pr-4">Size</th>
                <th className="py-2 pr-4">Chest (in)</th>
                <th className="py-2 pr-4">Waist (in)</th>
                <th className="py-2">Hip (in)</th>
              </tr>
            </thead>
            <tbody className="text-graphite">
              {[
                ['XS', '34–36', '27–29', '35–37'],
                ['S', '36–38', '29–31', '37–39'],
                ['M', '38–40', '31–33', '39–41'],
                ['L', '40–43', '33–36', '41–44'],
                ['XL', '43–46', '36–39', '44–47'],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-line/60">
                  {row.map((cell, i) => (
                    <td key={i} className="py-2.5 pr-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-stone">
          Measurements are approximate and provided as a general guide. See our full{' '}
          <a href="/size-guide" className="link-underline text-ink">
            Size Guide
          </a>{' '}
          page for fit notes by category.
        </p>
      </div>
    </div>
  );
}
