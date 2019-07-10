import { Directive, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import { isIOS } from 'tns-core-modules/ui/page/page';

import { ScssHelper } from '../../../scss/scss-helper';

@Directive({ selector: '[kirbyElevation]' })
export class NativeScriptElevationDirective implements OnInit {
  @Input() kirbyElevation?: 2 | 4 | 8;
  @Input() iosMasksToBounds?: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (!this.kirbyElevation) {
      return;
    }
    this.awaitNativeElementInitAndApplyElevation();
  }

  // Due to a timing issue, the native element is not available initially:
  // https://github.com/NativeScript/nativescript-angular/issues/848
  private awaitNativeElementInitAndApplyElevation() {
    setTimeout(() => {
      if (this.el.nativeElement.ios || this.el.nativeElement.android) {
        this.applyElevation();
      } else {
        // continue recursion until the native element gets initialized
        this.awaitNativeElementInitAndApplyElevation();
      }
    }, 5);
  }

  private applyElevation() {
    if (isIOS) {
      const iosView = this.el.nativeElement.ios;

      // if true, masksToBounds prevents scrolling bugs on list rows
      iosView.layer.masksToBounds = this.iosMasksToBounds;
      iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
      // the numbers below are used to align the appearances of android elevations and iOS shadows
      // source: https://github.com/Especializa/nativescript-ng-shadow/blob/master/src/common/shadow.ts
      iosView.layer.shadowOffset = CGSizeMake(0, 0.54 * this.kirbyElevation - 0.14);
      iosView.layer.shadowOpacity = 0.006 * this.kirbyElevation + 0.25;
    } else {
      // In android we need a container wrapping the element which will have the shadow
      const androidChildView = this.el.nativeElement.firstChild;
      if (!androidChildView) {
        return;
      }
      this.renderer.setStyle(androidChildView, `android-elevation`, `${this.kirbyElevation}`);
    }
  }
}
