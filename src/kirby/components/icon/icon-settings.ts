import { InjectionToken } from '@angular/core';

export interface Icon {
  name: string;
  svg?: string;
  unicode: string;
  charCode?: string;
}

export interface IconSettings {
  fontfamily: string;
  icons: Icon[];
}

export const ICON_SETTINGS = new InjectionToken<IconSettings>('IconSettings');
