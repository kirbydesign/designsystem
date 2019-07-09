import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { isIOS } from 'tns-core-modules/ui/page/page';

import { ScssHelper } from '../../../scss/scss-helper';

@Directive({ selector: '[kirbyElevation]' })
export class NativeScriptElevationDirective implements OnInit {
  @Input() kirbyElevation?: 'z2' | 'z4' | 'z8';
  @Input() iosMasksToBounds?: boolean | string;

  elevation: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.kirbyElevation) {
      return;
    }

    // Due to a timing issue, the native element is not available initially:
    // https://github.com/NativeScript/nativescript-angular/issues/848
    // As a workaround we add 50 ms delay.
    setTimeout(this.applyElevation.bind(this), 50);
    // this.el.nativeElement.style.backgroundColor = 'red';
  }

  private applyElevation() {
    this.elevation = parseInt(this.kirbyElevation.match(/(\d+)/)[0], 10);

    if (isIOS) {
      const iosView = this.el.nativeElement.ios;

      // if true, masksToBounds prevents scrolling bugs on list rows
      iosView.layer.masksToBounds = this.parseBoolean(this.iosMasksToBounds);
      iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
      // the numbers below are used to align the appearances of android elevations and iOS shadows
      // source: https://github.com/Especializa/nativescript-ng-shadow/blob/master/src/common/shadow.ts
      iosView.layer.shadowOffset = CGSizeMake(0, 0.54 * this.elevation - 0.14);
      iosView.layer.shadowOpacity = 0.006 * this.elevation + 0.25;
    } else {
      // In android we need a container wrapping the element which will have the shadow
      const androidChildView = this.el.nativeElement.firstChild;
      if (!androidChildView) {
        return;
      }
      this.renderer.setStyle(androidChildView, `android-elevation`, `${this.elevation}`);
      // this.renderer.setStyle(this.el.nativeElement, `margin`, `50`);
    }
  }

  private parseBoolean(value: string | boolean) {
    return value === 'true' || value === true;
  }
}
