# Original ELVIC preview imagery

All active catalogue and editorial imagery was generated specifically for this preview using the built-in image generation tool on 25 October 2026. No brand-store or retailer photograph is included in the deployed image directory. There are no people, faces, body parts, mannequins, or brand logos in the replacement images.

The images illustrate generic garment styles and colour options. They are not photographs of the exact branded products. Product cards, galleries and the footer disclose this. Before selling actual goods, replace these previews with your own or appropriately licensed photographs of the exact products.

## Prompt set

The 20 garment and colour briefs are in `PRODUCT-IMAGE-BRIEFS.json`. Shared direction: original product-only studio photography; entire unbranded garment visible, generous margins, warm ivory backdrop, soft directional lighting, subtle shadow, realistic textile detail; no model, person, body part, face, mannequin, brand marks, text or watermark; do not copy brand advertising or an existing product photograph.

## Assets

All site image assets are in `public/images/original-products/`, keyed by product ID and colour index. The matching colour metadata and illustrative-image flags are in `lib/data/imagery.json`.

## Multiple views and brand covers

Each of the 20 colour variants now has a front, back and side illustration. Fronts are the retained original illustrations. Back and side views were newly generated from the corresponding front reference with the built-in image tool, preserving the colour, material and garment design. Each landscape sheet contains a back panel on the left and a side panel on the right; the shared image component displays the appropriate panel without altering the original raster file. The source sheets are in `public/images/product-views/`.

Nine separate original editorial still-life images in `public/images/brand-covers/` represent each brand's styling direction. They show unbranded clothing and accessories without people or faces. These are independent illustrations, not official brand photography or campaigns. The briefs and constraints are in `MULTIVIEW-IMAGE-BRIEFS.json`.

## Collection covers and category banners — 26 October 2026

Four original product-only editorial illustrations now represent The Essentials, Signature Tailoring, Statement Pieces and Off Duty. They are in `public/images/collection-covers/` and are reused in the collection cards, featured collection and collection pages.

Seven original wide product-only banners now represent Men, Women, Unisex, Accessories, New Arrivals, Sale and Shop All. They are in `public/images/category-banners/`. They use a shared compact responsive banner component, with imagery focused towards the right and a dark overlay behind the headings.

All were created using the built-in image generation tool. No people, faces, models, official campaigns, or brand logos were used. The styling briefs are in `COLLECTION-CATEGORY-IMAGE-BRIEFS.json`. Brand cover assets, brand mappings and brand page banner code remain unchanged.

## ELVIC Brand Story

`public/images/editorial/elvic-brand-story.webp` is an original AI-generated product-only editorial illustration created with the built-in image generation tool. Prompt: a considered fashion curator's worktable with ivory cotton poplin, stone fine knit, black tailored blazer on warm limestone, a natural canvas garment sleeve and unmarked fabric swatches; warm ivory, sand, charcoal and brown palette, soft daylight and tactile textiles; portrait 4:5 with quiet lower caption space; no people, models, faces, body parts, mannequins, logos, text, watermarks or copied campaigns. It represents ELVIC's curation and is not an actual workplace photograph.

The homepage hero uses the original charcoal gradient and diagonal pattern again; the product photo has been removed. The Brand Story image caption no longer contains “The Elvic Edit”.
