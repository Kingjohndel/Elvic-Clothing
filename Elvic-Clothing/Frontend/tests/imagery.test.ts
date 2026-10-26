import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';
import { products } from '../lib/data/products';
import { productPhoto, editorialPhoto } from '../lib/imagery';

test('every product colour retains its front, back and side views', () => {
  let variants = 0;
  for (const product of products)
    for (const color of product.colors) {
      const photo = productPhoto(product.id, color.name);
      assert.ok(photo, `${product.slug}: ${color.name}`);
      assert.equal(photo.color, color.name);
      assert.deepEqual(photo.views, ['Front', 'Back', 'Side']);
      assert.equal(photo.images.length, 3);
      for (const image of photo.images)
        assert.ok(existsSync(`public${image.split('#')[0]}`), image);
      variants++;
    }
  assert.equal(variants, 20);
});
test('unknown editorial keys safely resolve to an existing local image', () => {
  assert.equal(productPhoto('missing'), undefined);
  assert.ok(existsSync(`public${editorialPhoto('missing')}`));
});
