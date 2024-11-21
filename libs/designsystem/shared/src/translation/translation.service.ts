import { Injectable } from '@angular/core';
import { Inject, LOCALE_ID } from '@angular/core';
import { da } from './translations/da';
import { enUS } from './translations/en-us';
import { Translation } from './translation.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [key: string]: Translation } = {
    da,
    'en-US': enUS,
  };

  public currentTranslation: Translation = enUS;

  constructor(@Inject(LOCALE_ID) private localeId: string) {
    this.setCurrentTranslation(localeId);
  }

  setCurrentTranslation(localeId: string): string {
    const translation = this.translations[localeId];

    if (!translation) {
      console.warn(`Translation not found for locale "${this.localeId}", falling back to "en-US"`);
      return;
    }

    this.currentTranslation = translation;
  }
}
