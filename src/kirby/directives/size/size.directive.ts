import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  // don't worry. I know what i am doing!
  // tslint:disable-next-line:directive-selector
  selector: 'Button[size], button[size]',
})
export class SizeDirective {
  @HostBinding('class.small')
  isSmallSize: boolean;
  @HostBinding('class.medium')
  isMediumSize: boolean;
  @HostBinding('class.large')
  isLargeSize: boolean;
  @Input() set size(size: 'sm' | 'md' | 'lg') {
    if (size === 'small') {
      this.isSmallSize = true;
    }
    if (size === 'medium') {
      this.isMediumSize = true;
    }
    if (size === 'large') {
      this.isLargeSize = true;
    }
  }

  constructor() {}
}
