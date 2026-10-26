import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'invert'
  | 'invertOutline'
  | 'campaignSolid'
  | 'campaignOutline';
type Size = 'md' | 'lg';

const base =
  'inline-flex min-w-0 items-center justify-center text-center gap-2 text-eyebrow text-xs font-medium tracking-widest2 transition-colors duration-300 ease-editorial disabled:opacity-40 disabled:pointer-events-none';

// Each variant is a self-contained color treatment (rather than relying on a
// caller's `className` to override bg/text) so two utility classes with the
// same specificity never race for which one Tailwind's generated stylesheet
// applies last.
const variants: Record<Variant, string> = {
  primary: 'bg-ink text-ivory hover:bg-graphite',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-ivory',
  ghost: 'text-ink hover:opacity-60',
  // For use on dark/campaign backgrounds.
  invert: 'bg-ivory text-ink hover:bg-bone',
  invertOutline: 'border border-ivory text-ivory hover:bg-ivory hover:text-ink',
  campaignSolid: 'hero-cta hero-cta-dark',
  campaignOutline: 'hero-cta hero-cta-light',
};

const sizes: Record<Size, string> = {
  md: 'min-h-12 px-4 py-3 sm:px-7',
  lg: 'min-h-14 px-5 py-4 sm:px-8',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export default function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content =
    variant === 'campaignSolid' || variant === 'campaignOutline' ? (
      <>
        <span>{children}</span>
        <span aria-hidden="true" className="hero-cta-reveal">
          {children}
        </span>
      </>
    ) : (
      children
    );

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
