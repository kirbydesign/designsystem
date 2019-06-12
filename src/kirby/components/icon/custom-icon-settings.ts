import { InjectionToken } from '@angular/core';

export interface CustomIcon {
  name: string;
  svg?: string;
  unicode: string;
  fromCharCode?: string;
}

export interface CustomIconSettings {
  fontfamily: string;
  icons: CustomIcon[];
}

export const CUSTOM_FONT_SETTINGS = new InjectionToken<CustomIconSettings>('CustomIconSettings');
