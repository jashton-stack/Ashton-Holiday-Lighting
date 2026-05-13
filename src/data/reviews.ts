export type Review = {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date?: string;
  source: 'Google Review' | 'Direct';
};

// NOTE: Carey F.'s original Google review mentions "Govee" (a brand of permanent
// lighting Josiah previously installed). That specific brand reference was removed
// since Ashton Holiday Lighting now sells EverLights as the product going forward.
// Substance of the review (on-time, kept his word, good guy) is preserved.
export const REVIEWS: Review[] = [
  {
    name: 'Carey F.',
    rating: 5,
    text: "Josiah did a great job on our light install. He was on time, did what he promised for the price he quoted. And he's a really good guy. I highly recommend him!",
    source: 'Google Review',
  },
  {
    name: 'Denise R.',
    rating: 5,
    text: 'Josiah is great! Good communication. Very detailed work. Cleaned up and was done quick.',
    source: 'Google Review',
  },
  {
    name: 'Patricia A.',
    rating: 5,
    text: 'We have enjoyed our lights from Ashton Holiday Lighting. Very easy to work with, scheduled and completed on time. Great service. This company has my referrals.',
    source: 'Google Review',
  },
];
