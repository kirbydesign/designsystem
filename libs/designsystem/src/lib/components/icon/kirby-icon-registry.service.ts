import { Injectable } from '@angular/core';

import { Icon } from './icon-settings';

@Injectable({
  providedIn: 'root',
})
export class KirbyIconRegistryService {
  private iconRegistry = new Map<string, string>();
  constructor() {}

  addIcon(iconName: string, svgPath: string): void {
    this.iconRegistry.set(iconName, svgPath);
  }

  addIcons(icons: Icon[]): void {
    if (!icons) {
      console.error('Icon array not defined');
      return;
    }
    icons.forEach((icon) => {
      this.addIcon(icon.name, icon.svg);
    });
  }

  getCustomIcons(): Icon[] {
    return [...this.iconRegistry].map(
      (keyValPair) => ({ name: keyValPair[0], svg: keyValPair[1] } as Icon)
    );
  }
}
