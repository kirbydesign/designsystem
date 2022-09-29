import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { IconRegistryService } from './icon-registry.service';
import { Icon } from './icon-settings';
import { kirbyIconSettings } from './kirby-icon-settings';

export enum IconSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.kirby-icon]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  defaultIcon: Icon = this.findIcon(kirbyIconSettings.icons, 'cog');
  private _icon = (this.icon = this.defaultIcon);
  @HostBinding('class')
  @Input()
  size: IconSize | `${IconSize}`;

  @Input() name: string;
  @Input() customName: string;

  get icon(): Icon {
    return this._icon;
  }

  set icon(icon: Icon) {
    // If icon are not found, set default icon
    if (!icon && (this.name || this.customName)) {
      this.warnAboutMissingIcon();

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

  private warnAboutMissingIcon(): void {
    if (this.customName) {
      console.warn(`Custom icon with name "${this.customName}" was not found. 
        Do you have a typo in 'customName' or
        forgot to configure the custom icon through the 'IconRegistryService'?`);
    } else {
      console.warn(`Built-in icon with name "${this.name}" was not found. 
        Do you have a typo in 'name' or
        did you mean to use a custom icon? If so, please use: 
        <kirby-icon customName="${this.name}"></kirby-icon>`);
    }
  }

  constructor(private iconRegistryService: IconRegistryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && changes.name.currentValue) {
      this.icon = this.findIcon(kirbyIconSettings.icons, changes.name.currentValue);
    } else if (changes.customName && changes.customName.currentValue) {
      this.icon = this.iconRegistryService.getIcon(changes.customName.currentValue);
    }
  }

  private findIcon(icons, name: string): Icon {
    return icons.find((icon) => icon.name === name);
  }
}
