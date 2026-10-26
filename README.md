# ELVIC Clothing

A responsive Next.js storefront with product colour galleries, catalog filtering, search, carousels, a shopping bag and wishlist.

## Development

Use Node.js 22 or later, then run:

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal.

## Production

```sh
npm run build
npm start
```

This project exports a static website to `out/`. The start command serves that export; it does not run `next start`. Hosts such as Vercel can build the repository directly. Other static hosts must support extensionless HTML routes.

## Quality checks

```sh
npm run check
npm run build
```

`check` runs TypeScript, lint, formatting and regression tests. Run `npm run format` to apply the shared formatting rules.

## Source organization

- `app/`: routes, page metadata and global styles.
- `app/styles/motion.css`: shared animations and reduced-motion rules.
- `components/`: layout, homepage, product, brand, collection, shop and reusable UI components.
- `lib/catalog.ts`: pure filtering, sorting and pagination functions.
- `lib/hooks/`: catalog state and browser-storage synchronization.
- `lib/storage.ts`: validation and restoration of saved shopping selections.
- `lib/data/`: products, brands, collections and image mappings.
- `public/images/`: original illustrative assets.
- `tests/`: catalog, storage and image regression tests.

The static preview includes demonstration prices and reviews. Images are illustrative AI-generated previews, not exact branded product photography. Accounts, email delivery, payments and real order tracking require a backend integration. Browser-local bag and wishlist data do not represent confirmed orders.

Never commit passwords, API keys or local environment files.
