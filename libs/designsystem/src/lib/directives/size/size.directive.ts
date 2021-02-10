import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // don't worry. I know what i am doing!
  selector:
    // tslint:disable-next-line: directive-selector
    'button[size], kirby-icon[size], kirby-avatar[size], kirby-item[size] input[kirby-input][size]',
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
    this.isExtraSmall = size === Sizes.extraSmall;
    this.isSmallSize = size === Sizes.small;
    this.isMediumSize = size === Sizes.medium;
    this.isLargeSize = size === Sizes.large;
  }
}

export enum Sizes {
  extraSmall = 'xs',
  small = 'sm',
  medium = 'md',
  large = 'lg',
}
