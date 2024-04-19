import { Injectable } from '@angular/core';

import { Icon } from './icon-settings';
import { kirbyIconSettings } from './kirby-icon-settings';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private iconRegistry = new Map<string, string>();

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
    this.addIcons(kirbyIconSettings.icons);
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
