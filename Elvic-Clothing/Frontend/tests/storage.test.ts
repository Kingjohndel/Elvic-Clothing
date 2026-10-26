import assert from 'node:assert/strict';
import test from 'node:test';
import { products } from '../lib/data/products';
import { decodeCart, decodeWishlist } from '../lib/storage';

const product = products[0];
const selection = {
  productId: product.id,
  size: product.sizes[0],
  color: product.colors[0].name,
  quantity: 2,
};

test('malformed or incorrectly shaped storage cannot crash shopping', () => {
  for (const value of [null, '{bad', 'null', '{}', '"text"', '[null,{},"item"]']) {
    assert.deepEqual(decodeCart(value), []);
    assert.deepEqual(decodeWishlist(value), []);
  }
});
test('cart restoration uses catalog names and prices', () => {
  const [line] = decodeCart(
    JSON.stringify([{ ...selection, price: 0.01, name: 'Outdated name', slug: 'invalid' }]),
  );
  assert.equal(line.price, product.price);
  assert.equal(line.name, product.name);
  assert.equal(line.slug, product.slug);
  assert.equal(line.quantity, 2);
});
test('invalid saved selections are dropped while valid ones survive', () => {
  const stored = [
    selection,
    { ...selection, productId: 'missing' },
    { ...selection, size: 'invalid' },
    { ...selection, color: 'invalid' },
    ...[-1, 0, 1.5, '2', Number.MAX_SAFE_INTEGER + 1].map((quantity) => ({
      ...selection,
      quantity,
    })),
  ];
  assert.equal(decodeCart(JSON.stringify(stored)).length, 1);
});
test('duplicate saved lines merge without overflowing quantities', () => {
  const [line] = decodeCart(JSON.stringify([selection, selection]));
  assert.equal(line.quantity, 4);
  const [safe] = decodeCart(
    JSON.stringify([{ ...selection, quantity: Number.MAX_SAFE_INTEGER }, selection]),
  );
  assert.equal(safe.quantity, Number.MAX_SAFE_INTEGER);
});
test('wishlist removes stale IDs, wrong types and duplicates', () => {
  assert.deepEqual(decodeWishlist(JSON.stringify([product.id, product.id, 'missing', 4, null])), [
    product.id,
  ]);
});
