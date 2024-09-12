import { inject, Injectable, InjectionToken } from '@angular/core';

import { Icon } from './icon-settings';
import { kirbyIconSettings } from './kirby-icon-settings';

export const BUILT_IN_ICONS_URL_TOKEN = new InjectionToken<string>('BUILT_IN_ICONS_URL');

export const DEFAULT_BUILT_IN_ICONS_URL = 'assets/kirby/icons/svg';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private iconRegistry = new Map<string, string>();
  private builtInIconsUrl = inject(BUILT_IN_ICONS_URL_TOKEN, { optional: true });

  constructor() {
    this.addDefaultIcons();
  }

  public addIcon(iconName: string, svgPath: string): void {
    if (!this.iconRegistry.has(iconName)) {
      this.iconRegistry.set(iconName, svgPath);
    } else {
      console.warn(`Icon with name: "${iconName}" already exists`);
    }
  }

  public addIcons(icons: Icon[]): void {
    if (!icons) {
      console.error('Icons not defined');
      return;
    }
    icons.forEach((icon) => {
      this.addIcon(icon.name, icon.svg);
    });
  }

  private addDefaultIcons(): void {
    const baseUrl = this.builtInIconsUrl ?? DEFAULT_BUILT_IN_ICONS_URL;
    const baseUrlWithSlash = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    for (const { name, svg } of kirbyIconSettings.icons) {
      const url = baseUrlWithSlash + svg;
      this.addIcon(name, url);
    }
  }

  getIcons(): Icon[] {
    return [...this.iconRegistry].map(
      (keyValPair) => ({ name: keyValPair[0], svg: keyValPair[1] } as Icon)
    );
  }

  getIcon(name: string): Icon {
    const svg = this.iconRegistry.get(name);
    return svg ? { name, svg } : undefined;
  }
}
