import {
  Component,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';

import { kirbyIconSettings } from './kirby-icon-settings';
import { ICON_SETTINGS, Icon, IconSettings } from './icon-settings';

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  @HostBinding('class.kirby-icon') true;
  defaultIcon: Icon = this.findIcon(kirbyIconSettings.icons, 'cog');
  private _icon = (this.icon = this.defaultIcon);

  @Input() name: string;
  @Input() customName: string;

  get icon(): Icon {
    return this._icon;
  }

  set icon(icon: Icon) {
    // Check if ICON_SETTINGS are configured
    if (!this.iconSettings && this.customName) {
      console.warn(
        'ICON_SETTINGS provider in your module.ts is not set. Read documentation on how to set it up.'
      );
    }

    // If icon are not found, set default icon
    if (!icon && (this.name || this.customName)) {
      console.warn(`Icon with name "${this.name || this.customName}" was not found.`);
      icon = this.defaultIcon;

      // If default icon are not found
      if (!icon) {
        console.warn('Default icon was not found.');
        return;
      }
    }

    // Set icon if it's found
    if (icon) {
      this._icon = icon;
    }
  }

  constructor(@Optional() @Inject(ICON_SETTINGS) private iconSettings?: IconSettings) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && changes.name.currentValue) {
      this.icon = this.findIcon(kirbyIconSettings.icons, changes.name.currentValue);
    } else if (changes.customName && changes.customName.currentValue) {
      this.icon = this.findIcon(this.iconSettings.icons, changes.customName.currentValue);
    }
  }

  private findIcon(icons, name: string): Icon {
    return icons.find((icon) => icon.name === name);
  }
}

export const icons: Icon[] = [...kirbyIconSettings.icons];
