import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
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

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  host: { '[class.kirby-icon]': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IconComponent implements OnChanges {
  defaultIcon: Icon = this.iconRegistryService.getIcon('cog');
  private _icon = (this.icon = this.defaultIcon);
  private element: HTMLElement;

  @HostBinding('class')
  @Input()
  size: IconSize | `${IconSize}`;

  @Input() name: string;

  get icon(): Icon {
    return this._icon;
  }

  set icon(icon: Icon) {
    // If icon are not found, set default icon
    if (!icon && this.name) {
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
    console.warn(`Icon with name "${this.name}" was not found. 
Do you have a typo in 'name' for a built-in icon or
forgot to configure the custom icon through the 'IconRegistryService'?`);
  }

  constructor(
    private iconRegistryService: IconRegistryService,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.element = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name && changes.name.currentValue) {
      this.icon = this.iconRegistryService.getIcon(changes.name.currentValue);

      // This will always run on first init - and again later if name is changed
      // If name changes a new aria-label might have been added, so we need to check again.
      this.setAriaHiddenIfNoLabel();
    }
  }

  private setAriaHiddenIfNoLabel() {
    const existingAriaLabel = this.element.hasAttribute('aria-label');
    if (!existingAriaLabel) {
      this.renderer.setAttribute(this.element, 'aria-hidden', 'true');
    }
  }
}
