import { Component, Inject, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';

import { kirbyCustomIconSettings } from './kirby-custom-icon-settings';
import { CUSTOM_FONT_SETTINGS, CustomIcon, CustomIconSettings } from './custom-icon-settings';

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-icon',
  },
})
export class IconComponent implements OnChanges {
  defaultIcon: CustomIcon = this.getCustomIcon(kirbyCustomIconSettings.icons, 'cog');
  fontFamily: string = kirbyCustomIconSettings.fontfamily;
  private _icon = (this.icon = this.defaultIcon);

  @Input() name: string;
  @Input() customName: string;

  get icon(): CustomIcon {
    return this._icon;
  }

  set icon(icon: CustomIcon) {
    if (!this.customIconSettings && this.customName) {
      console.warn(
        'CUSTOM_FONT_SETTINGS provider in your module.ts is not set. Read documentation on how to set it up.'
      );
    }

    if (!icon && (this.name || this.customName)) {
      console.warn(`Icon with name "${this.name || this.customName}" was not found.`);
      icon = this.defaultIcon;

      if (!icon) {
        console.warn('Default icon was not found.');
        return;
      }
    }

    if (icon) {
      this._icon = {
        ...icon,
        fromCharCode: this.fromCharCode(icon.unicode),
      };
    }
  }

  constructor(
    @Optional() @Inject(CUSTOM_FONT_SETTINGS) private customIconSettings?: CustomIconSettings
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name) {
      this.fontFamily = kirbyCustomIconSettings.fontfamily;
      this.icon = this.getCustomIcon(kirbyCustomIconSettings.icons, changes.name.currentValue);
    } else if (changes.customName) {
      this.fontFamily = this.customIconSettings.fontfamily;
      this.icon = this.getCustomIcon(
        this.customIconSettings.icons,
        changes.customName.currentValue
      );
    }
  }

  private fromCharCode(icon) {
    return String.fromCharCode(icon);
  }

  private getCustomIcon(icons, name: string): CustomIcon {
    return icons.find((icon) => icon.name === name);
  }
}

export const icons: CustomIcon[] = [...kirbyCustomIconSettings.icons];
