import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Size Guide',
  description:
    'Find your ELVIC CLOTHING size with our detailed sizing charts for apparel and accessories.',
  path: '/size-guide',
});

const APPAREL_SIZES = [
  ['XS', '34–36', '27–29', '35–37'],
  ['S', '36–38', '29–31', '37–39'],
  ['M', '38–40', '31–33', '39–41'],
  ['L', '40–43', '33–36', '41–44'],
  ['XL', '43–46', '36–39', '44–47'],
];

const TROUSER_SIZES = [
  ['28', '28–29', '35–36'],
  ['30', '30–31', '37–38'],
  ['32', '32–33', '39–40'],
  ['34', '34–35', '41–42'],
  ['36', '36–37', '43–44'],
];

export default function SizeGuidePage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Size Guide' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Size Guide</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-graphite">
        All measurements are in inches and represent body measurements, not garment measurements.
        For fit somewhere between two sizes, we generally recommend sizing up for a relaxed fit.
      </p>

      <div className="mt-12 max-w-2xl">
        <h2 className="mb-4 font-display text-2xl text-ink">Tops &amp; Outerwear</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-eyebrow text-xs text-stone">
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 pr-4">Chest</th>
                <th className="py-3 pr-4">Waist</th>
                <th className="py-3">Hip</th>
              </tr>
            </thead>
            <tbody className="text-graphite">
              {APPAREL_SIZES.map((row) => (
                <tr key={row[0]} className="border-b border-line/60">
                  {row.map((cell, i) => (
                    <td key={i} className="py-3 pr-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-14 max-w-2xl">
        <h2 className="mb-4 font-display text-2xl text-ink">Trousers &amp; Denim</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[380px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-eyebrow text-xs text-stone">
                <th className="py-3 pr-4">Size</th>
                <th className="py-3 pr-4">Waist</th>
                <th className="py-3">Hip</th>
              </tr>
            </thead>
            <tbody className="text-graphite">
              {TROUSER_SIZES.map((row) => (
                <tr key={row[0]} className="border-b border-line/60">
                  {row.map((cell, i) => (
                    <td key={i} className="py-3 pr-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-12 max-w-lg text-xs text-stone">
        Measurements are approximate guides. Fit can vary slightly by style: refer to the specific
        product page for fit notes where available.
      </p>
    </div>
  );
}
