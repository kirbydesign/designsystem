import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  // don't worry. I know what i am doing!
  selector:
    // tslint:disable-next-line: directive-selector
    'button[size], kirby-icon[size], kirby-avatar[size], kirby-item[size],kirby-text-link[size]',
})
export class SizeDirective {
  @HostBinding('class.xs')
  isExtraSmall: boolean;
  @HostBinding('class.sm')
  isSmallSize: boolean;
  @HostBinding('class.md')
  isMediumSize: boolean;
  @HostBinding('class.lg')
  isLargeSize: boolean;
  @Input() set size(size: Sizes) {
    this.isExtraSmall = size === 'xs';
    this.isSmallSize = size === 'sm';
    this.isMediumSize = size === 'md';
    this.isLargeSize = size === 'lg';
  }
}

export enum Sizes {
  extraSmall = 'xs',
  small = 'sm',
  medium = 'md',
  large = 'lg',
}
