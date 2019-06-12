import { Component, Inject, Input, Optional } from '@angular/core';
import { kirbyCustomIconSettings } from './kirby';
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
export class IconComponent {
  defaultIcon: CustomIcon = this.getCustomIcon(kirbyCustomIconSettings.icons, 'cog');

  ionicon: CustomIcon;
  kirbyIcon: CustomIcon;
  customIcon: CustomIcon;
  fontFamily: string;

  @Input()
  set name(val) {
    const kirbyIcon = this.getCustomIcon(kirbyCustomIconSettings.icons, val);
    if (kirbyIcon) {
      this.fontFamily = kirbyCustomIconSettings.fontfamily;
      this.kirbyIcon = { ...kirbyIcon, fromCharCode: this.fromCharCode(kirbyIcon.unicode) };
    } else {
      this.kirbyIcon = {
        ...this.defaultIcon,
        fromCharCode: this.fromCharCode(this.defaultIcon.unicode),
      };
      console.warn('Icon with name', val, 'was not found.');
    }
  }

  @Input()
  set customName(val) {
    if (!this.customIconSettings) {
      console.warn(
        'CUSTOM_FONT_SETTINGS provider in your module.ts is not set. Read documentation on how to set it up.'
      );
    } else {
      this.kirbyIcon = null;
      const customIcon = this.getCustomIcon(this.customIconSettings.icons, val);
      if (customIcon) {
        this.fontFamily = this.customIconSettings.fontfamily;
        this.customIcon = { ...customIcon, fromCharCode: this.fromCharCode(customIcon.unicode) };
      } else {
        this.customIcon = null;
        this.kirbyIcon = {
          ...this.defaultIcon,
          fromCharCode: this.fromCharCode(this.defaultIcon.unicode),
        };
        console.warn('Icon with name', val, 'was not found in custom icons.');
      }
    }
  }

  constructor(
    @Optional() @Inject(CUSTOM_FONT_SETTINGS) private customIconSettings?: CustomIconSettings
  ) {}

  private fromCharCode(icon) {
    return String.fromCharCode(icon);
  }

  private getCustomIcon(icons, name: string): CustomIcon {
    return icons.find((icon) => icon.name === name);
  }
}

export const icons: CustomIcon[] = [...kirbyCustomIconSettings.icons];
