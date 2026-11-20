export interface Brand {
  /** Value of the data-kirby-brand attribute. Must match a selector in scss/_brands.scss. */
  id: string;
  text: string;
}

export const DEFAULT_BRAND: Brand = { id: 'kirby', text: 'Kirby' };

export const BRANDS: Brand[] = [
  DEFAULT_BRAND,
  { id: 'djurslandsbank', text: 'Djurslands Bank' },
  { id: 'jyskebank', text: 'Jyske Bank' },
  { id: 'kreditbanken', text: 'Kreditbanken' },
  { id: 'landbobanken', text: 'Landbobanken' },
  { id: 'skjernbank', text: 'Skjern Bank' },
  { id: 'spks', text: 'Sparekassen Kronjylland' },
  { id: 'sydbank', text: 'Sydbank' },
];
