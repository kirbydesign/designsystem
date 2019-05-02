import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { Label } from 'tns-core-modules/ui/label/label';
import {
  Directive,
  ElementRef,
  Input,
  Inject,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { CUSTOM_FONT_SETTINGS, CustomIconSettings } from './custom-icon-settings';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[customName]',
})
export class CustomIconNameDirective implements AfterViewInit, OnChanges {
  @Input('customName') customName: string;

  constructor(
    private element: ElementRef,
    @Inject(CUSTOM_FONT_SETTINGS) private customIconSettings: CustomIconSettings
  ) {}

  ngAfterViewInit(): void {
    this.handleCustomIcon(this.customName);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customName) {
      this.handleCustomIcon(this.customName);
    }
  }

  handleCustomIcon(name: string) {
    if (name && this.customIconSettings[0].icons) {
      const fontFamily = this.customIconSettings[0].fontfamily;
      const icon = this.getCustomIcon(name);

      if (fontFamily === undefined) {
        console.warn('Missing font-family.');
      } else if (icon === undefined) {
        console.warn('Icon with name', name, 'was not found in custom font.');
      } else {
        this.setCustomIcon(icon.unicode, fontFamily);
      }
    }
  }

  getCustomIcon(name: string): { name: string; svg: string; unicode: string } {
    return this.customIconSettings[0].icons.find((icon) => icon.name === name);
  }

  setCustomIcon(unicode: string, fontFamily: string) {
    const hostElement = <LayoutBase>this.element.nativeElement;

    if (hostElement.getChildrenCount() > 0) {
      const label = <Label>hostElement.getChildAt(0);
      label.style.fontFamily = fontFamily;
      label.text = String.fromCharCode(Number(unicode));
    }
  }
}
