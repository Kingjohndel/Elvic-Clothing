import { Product } from '@/lib/types';
import BrowseRow from '@/components/ui/BrowseRow';
import ProductCard from '@/components/product/ProductCard';

export default function ProductRow({ id, title, description, products, href }: {
  id: string;
  title: string;
  description: string;
  products: Product[];
  href: string;
}) {
  return <BrowseRow id={id} title={title} description={description} href={href} items={products.map(product => ({
    key: product.id,
    content: <ProductCard product={product} showRating variant="catalog" />,
  }))} />;
}
