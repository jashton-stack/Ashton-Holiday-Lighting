/**
 * Photos shown in the homepage gallery section.
 *
 * IMPORTANT — provenance: almost every entry below is EverLights marketing
 * material, not Josiah's personal install work. The gallery showcases what
 * EverLights as a product looks like (EverLights + Govee), not a
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

export type GalleryCategory = 'everlights' | 'govee';

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
  // --- EverLights ---
  {
    src: '/images/gallery/residential-01-purple-yellow.jpg',
    alt: 'Two-story stone-and-timber home at dusk with EverLights alternating warm yellow and rich purple along every roofline, moon rising in the sky',
    category: 'everlights',
    aspect: '4/3',
  },
  {
    src: '/images/gallery/residential-02-white.jpg',
    alt: 'Craftsman-style home with stone accents at night, warm-white EverLights tracing every peak and eave',
    category: 'everlights',
    aspect: '4/3',
  },
  {
    src: '/images/gallery/residential-03-porch.jpg',
    alt: 'Warm-white and red accent lighting along the eaves of a craftsman-style home with stone columns and a covered porch at dusk',
    category: 'everlights',
    aspect: '4/3',
    ownInstall: true,
  },
  {
    src: '/images/gallery/residential-04-blue.jpg',
    alt: 'Two-story stone-and-timber home at night with all-blue EverLights running across every roofline, moon visible in the sky',
    category: 'everlights',
    aspect: '4/3',
  },
  {
    src: '/images/gallery/residential-05-christmas.jpg',
    alt: 'Modern flat-roof two-story home at dusk with EverLights running along every roofline in red, green, blue, and white for the Christmas season',
    category: 'everlights',
    aspect: '16/9',
  },

  // --- Govee ---
  // Photos coming soon.
];

export const PLACEHOLDER_COUNTS: Record<GalleryCategory, number> = {
  everlights: 5,
  govee: 3,
};
