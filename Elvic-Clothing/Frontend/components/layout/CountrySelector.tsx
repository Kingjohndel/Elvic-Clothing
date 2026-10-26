'use client';

import { useId, useState } from 'react';

const REGIONS = [
  { value: 'us', label: 'United States (USD $)' },
  { value: 'uk', label: 'United Kingdom (GBP £)' },
  { value: 'eu', label: 'European Union (EUR €)' },
  { value: 'ca', label: 'Canada (CAD $)' },
];

export default function CountrySelector() {
  const [region, setRegion] = useState('us');
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="text-eyebrow mb-2 block text-xs font-medium text-stone">
        Region
      </label>
      <select
        id={id}
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="h-11 w-full max-w-[240px] border border-line/40 bg-transparent px-3 text-sm text-ivory outline-none [&>option]:text-ink"
      >
        {REGIONS.map((r) => (
          <option key={r.value} value={r.value}>
            {r.label}
          </option>
        ))}
      </select>
      <p className="mt-2 text-[11px] text-bone/60">Prices shown in USD (demo pricing).</p>
    </div>
  );
}
