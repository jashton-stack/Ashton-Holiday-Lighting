/**
 * Photos shown in the homepage gallery section.
 *
 * IMPORTANT — provenance: almost every entry below is EverLights marketing
 * material, not Josiah's personal install work. The gallery showcases what
 * EverLights as a product looks like (residential + commercial), not a
 * personal portfolio. Copy on the page is intentionally framed that way.
 * See memory feedback_gallery_provenance.md.
 *
 * Adding a photo:
 *   1. Drop the optimized image into public/images/gallery/
 *      (Use scripts/optimize-image.mjs to resize first — keeps long edge ≤ 1800px.)
 *   2. Add an entry below with the file's `src`, an honest `alt`, the right
 *      `category`, and an `aspect` hint so the masonry grid renders correctly.
 *
 * The Gallery component renders styled placeholder tiles for categories with
 * zero entries, so the layout is visible while photos are being collected.
 */

export type GalleryCategory = 'residential' | 'commercial';

export type GalleryPhoto = {
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Aspect ratio hint for the masonry layout. Defaults to '3/2' if omitted. */
  aspect?: '3/2' | '4/3' | '4/5' | '1/1' | '16/9';
  /** Optional: short context shown in a tooltip / under the image. */
  caption?: string;
  /** True if this photo is Josiah's own install (not marketing material). */
  ownInstall?: boolean;
};

export const GALLERY: GalleryPhoto[] = [
  // --- Residential ---
  {
    src: '/images/gallery/residential-01-porch.jpg',
    alt: 'Warm-white and red accent lighting along the eaves of a craftsman-style home with stone columns and a covered porch at dusk',
    category: 'residential',
    aspect: '4/3',
    ownInstall: true,
  },
  {
    src: '/images/gallery/residential-02-arch.jpg',
    alt: 'Two-story stone and brick home with a timber entry arch, warm-white EverLights tracing the roofline at dusk with mountains in the background',
    category: 'residential',
    aspect: '1/1',
  },
  {
    src: '/images/gallery/residential-03-red-blue.jpg',
    alt: 'Multi-peak home lit with red and blue EverLights against a deep blue dusk sky',
    category: 'residential',
    aspect: '4/3',
  },
  {
    src: '/images/gallery/residential-04-palms.jpg',
    alt: 'Two-story stucco home framed by palm trees, with red and green EverLights along the roofline and balcony for the Christmas season',
    category: 'residential',
    aspect: '16/9',
  },
  {
    src: '/images/gallery/residential-05-christmas.jpg',
    alt: 'Modern flat-roof two-story home at dusk with EverLights running along every roofline in red, green, blue, and white for the Christmas season',
    category: 'residential',
    aspect: '16/9',
  },

  // --- Commercial ---
  {
    src: '/images/gallery/commercial-01-restaurant.jpg',
    alt: 'A restaurant storefront at night with warm-white EverLights running cleanly along every roofline',
    category: 'commercial',
    aspect: '16/9',
  },
  {
    src: '/images/gallery/commercial-02-carwash.jpg',
    alt: 'A commercial car wash lit with red, white, and blue EverLights across its full façade and signage',
    category: 'commercial',
    aspect: '3/2',
  },
  {
    src: '/images/gallery/commercial-03-plaza.jpg',
    alt: 'A multi-level public plaza with green EverLights tracing the architectural beams and ceilings at night',
    category: 'commercial',
    aspect: '3/2',
  },
];

export const PLACEHOLDER_COUNTS: Record<GalleryCategory, number> = {
  residential: 5,
  commercial: 3,
};
