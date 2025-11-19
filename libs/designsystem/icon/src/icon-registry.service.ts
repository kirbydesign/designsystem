import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Icon } from './icon-settings';
import { kirbyIconSettings } from './kirby-icon-settings';

export const DEFAULT_BUILT_IN_ICONS_URL = 'assets/kirby/icons/svg/';

/**
 * Token used to configure base URL for path to built-in icons. Default is 'assets/kirby/icons/svg'.
 */
export const BUILT_IN_ICONS_URL = new InjectionToken<string>('BUILT_IN_ICONS_URL', {
  factory: () => DEFAULT_BUILT_IN_ICONS_URL,
});

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private iconRegistry = new Map<string, string>();

  constructor(@Inject(BUILT_IN_ICONS_URL) private builtInIconsUrl: string) {
    this.addDefaultIcons();
  }

  addIcon(iconName: string, svgPath: string): void {
    if (!this.iconRegistry.has(iconName)) {
      this.iconRegistry.set(iconName, svgPath);
    } else {
      console.warn(`Icon with name: "${iconName}" already exists`);
    }
  }

  addIcons(icons: Icon[]): void {
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
    this.addIcons(
      kirbyIconSettings.icons.map((icon) => ({ name: icon.name, svg: baseUrlWithSlash + icon.svg }))
    );
  }

  getIcons(): Icon[] {
    return Array.from(this.iconRegistry.keys()).map((key) => this.getIcon(key));
  }

  getIcon(name: string): Icon {
    const svg = this.iconRegistry.get(name);
    return svg ? { name, svg } : undefined;
  }
}
