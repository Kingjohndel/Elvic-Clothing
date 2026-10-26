'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/lib/seo';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend is connected yet: wire this up to a real inbox or
    // support platform before launch.
    setSubmitted(true);
  }

  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Contact Us</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-graphite">
        Questions about an order, a product, or ELVIC in general? Send us a message and our team
        will get back to you.
      </p>

      <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_360px]">
        {submitted ? (
          <div className="border border-line p-8">
            <p className="font-display text-2xl text-ink">Message received.</p>
            <p className="mt-3 text-sm text-graphite">
              Thank you for reaching out: this is a demo form, so no message was actually sent.
              Connect it to a real inbox or support platform before launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs text-eyebrow text-stone">
                  Name
                </label>
                <input id="name" name="name" type="text" required className="input-field" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs text-eyebrow text-stone">
                  Email
                </label>
                <input id="email" name="email" type="email" required className="input-field" />
              </div>
            </div>
            <div>
              <label htmlFor="topic" className="mb-2 block text-xs text-eyebrow text-stone">
                Topic
              </label>
              <select id="topic" name="topic" className="input-field" defaultValue="order">
                <option value="order">Order Support</option>
                <option value="product">Product Question</option>
                <option value="press">Press &amp; Partnerships</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-xs text-eyebrow text-stone">
                Message
              </label>
              <textarea id="message" name="message" required rows={6} className="input-field h-auto py-3" />
            </div>
            <Button type="submit" size="lg">
              Send Message
            </Button>
          </form>
        )}

        <aside className="space-y-8">
          <div>
            <h2 className="text-eyebrow text-xs font-medium text-stone">Email</h2>
            <a href={`mailto:${siteConfig.supportEmail}`} className="link-underline mt-2 block text-sm text-ink">
              {siteConfig.supportEmail}
            </a>
          </div>
          <div>
            <h2 className="text-eyebrow text-xs font-medium text-stone">Customer Service</h2>
            <p className="mt-2 text-sm text-graphite">
              Our team typically responds within 1–2 business days. For order-specific questions,
              have your order number ready.
            </p>
          </div>
          <div>
            <h2 className="text-eyebrow text-xs font-medium text-stone">Common Questions</h2>
            <Link href="/faq" className="link-underline mt-2 block text-sm text-ink">
              Visit our FAQ
            </Link>
          </div>
          <div>
            <h2 className="text-eyebrow text-xs font-medium text-stone">Follow Elvic</h2>
            <ul className="mt-2 flex flex-wrap gap-4">
              {[
                ['Instagram', siteConfig.social.instagram],
                ['TikTok', siteConfig.social.tiktok],
                ['Facebook', siteConfig.social.facebook],
                ['X', siteConfig.social.x],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
