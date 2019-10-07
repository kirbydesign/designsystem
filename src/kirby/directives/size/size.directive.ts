import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  // don't worry. I know what i am doing!
  // tslint:disable-next-line:directive-selector
  selector: 'button[size], kirby-icon[size], kirby-avatar[size]',
})
export class SizeDirective {
  @HostBinding('class.sm')
  isSmallSize: boolean;
  @HostBinding('class.md')
  isMediumSize: boolean;
  @HostBinding('class.lg')
  isLargeSize: boolean;
  @Input() set size(size: Sizes) {
    this.isSmallSize = size === 'sm';
    this.isMediumSize = size === 'md';
    this.isLargeSize = size === 'lg';
  }
}

export enum Sizes {
  small = 'sm',
  medium = 'md',
  large = 'lg',
}
