export const SITE = {
  name: 'Ashton Holiday Lighting',
  shortName: 'Ashton Lighting',
  tagline: "Omaha's Certified EverLights Dealer",
  phone: '(402) 889-8640',
  phoneHref: 'tel:+14028898640',
  email: 'josiah.ashton@gmail.com',
  serviceArea: 'Omaha metro within 25 miles',
  homesLit: '50+',
  yearsExperience: '2',
  cities: ['Omaha', 'Council Bluffs', 'Bellevue', 'Papillion', 'La Vista', 'Gretna', 'Bennington'],
  googleBusinessUrl: 'https://www.google.com/search?q=Ashton+Holiday+Lighting+Omaha',
  ownerFirstName: 'Josiah',
  ownerFullName: 'Josiah Ashton',
} as const;

export type PricingTier = {
  size: string;
  footage: string;
  price: string;
  highlight?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  { size: 'Small home',              footage: 'Up to 100 ft', price: 'Starting at $3,199' },
  { size: 'Average home',            footage: 'Up to 150 ft', price: 'Starting at $4,749', highlight: true },
  { size: 'Larger home',             footage: 'Up to 200 ft', price: 'Starting at $6,349' },
  { size: 'Two-story with gables',   footage: 'Up to 250 ft', price: 'Starting at $7,949' },
  { size: 'Estate / commercial',     footage: '300 ft+',      price: 'Custom quote' },
];

export const GOVEE_PRICING_TIERS: PricingTier[] = [
  { size: 'Small home',              footage: 'Up to 100 ft', price: 'Starting at $1,050' },
  { size: 'Average home',            footage: 'Up to 150 ft', price: 'Starting at $1,250', highlight: true },
  { size: 'Larger home',             footage: 'Up to 200 ft', price: 'Starting at $1,450' },
  { size: 'Two-story with gables',   footage: 'Up to 250 ft', price: 'Starting at $1,650' },
  { size: 'Extra-large home',        footage: 'Up to 300 ft', price: 'Starting at $1,850' },
];

export const GOVEE_PRICING_NOTE = 'Over 300 ft: add $200 per additional 50 ft.';

export const PRICING_DISCLAIMER =
  'Final pricing depends on linear footage, peak count, gables, height, and complexity. Free, no-pressure quote within 24 hours.';

export const NAV_LINKS: ReadonlyArray<{ to: string; label: string }> = [
  { to: '/install',  label: 'How it works' },
  { to: '/pricing',  label: 'Pricing' },
  { to: '/about',    label: 'About' },
  { to: '/reviews',  label: 'Reviews' },
  { to: '/faq',      label: 'FAQ' },
];
