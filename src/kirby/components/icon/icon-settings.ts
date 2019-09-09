import { InjectionToken } from '@angular/core';

export interface Icon {
  name: string;
  svg?: string;
}

export interface IconSettings {
  icons: Icon[];
}

export const ICON_SETTINGS = new InjectionToken<IconSettings>('IconSettings');
