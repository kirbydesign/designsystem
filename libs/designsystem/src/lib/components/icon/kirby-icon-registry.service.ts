import { Injectable } from '@angular/core';

import { Icon } from './icon-settings';

@Injectable({
  providedIn: 'root',
})
export class IconRegistryService {
  private iconRegistry = new Map<string, string>();

  addIcon(iconName: string, svgPath: string): void {
    this.iconRegistry.set(iconName, svgPath);
  }

  addIcons(icons: Icon[]): void {
    if (!icons) {
      console.error('Icons not defined');
      return;
    }
    icons.forEach((icon) => {
      if (!this.iconRegistry.has(icon.name)) {
        this.addIcon(icon.name, icon.svg);
      } else {
        console.warn(`Icon with name: "${icon.name}" allready excist`);
      }
    });
  }

  getIcons(): Icon[] {
    return [...this.iconRegistry].map(
      (keyValPair) => ({ name: keyValPair[0], svg: keyValPair[1] } as Icon)
    );
  }
}
