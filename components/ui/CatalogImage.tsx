import Image from 'next/image';
import sheets from '@/lib/data/product-view-sheets.json';
import { cn } from '@/lib/utils';
import { defaultPhoto, productPhoto } from '@/lib/imagery';
interface Props {
  tone?: number;
  label?: string;
  className?: string;
  src?: string;
  productId?: string;
  color?: string;
  view?: number;
  priority?: boolean;
}
/** Local product or editorial image; sheet crops preserve distinct back and side views. */
export default function CatalogImage({
  tone = 1,
  label,
  className,
  src,
  productId,
  color,
  view = 0,
  priority,
}: Props) {
  const variant = productId ? productPhoto(productId, color) : undefined;
  const safeView = Number.isFinite(view) ? Math.max(0, Math.trunc(view)) : 0;
  const image =
    src ??
    (variant?.images.length
      ? variant.images[safeView % variant.images.length]
      : defaultPhoto(label, tone));
  const [sheetSrc, angle] = image.split('#');
  const sheet = (sheets as Record<string, { width: number; height: number; splitX?: number }>)[
    sheetSrc
  ];
  if (sheet && (angle === 'back' || angle === 'side')) {
    const split = sheet.splitX ?? sheet.width / 2;
    return (
      <svg
        viewBox={`${angle === 'side' ? split + 5 : 0} 0 ${angle === 'side' ? sheet.width - split - 5 : split - 5} ${sheet.height}`}
        preserveAspectRatio="xMidYMid meet"
        className={cn('h-full w-full overflow-hidden', className)}
        role="img"
        aria-label={label ?? `${variant?.title ?? 'Product'}: ${angle} view`}
      >
        <image href={sheetSrc} x="0" y="0" width={sheet.width} height={sheet.height} />
      </svg>
    );
  }
  return (
    <Image
      unoptimized
      src={image}
      alt={label ?? (variant ? `${variant.title}: ${variant.color}` : 'Curated designer style')}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      decoding="async"
      width={1100}
      height={1400}
      className={cn('h-full w-full object-cover object-center', className)}
    />
  );
}
