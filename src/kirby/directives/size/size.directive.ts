import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  // don't worry. I know what i am doing!
  // tslint:disable-next-line:directive-selector
  selector: 'Button[size], button[size], kirby-icon[size], kirby-avatar[size]',
})
export class SizeDirective {
  @HostBinding('class.sm')
  isSmallSize: boolean;
  @HostBinding('class.md')
  isMediumSize: boolean;
  @HostBinding('class.lg')
  isLargeSize: boolean;
  @Input() set size(size: Sizes) {
    if (size === 'sm') {
      this.isSmallSize = true;
    }
    if (size === 'md') {
      this.isMediumSize = true;
    }
    if (size === 'lg') {
      this.isLargeSize = true;
    }
  }

  constructor() {}
}

export enum Sizes {
  small = 'sm',
  medium = 'md',
  large = 'lg',
}
