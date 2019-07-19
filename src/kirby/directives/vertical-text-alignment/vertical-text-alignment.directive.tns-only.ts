import { ElementRef, Input, Directive, OnInit } from '@angular/core';
import { isAndroid } from 'tns-core-modules/platform';

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
      this.elementRef.nativeElement.on('loaded', () => {
        this.elementRef.nativeElement.android.setGravity(android.view.Gravity.CENTER);
      });
    }
  }
}
