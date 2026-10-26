import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { categoryBannerPhoto } from '@/lib/imagery';

export default function CategoryBanner({ slug, eyebrow = 'Category', title, description }: { slug: string; eyebrow?: string; title: string; description: string }) {
  return <section className="relative flex min-h-[240px] items-end overflow-hidden bg-ink text-ivory md:min-h-[260px]">
    <div className="absolute inset-0">
      <PlaceholderImage src={categoryBannerPhoto(slug)} label={`${title}: curated clothing edit`} priority className="object-[68%_center] md:object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
    </div>
    <div className="container-elvic relative z-10 py-8 md:py-10">
      <p className="text-eyebrow text-xs font-medium text-ivory/75">{eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">{title}</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/90 sm:text-base">{description}</p>
    </div>
  </section>;
}
