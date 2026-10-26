import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className="text-eyebrow mb-4 text-xs font-medium text-stone">{eyebrow}</p>
      )}
      <Tag className="font-display text-3xl leading-[1.1] text-ink sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-graphite">{description}</p>
      )}
    </div>
  );
}
