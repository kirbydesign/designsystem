import { InjectionToken } from '@angular/core';

export interface CustomIconSettings {
  fontfamily: string;
  icons: Array<{ name: string; svg: string; unicode: string }>;
}

export const CUSTOM_FONT_SETTINGS = new InjectionToken<CustomIconSettings>('CustomIconSettings');
