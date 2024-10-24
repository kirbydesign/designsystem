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
    kirbyIconSettings.icons.forEach(({ name, svg }) => {
      const url = baseUrlWithSlash + svg;
      this.addIcon(name, url);
    });
  }

  getIcons(): Icon[] {
    return [...this.iconRegistry].map(
      (keyValPair) => ({ name: keyValPair[0], svg: keyValPair[1] }) as Icon
    );
  }

  getIcon(name: string): Icon {
    const svg = this.iconRegistry.get(name);
    return svg ? { name, svg } : undefined;
  }
}
