# ELVIC Clothing

The website source is organized inside **Elvic-Clothing**.

- [Frontend](Elvic-Clothing/Frontend/README.md): the Next.js storefront, components, product data, original images, styles and tests.
- [Backend](Elvic-Clothing/Backend/README.md): reserved for server-side code. No account, database, payment or email backend is included in this repository yet.

## Run the website

Use Node.js 22 or later. From the repository root:

```sh
cd Elvic-Clothing/Frontend
npm ci
npm run dev
```

For production:

```sh
npm run check
npm run build
npm start
```

## Deployment

Set the hosting project's **Root Directory** to `Elvic-Clothing/Frontend`. Install with `npm ci`, build with `npm run build`, and use `out` as the static output directory when requested by the host.

Existing hosting projects that previously built from the repository root must update their Root Directory before deploying this reorganized source. The published Sites preview is maintained separately and is unchanged by this repository organization.

Keep credentials and local environment files out of Git.
