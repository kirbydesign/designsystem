import { Directive, ElementRef, Input, Inject } from '@angular/core';

import { CUSTOM_FONT_SETTINGS, CustomIconSettings } from './custom-icon-settings';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'kirby-icon[customName]',
})
export class CustomIconNameDirective {
  @Input() set customName(name: string) {
    if (name) {
      this.handleCustomIcon(name);
    }
  }

  constructor(
    private element: ElementRef,
    @Inject(CUSTOM_FONT_SETTINGS) private customIconSettings: CustomIconSettings
  ) {}

  private handleCustomIcon(name: string) {
    if (this.customIconSettings[0].icons) {
      const icon = this.getCustomIcon(name);

      if (icon !== undefined) {
        this.setCustomIcon(icon.svg);
      } else {
        console.warn('Icon with name', name, 'was not found in custom font.');
      }
    }
  }

  private getCustomIcon(name: string): { name: string; svg: string; unicode: string } {
    return this.customIconSettings[0].icons.find((icon) => icon.name === name);
  }

  private setCustomIcon(svg: string) {
    const hostElement = <HTMLElement>this.element.nativeElement;
    if (hostElement.children.length > 0) {
      hostElement.children[0].setAttribute('src', svg);
    }
  }
}
