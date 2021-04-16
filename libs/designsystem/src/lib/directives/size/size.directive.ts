import { Directive } from '@angular/core';

@Directive({
  selector: '[kirbyDeprecatedSizeDirectiveDontUse]',
})
export class SizeDirective {
  constructor() {
    console.warn(
      'SizeDirective is deprecated - size is now handled by individual input properties for all components'
    );
  }
}

export enum Sizes {
  extraSmall = 'xs',
  small = 'sm',
  medium = 'md',
  large = 'lg',
}
