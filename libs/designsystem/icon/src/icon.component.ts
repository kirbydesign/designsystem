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

export enum IconSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const CUSTOM_NAME_DEPRECATION_WARNING =
  'Deprecation warning: The customName input property for "kirby-icon" is deprecated and will be removed in v10. The name input property already supports icons registered via the iconRegistryService, and should be used instead of customName.';

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.kirby-icon]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  defaultIcon: Icon;
  private _icon;
  private _customName;
  @HostBinding('class')
  @Input()
  size: IconSize | `${IconSize}`;

  @Input() name: string;

  @Input() set customName(customName: string) {
    console.warn(CUSTOM_NAME_DEPRECATION_WARNING);
    this._customName = customName;
  }
  get customName(): string {
    return this._customName;
  }
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

  constructor(private iconRegistryService: IconRegistryService) {
    this.defaultIcon = this.iconRegistryService.getIcon('cog');
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && changes.name.currentValue) {
      this.icon = this.iconRegistryService.getIcon(changes.name.currentValue);
    } else if (changes.customName && changes.customName.currentValue) {
      this.icon = this.iconRegistryService.getIcon(changes.customName.currentValue);
    }
  }
}
