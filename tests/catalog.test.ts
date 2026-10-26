import assert from 'node:assert/strict';
import test from 'node:test';
import { products } from '../lib/data/products';
import {
  filterAndSortProducts,
  paginateProducts,
  parseSort,
  type ProductFilters,
} from '../lib/catalog';

const filters: ProductFilters = {
  query: '',
  brands: [],
  categories: [],
  collections: [],
  sizes: [],
  colors: [],
  maxPrice: 300,
};

test('whitespace searches preserve the catalog', () => {
  assert.equal(
    filterAndSortProducts(products, { ...filters, query: '   ' }, 'featured').length,
    products.length,
  );
});
test('search understands colour and common clothing names', () => {
  const matches = filterAndSortProducts(
    products,
    { ...filters, query: 'white T-shirt' },
    'featured',
  );
  assert.deepEqual(
    matches.map((product) => product.slug),
    ['calvin-klein-essential-tee'],
  );
});
test('brand, size, colour and price filters combine', () => {
  const matches = filterAndSortProducts(
    products,
    { ...filters, brands: ['Calvin Klein'], sizes: ['M'], colors: ['White'], maxPrice: 50 },
    'featured',
  );
  assert.deepEqual(
    matches.map((product) => product.slug),
    ['calvin-klein-essential-tee'],
  );
});
test('multiple categories use union matching', () => {
  const matches = filterAndSortProducts(
    products,
    { ...filters, categories: ['men', 'women'] },
    'featured',
  );
  assert.ok(matches.length > 0);
  assert.ok(matches.every((product) => product.category === 'men' || product.category === 'women'));
});
test('price sorting changes order without mutating catalog data', () => {
  const original = products.map((product) => product.id);
  const ascending = filterAndSortProducts(products, filters, 'price-asc');
  const descending = filterAndSortProducts(products, filters, 'price-desc');
  assert.equal(ascending[0].price, 38);
  assert.equal(descending[0].price, 268);
  assert.deepEqual(
    products.map((product) => product.id),
    original,
  );
});
test('sale and top-pick links return matching products', () => {
  const sale = filterAndSortProducts(products, { ...filters, saleOnly: true }, 'featured');
  assert.ok(
    sale.length > 0 && sale.every((product) => (product.compareAtPrice ?? 0) > product.price),
  );
  const picks = filterAndSortProducts(products, { ...filters, topPicksOnly: true }, 'featured');
  assert.ok(picks.length > 0 && picks.every((product) => product.featured));
});
test('unsupported URL sorting and cleared price sorting use relevance', () => {
  assert.equal(parseSort('unexpected'), 'featured');
  assert.equal(parseSort(''), 'featured');
  assert.equal(parseSort('price-desc'), 'price-desc');
});
test('pagination clamps invalid pages and handles empty results', () => {
  assert.equal(paginateProducts(products, 99).page, 2);
  assert.equal(paginateProducts(products, -1).page, 1);
  assert.equal(paginateProducts(products, 2).products.length, 2);
  assert.deepEqual(paginateProducts([], 99), { page: 1, pageCount: 1, products: [] });
});
