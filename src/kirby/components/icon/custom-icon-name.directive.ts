import { Directive, ElementRef, OnInit, Input, Inject } from '@angular/core';

import { CUSTOM_FONT_SETTINGS, CustomIconSettings } from './custom-icon-settings';

@Directive({
  selector: 'kirby-icon[kirbyCustomName]',
})
export class CustomIconNameDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('kirbyCustomName') iconName: string;

  constructor(
    private element: ElementRef,
    @Inject(CUSTOM_FONT_SETTINGS) private customIconSettings: CustomIconSettings
  ) {}

  ngOnInit() {
    this.handleCustomIcon();
  }

  handleCustomIcon() {
    if (this.iconName && this.customIconSettings[0].icons) {
      const icon = this.getCustomIcon(this.iconName);

      if (icon !== undefined) {
        this.setCustomIcon(icon.svg);
      } else {
        console.warn('Icon with name', this.iconName, 'was not found in costume font.');
      }
    }
  }

  getCustomIcon(name: string): { name: string; svg: string; unicode: string } {
    return this.customIconSettings[0].icons.find((icon) => icon.name === name);
  }

  setCustomIcon(svg: string) {
    const hostElement = <HTMLElement>this.element.nativeElement;
    if (hostElement.children.length > 0) {
      hostElement.children[0].setAttribute('src', svg);
    }
  }
}
