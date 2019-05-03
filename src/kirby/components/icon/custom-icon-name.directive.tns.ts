import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';
import { Label } from 'tns-core-modules/ui/label/label';
import {
  Directive,
  ElementRef,
  Input,
  Inject,
  Optional,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { CUSTOM_FONT_SETTINGS, CustomIconSettings } from './custom-icon-settings';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[customName]',
})
export class CustomIconNameDirective implements AfterViewInit, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('customName') customName: string;

  constructor(
    private element: ElementRef,
    @Optional() @Inject(CUSTOM_FONT_SETTINGS) private customIconSettings?: CustomIconSettings
  ) {
    if (!this.customIconSettings) {
      console.warn('CUSTOM_FONT_SETTINGS provider in your module.ts is not set. Read documentetion on how to set it up.');
    }
  }

  public ngAfterViewInit(): void {
    if (this.customIconSettings) {
      this.handleCustomIcon(this.customName);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.customName && this.customIconSettings) {
      this.handleCustomIcon(this.customName);
    }
  }

  private handleCustomIcon(name: string) {
    if (name && this.customIconSettings[0].icons) {
      const fontFamily = this.customIconSettings[0].fontfamily;
      const icon = this.getCustomIcon(name);

      if (!fontFamily) {
        console.warn('Missing font-family.');
      } else if (!icon) {
        console.warn('Icon with name', name, 'was not found in custom font.');
      } else {
        this.setCustomIcon(icon.unicode, fontFamily);
      }
    }
  }

  private getCustomIcon(name: string): { name: string; svg: string; unicode: string } {
    return this.customIconSettings[0].icons.find((icon) => icon.name === name);
  }

  private setCustomIcon(unicode: string, fontFamily: string) {
    const hostElement = <LayoutBase>this.element.nativeElement;
    if (hostElement.getChildrenCount() > 0) {
      const label = <Label>hostElement.getChildAt(0);
      label.style.fontFamily = fontFamily;
      label.text = String.fromCharCode(Number(unicode));
    }
  }
}
