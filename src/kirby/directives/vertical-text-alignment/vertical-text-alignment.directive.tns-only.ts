import { ElementRef, Input, Directive, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';

import { ViewHelper } from '../../helpers/view-helper.tns-only';

declare const android: any;

@Directive({
  // don't worry. I know what i am doing!
  // tslint:disable-next-line:directive-selector
  selector: 'Label[verticalTextAlignment]',
})
export class VerticalTextAlignmentDirective implements OnInit {
  @Input() verticalTextAlignment: 'center';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (isAndroid) {
      ViewHelper.invokeOnViewLoaded(
        this.elementRef.nativeElement,
        this.setGravityOnAndroid.bind(this)
      );
    }
  }

  private setGravityOnAndroid() {
    this.elementRef.nativeElement.android.setGravity(android.view.Gravity.CENTER);
  }
}
