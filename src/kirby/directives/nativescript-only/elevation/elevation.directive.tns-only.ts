import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { isAndroid, isIOS } from 'tns-core-modules/platform';

import { ScssHelper } from '../../../scss/scss-helper';

declare const CGSizeMake: any;

@Directive({ selector: '[kirbyElevation]' })
export class NativeScriptElevationDirective implements OnInit {
  @Input() kirbyElevation?: 2 | 4 | 8;
  @Input() iosMasksToBounds?: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.kirbyElevation) {
      return;
    }
    // Due to a timing issue, the native element is not available initially on Android:
    // https://github.com/NativeScript/nativescript-angular/issues/848
    if (this.elementRef.nativeElement.ios || this.elementRef.nativeElement.android) {
      // if we have already loaded the native element, apply the elevation immediately
      this.applyElevation();
    } else {
      this.elementRef.nativeElement.on('loaded', () => {
        this.applyElevation();
      });
    }
  }

  private applyElevation() {
    if (isAndroid) {
      // In android we need a container wrapping the element which will have the shadow
      const androidChildView = this.elementRef.nativeElement.firstChild;
      if (!androidChildView) {
        return;
      }
      this.renderer.setStyle(androidChildView, `android-elevation`, `${this.kirbyElevation}`);
    } else if (isIOS) {
      const iosView = this.elementRef.nativeElement.ios;

      // if true, masksToBounds prevents scrolling bugs on list rows
      iosView.layer.masksToBounds = this.iosMasksToBounds;
      iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
      // the numbers below are used to align the appearances of android elevations and iOS shadows
      // source: https://github.com/Especializa/nativescript-ng-shadow/blob/master/src/common/shadow.ts
      iosView.layer.shadowOffset = CGSizeMake(0, 0.54 * this.kirbyElevation - 0.14);
      iosView.layer.shadowOpacity = 0.006 * this.kirbyElevation + 0.25;
    }
  }
}
