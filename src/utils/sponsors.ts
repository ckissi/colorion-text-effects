import config from '../data/sponsors.json';

export const SPONSOR_THEMES = ['pink', 'blue', 'green', 'red', 'lavender', 'amber'] as const;
export type SponsorTheme = (typeof SPONSOR_THEMES)[number];

export interface Sponsor {
  name: string;
  description?: string;
  url: string;
  logo?: string;
  theme?: SponsorTheme;
  active?: boolean;
}

const themes = new Set<string>(SPONSOR_THEMES);

// Only active sponsors with an absolute http(s) URL are rendered; anything else
// is skipped so a half-filled entry never ships a dead or unsafe link.
export const sponsors: Sponsor[] = (config.sponsors as Sponsor[])
  .filter((sponsor) => sponsor.active !== false && /^https?:\/\//i.test(sponsor.url))
  .map((sponsor) => ({
    ...sponsor,
    theme: sponsor.theme && themes.has(sponsor.theme) ? sponsor.theme : 'pink',
  }));

export const hasSponsors = sponsors.length > 0;
