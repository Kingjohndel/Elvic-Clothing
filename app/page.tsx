import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import FeaturedBrands from '@/components/home/FeaturedBrands';
import BrandDirectory from '@/components/home/BrandDirectory';
import TrustSection from '@/components/home/TrustSection';
import BrandStatement from '@/components/home/BrandStatement';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import CategoryCards from '@/components/home/CategoryCards';
import CampaignSection from '@/components/home/CampaignSection';
import LookbookPreview from '@/components/home/LookbookPreview';
import BrandStory from '@/components/home/BrandStory';
import SocialProof from '@/components/home/SocialProof';
import ProductRow from '@/components/product/ProductRow';
import TopBrandsRow from '@/components/home/TopBrandsRow';
import { getNewArrivals, getBestSellers, getTopPicks, products } from '@/lib/data/products';
import { getCollectionBySlug } from '@/lib/data/collections';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Elvic Clothing | Wear Your Identity',
  description:
    'ELVIC CLOTHING is a modern premium fashion house. Shop new arrivals, signature tailoring and seasonal collections designed for confidence and identity.',
  path: '/',
});

export default function HomePage() {
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const topPicks = getTopPicks();
  const saleProducts = products.filter(product => product.compareAtPrice !== undefined && product.compareAtPrice > product.price);
  const featuredCollection = getCollectionBySlug('signature-tailoring')!;

  return (
    <>
      <Hero />

      <section className="py-16 md:py-20">
        <div className="container-elvic">
          <p className="text-eyebrow mb-6 text-xs font-medium text-stone">Just In</p>
          <div className="space-y-12 md:space-y-14">
            <ProductRow id="new-arrivals-row" title="New Arrivals" description="The latest pieces added to ELVIC: sourced in small, considered drops across brands." products={newArrivals} href="/new-arrivals" />
            <ProductRow id="sale-row" title="Sale / Limited-Time Offers" description="Explore the current markdowns across the ELVIC edit." products={saleProducts} href="/sale" />
            <ProductRow id="top-picks-row" title="Top Picks" description="A considered selection of standout pieces from across our brands." products={topPicks} href="/shop?edit=top-picks" />
            <ProductRow id="best-sellers-row" title="Best Sellers" description="The pieces the Elvic community keeps coming back for." products={bestSellers} href="/shop?sort=best-selling" />
            <TopBrandsRow />
          </div>
        </div>
      </section>

      <BrandStatement />

      <FeaturedBrands />

      <FeaturedCollection collection={featuredCollection} />

      <CategoryCards />

      <BrandDirectory />

      <CampaignSection />

      <LookbookPreview />

      <BrandStory />

      <TrustSection />

      <SocialProof />

    </>
  );
}
