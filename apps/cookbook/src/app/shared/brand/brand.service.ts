import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { Brand, BRANDS, DEFAULT_BRAND } from './brands';

const STORAGE_KEY = 'kirby-cookbook-brand';
const ATTRIBUTE = 'data-kirby-brand';

/**
 * Owns the active brand theme. The choice is stored in localStorage, so every
 * same-origin document (including the iframes in <cookbook-iphone>) picks it up
 * on load and follows changes live through the `storage` event.
 */
@Injectable({ providedIn: 'root' })
export class BrandService {
  private document = inject(DOCUMENT);
  private _brand = signal<Brand>(DEFAULT_BRAND);

  readonly brands = BRANDS;
  readonly brand = this._brand.asReadonly();

  init() {
    this.apply(this.findBrand(this.readStoredId()));
    this.document.defaultView?.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY) {
        this.apply(this.findBrand(event.newValue));
      }
    });
  }

  setBrand(brand: Brand) {
    this.apply(brand);
    try {
      localStorage.setItem(STORAGE_KEY, brand.id);
    } catch {
      // Storage may be unavailable (e.g. privacy mode); the brand still applies to this page.
    }
  }

  private apply(brand: Brand) {
    this._brand.set(brand);
    const root = this.document.documentElement;
    if (brand === DEFAULT_BRAND) {
      root.removeAttribute(ATTRIBUTE);
    } else {
      root.setAttribute(ATTRIBUTE, brand.id);
    }
  }

  private findBrand(id: string | null): Brand {
    return this.brands.find((brand) => brand.id === id) ?? DEFAULT_BRAND;
  }

  private readStoredId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }
}
