import { Injectable } from '@angular/core';
import { Inject, LOCALE_ID } from '@angular/core';
import { da } from './translations/da';
import { en } from './translations/en';
import { Translation } from './translation.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [key: string]: Translation } = {
    da,
    en,
  };

  public currentTranslation: Translation = en;

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    this.setCurrentTranslation(localeId);
  }

  setCurrentTranslation(localeId: string): string {
    const baseLocaleId = localeId.split('-')[0];
    const translation = this.translations[baseLocaleId];

    if (!translation) {
      console.warn(`Translation not found for locale "${this.localeId}", falling back to "en"`);
      return;
    }

    this.currentTranslation = translation;
  }
}
