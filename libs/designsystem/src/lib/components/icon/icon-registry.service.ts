import { Inject, Injectable, Optional } from '@angular/core';

import { Icon, IconSettings, ICON_SETTINGS } from './icon-settings';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private iconRegistry = new Map<string, string>();

  constructor(@Optional() @Inject(ICON_SETTINGS) iconSettings?: IconSettings) {
    if (iconSettings) {
      this.addIcons(iconSettings.icons);
      console.warn(`Use of IconSettings is deprecated, use IconRegistryService instead`);
    }
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

  getIcons(): Icon[] {
    return [...this.iconRegistry].map(
      (keyValPair) => ({ name: keyValPair[0], svg: keyValPair[1] } as Icon)
    );
  }

  public getIcon(name: string): Icon {
    const svg = this.iconRegistry.get(name);
    return svg ? { name, svg } : undefined;
  }
}
