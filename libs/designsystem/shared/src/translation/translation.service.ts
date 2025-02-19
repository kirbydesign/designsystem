import { Injectable } from '@angular/core';
import { Inject, LOCALE_ID } from '@angular/core';
import { da } from './translations/da';
import { en } from './translations/en';
import { de } from './translations/de';
import { Translation } from './translation.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private activeTranslation: Translation = en;
  private translations: { [key: string]: Translation } = { da, en, de };

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    this.setActiveTranslation(localeId);
  }

  private setActiveTranslation(localeId: string): string {
    const baseLocaleId = localeId.split('-')[0];
    const translation = this.translations[baseLocaleId];

    if (!translation) {
      console.warn(
        `[Kirby] Internal component translations were not found for locale "${this.localeId}", falling back to ${this.get('$code')}`
      );
      return;
    }

    this.activeTranslation = translation;
  }

  get(key: keyof Translation): string {
    return this.activeTranslation[key];
  }
}
