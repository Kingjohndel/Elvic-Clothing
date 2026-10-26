import { Product } from '@/lib/types';

// Demo catalog content matching the supplied reference storefront.
export const products: Product[] =  [
  {
    "id": "p1",
    "featured": true,
    "slug": "calvin-klein-essential-tee",
    "name": "Essential Tee",
    "brand": "calvin-klein",
    "brandName": "Calvin Klein",
    "category": "unisex",
    "collection": "the-essentials",
    "price": 48,
    "isNew": true,
    "isBestSeller": true,
    "colors": [
      {
        "name": "Black",
        "hex": "#171717"
      },
      {
        "name": "White",
        "hex": "#f4f3ef"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.7,
    "reviewCount": 128,
    "shortDescription": "Heavyweight cotton tee cut for a considered, boxy drape.",
    "description": [
      "The Essential Tee is a starting point for a considered wardrobe: a heavyweight, garment-dyed cotton base built to anchor every outfit that follows.",
      "Cut with a dropped shoulder and a boxy body, it sits with intention rather than clinging. Designed to be worn alone or layered underneath tailoring."
    ],
    "materials": [
      "100% heavyweight combed cotton, 240gsm",
      "Garment-dyed for tonal depth",
      "Pre-shrunk construction"
    ],
    "care": [
      "Machine wash cold with like colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed"
    ],
    "tone": 1,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "Exactly the weight I wanted",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch. The fabric feels substantial without being stiff.",
        "date": "2026-06-02",
        "verified": true
      },
      {
        "author": "Demo Reviewer",
        "rating": 4,
        "title": "Great fit, runs true to size",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-05-14",
        "verified": true
      }
    ]
  },
  {
    "id": "p2",
    "featured": true,
    "slug": "ralph-lauren-slim-poplin-shirt",
    "name": "Slim Poplin Shirt",
    "brand": "ralph-lauren",
    "brandName": "Ralph Lauren",
    "category": "men",
    "collection": "signature-tailoring",
    "price": 128,
    "isNew": true,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Blue",
        "hex": "#adc5d8"
      },
      {
        "name": "Green Stripe",
        "hex": "#719180"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.8,
    "reviewCount": 64,
    "shortDescription": "Structured poplin shirt with a sharp point collar.",
    "description": [
      "A shirt built on precision: sharp point collar, clean placket and a tapered body that moves between desk and dinner without changing character.",
      "Finished with mother-of-pearl buttons and a single-needle stitch for a cleaner, more considered seam."
    ],
    "materials": [
      "100% cotton poplin",
      "Mother-of-pearl buttons",
      "Single-needle tailoring"
    ],
    "care": [
      "Machine wash cold",
      "Hang dry recommended",
      "Warm iron on reverse"
    ],
    "tone": 4,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "Tailoring feels genuinely premium",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-04-22",
        "verified": true
      }
    ]
  },
  {
    "id": "p3",
    "featured": true,
    "slug": "ashluxe-oversized-hoodie",
    "name": "Oversized Hoodie",
    "brand": "ashluxe",
    "brandName": "Ashluxe",
    "category": "unisex",
    "collection": "off-duty",
    "price": 118,
    "compareAtPrice": 145,
    "isNew": false,
    "isBestSeller": true,
    "colors": [
      {
        "name": "Black",
        "hex": "#181818"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviewCount": 211,
    "shortDescription": "Brushed-back fleece hoodie with a dropped, oversized fit.",
    "description": [
      "Cut generously through the body and sleeve, the Oversized Hoodie is engineered for ease without losing shape after wear.",
      "A heavyweight, brushed-back fleece gives it structure and warmth, while a raw-hem cuff keeps the silhouette current."
    ],
    "materials": [
      "440gsm brushed-back cotton fleece",
      "Ribbed raw-hem cuffs",
      "Kangaroo pocket"
    ],
    "care": [
      "Machine wash cold, inside out",
      "Do not bleach",
      "Tumble dry low"
    ],
    "tone": 7,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "Best hoodie I own",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch. Fabric weight is excellent.",
        "date": "2026-07-01",
        "verified": true
      },
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "True to size, holds shape",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-06-18",
        "verified": false
      }
    ]
  },
  {
    "id": "p4",
    "featured": true,
    "slug": "hugo-tailored-wide-leg-trouser",
    "name": "Tailored Wide-Leg Trouser",
    "brand": "hugo",
    "brandName": "Hugo",
    "category": "men",
    "collection": "signature-tailoring",
    "price": 148,
    "isNew": false,
    "isBestSeller": true,
    "colors": [
      {
        "name": "Black",
        "hex": "#181818"
      }
    ],
    "sizes": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.6,
    "reviewCount": 87,
    "shortDescription": "Wide-leg wool-blend trouser with a clean front fall.",
    "description": [
      "A tapered waist opens into a wide, fluid leg: engineered for a front fall that reads sharp whether stationary or in motion.",
      "An internal waistband facing and hidden hook closure keep the front completely clean."
    ],
    "materials": [
      "70% wool, 28% polyester, 2% elastane",
      "Half-lined through hip and thigh"
    ],
    "care": [
      "Dry clean only",
      "Steam to refresh"
    ],
    "tone": 5,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 4,
        "title": "Drapes beautifully",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-03-30",
        "verified": true
      }
    ]
  },
  {
    "id": "p5",
    "featured": true,
    "slug": "versace-structured-blazer",
    "name": "Structured Blazer",
    "brand": "versace",
    "brandName": "Versace",
    "category": "women",
    "collection": "statement-pieces",
    "price": 268,
    "compareAtPrice": 320,
    "isNew": true,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Black",
        "hex": "#181818"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviewCount": 39,
    "shortDescription": "Structured wool-blend jacket with an exaggerated lapel.",
    "description": [
      "The Statement Jacket is designed to enter a room first. An exaggerated lapel and squared shoulder give it presence, while an interior canvas keeps the structure honest, not stiff.",
      "A single button closure and welt pockets complete a silhouette built to be worn as the outfit, not layered beneath one."
    ],
    "materials": [
      "64% wool, 34% polyester, 2% elastane",
      "Bemberg lining",
      "Interior canvas construction"
    ],
    "care": [
      "Dry clean only",
      "Store on a structured hanger"
    ],
    "tone": 7,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "Investment piece",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-02-11",
        "verified": true
      }
    ]
  },
  {
    "id": "p6",
    "featured": true,
    "slug": "lacoste-loopback-sweatshirt",
    "name": "Loopback Sweatshirt",
    "brand": "lacoste",
    "brandName": "Lacoste",
    "category": "unisex",
    "collection": "the-essentials",
    "price": 98,
    "isNew": false,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Black",
        "hex": "#181818"
      },
      {
        "name": "White",
        "hex": "#efeee9"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.5,
    "reviewCount": 56,
    "shortDescription": "Loopback crewneck sweatshirt with a relaxed body.",
    "description": [
      "A quieter staple: loopback cotton construction with a relaxed, unstructured body and a ribbed crew, hem and cuff.",
      "Built to soften and mold with every wash, without ever losing its shape."
    ],
    "materials": [
      "100% loopback cotton",
      "Ribbed crew, cuff and hem"
    ],
    "care": [
      "Machine wash cold",
      "Tumble dry low"
    ],
    "tone": 2,
    "reviews": []
  },
  {
    "id": "p7",
    "featured": true,
    "slug": "nike-everyday-short",
    "name": "Everyday Short",
    "brand": "nike",
    "brandName": "Nike",
    "category": "men",
    "collection": "off-duty",
    "price": 68,
    "isNew": true,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Parachute Beige",
        "hex": "#c3ad8a"
      },
      {
        "name": "Black",
        "hex": "#171717"
      }
    ],
    "sizes": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.4,
    "reviewCount": 22,
    "shortDescription": "Garment-washed twill short with a tailored inseam.",
    "description": [
      "A five-inch inseam, garment-washed twill and a tailored front give the Everyday Short a cleaner line than the average warm-weather staple."
    ],
    "materials": [
      "98% cotton, 2% elastane twill",
      "Garment-washed finish"
    ],
    "care": [
      "Machine wash cold",
      "Tumble dry low"
    ],
    "tone": 3,
    "reviews": []
  },
  {
    "id": "p8",
    "featured": true,
    "slug": "adidas-six-panel-cap",
    "name": "Six-Panel Cap",
    "brand": "adidas",
    "brandName": "Adidas",
    "category": "accessories",
    "collection": "the-essentials",
    "price": 42,
    "isNew": false,
    "isBestSeller": true,
    "colors": [
      {
        "name": "Black",
        "hex": "#181818"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.8,
    "reviewCount": 74,
    "shortDescription": "Structured six-panel cap with tonal embroidery.",
    "description": [
      "A structured six-panel silhouette finished with a tonal, embroidered logo and an adjustable strap for a considered, no-fuss fit."
    ],
    "materials": [
      "100% cotton twill",
      "Tonal embroidery",
      "Adjustable brass buckle strap"
    ],
    "care": [
      "Spot clean only"
    ],
    "tone": 8,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "Great everyday cap",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-05-02",
        "verified": true
      }
    ]
  },
  {
    "id": "p9",
    "featured": true,
    "slug": "tommy-hilfiger-pleated-wide-leg-trouser",
    "name": "Pleated Wide-Leg Trouser",
    "brand": "tommy-hilfiger",
    "brandName": "Tommy Hilfiger",
    "category": "women",
    "collection": "signature-tailoring",
    "price": 158,
    "isNew": true,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Black",
        "hex": "#181818"
      },
      {
        "name": "Chocolate",
        "hex": "#3e2b24"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.6,
    "reviewCount": 31,
    "shortDescription": "High-waisted wide-leg trouser in a fluid drape.",
    "description": [
      "A high waistband and fluid, wide leg create continuous movement: a trouser designed to read as sharp standing still and effortless in motion."
    ],
    "materials": [
      "76% viscose, 22% polyester, 2% elastane"
    ],
    "care": [
      "Dry clean recommended"
    ],
    "tone": 2,
    "reviews": []
  },
  {
    "id": "p10",
    "featured": false,
    "slug": "lacoste-knit-polo",
    "name": "Knit Polo",
    "brand": "lacoste",
    "brandName": "Lacoste",
    "category": "men",
    "collection": "the-essentials",
    "price": 88,
    "isNew": false,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Black Merle",
        "hex": "#56544c"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.3,
    "reviewCount": 18,
    "shortDescription": "Fine-gauge knit polo with a clean rib collar.",
    "description": [
      "A fine-gauge cotton knit polo, cut close without restriction, finished with a clean rib collar and a two-button placket."
    ],
    "materials": [
      "100% mercerized cotton"
    ],
    "care": [
      "Hand wash cold",
      "Dry flat"
    ],
    "tone": 6,
    "reviews": []
  },
  {
    "id": "p11",
    "featured": false,
    "slug": "versace-satin-slip-dress",
    "name": "Satin Slip Dress",
    "brand": "versace",
    "brandName": "Versace",
    "category": "women",
    "collection": "statement-pieces",
    "price": 178,
    "isNew": true,
    "isBestSeller": true,
    "colors": [
      {
        "name": "Black",
        "hex": "#181818"
      }
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "rating": 4.9,
    "reviewCount": 45,
    "shortDescription": "Bias-cut satin slip dress in tonal black.",
    "description": [
      "Cut on the bias for a fluid, body-skimming fall, the Slip Dress is finished with adjustable straps and a clean cowl neckline."
    ],
    "materials": [
      "97% viscose, 3% elastane satin"
    ],
    "care": [
      "Dry clean only"
    ],
    "tone": 7,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "Fabric feels expensive",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-06-27",
        "verified": true
      }
    ]
  },
  {
    "id": "p12",
    "featured": false,
    "slug": "tommy-hilfiger-canvas-tote",
    "name": "Canvas Tote",
    "brand": "tommy-hilfiger",
    "brandName": "Tommy Hilfiger",
    "category": "accessories",
    "collection": "the-essentials",
    "price": 58,
    "isNew": false,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Beige",
        "hex": "#d1bfa4"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.2,
    "reviewCount": 12,
    "shortDescription": "Heavyweight canvas tote with leather handles.",
    "description": [
      "A heavyweight canvas construction with vegetable-tanned leather handles and an internal pocket: built to be carried daily."
    ],
    "materials": [
      "16oz cotton canvas",
      "Vegetable-tanned leather handles"
    ],
    "care": [
      "Spot clean only"
    ],
    "tone": 1,
    "reviews": []
  },
  {
    "id": "p13",
    "featured": false,
    "slug": "adidas-ribbed-beanie",
    "name": "Ribbed Beanie",
    "brand": "adidas",
    "brandName": "Adidas",
    "category": "accessories",
    "collection": "off-duty",
    "price": 38,
    "isNew": true,
    "isBestSeller": false,
    "colors": [
      {
        "name": "Black / Olive Strata",
        "hex": "#4c5141"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "rating": 4.5,
    "reviewCount": 9,
    "shortDescription": "Fine-rib merino beanie with a folded cuff.",
    "description": [
      "A fine-gauge merino rib knit with a folded cuff and a tonal woven label: quietly finished, built for warmth without bulk."
    ],
    "materials": [
      "100% merino wool"
    ],
    "care": [
      "Hand wash cold",
      "Dry flat"
    ],
    "tone": 3,
    "reviews": []
  },
  {
    "id": "p14",
    "featured": false,
    "slug": "calvin-klein-relaxed-jean",
    "name": "Relaxed Jean",
    "brand": "calvin-klein",
    "brandName": "Calvin Klein",
    "category": "unisex",
    "collection": "off-duty",
    "price": 138,
    "compareAtPrice": 165,
    "isNew": false,
    "isBestSeller": true,
    "colors": [
      {
        "name": "Harbour Blue",
        "hex": "#778c9f"
      },
      {
        "name": "Washed Bone",
        "hex": "#e1d9c8"
      }
    ],
    "sizes": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "rating": 4.7,
    "reviewCount": 96,
    "shortDescription": "Rigid selvedge denim in a relaxed, tapered fit.",
    "description": [
      "A relaxed thigh tapers to a clean leg opening. Rigid selvedge denim is left unwashed to break in and fade uniquely to the wearer."
    ],
    "materials": [
      "100% cotton selvedge denim, 14.5oz"
    ],
    "care": [
      "Wash cold, inside out, sparingly",
      "Hang dry"
    ],
    "tone": 6,
    "reviews": [
      {
        "author": "Demo Reviewer",
        "rating": 5,
        "title": "Denim quality is excellent",
        "body": "Placeholder review copy: replace with genuine customer feedback before launch.",
        "date": "2026-01-19",
        "verified": true
      }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter((p) => p.collection === collection);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, limit);
}

export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
export const allColors = Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name))));

export function getTopPicks(): Product[] {
  return products.filter(product => product.featured);
}
