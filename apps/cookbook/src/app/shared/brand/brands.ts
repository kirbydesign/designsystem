export interface Brand {
  /** Value of the kirby-brand attribute. Must match a selector in scss/_brands.scss. */
  id: string;
  text: string;
  /** Name of the kirby-icon representing the brand. */
  icon: string;
  /** Logo registered as `icon` in the IconRegistryService. Built-in icons have none. */
  logo?: string;
}

function bank(id: string, text: string): Brand {
  return { id, text, icon: `brand-${id}`, logo: `assets/brands/${id}.svg` };
}

export const DEFAULT_BRAND: Brand = { id: 'kirby', text: 'Kirby', icon: 'kirby' };

export const BRANDS: Brand[] = [
  DEFAULT_BRAND,
  bank('djurslandsbank', 'Djurslands Bank'),
  bank('jyskebank', 'Jyske Bank'),
  bank('kreditbanken', 'Kreditbanken'),
  bank('landbobanken', 'Ringkjøbing Landbobank'),
  bank('skjernbank', 'Skjern Bank'),
  bank('spks', 'SJF Bank'),
  bank('sydbank', 'AL Sydbank'),
];
