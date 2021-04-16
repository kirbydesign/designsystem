import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: ' ',
})
export class SizeDirective {
  constructor() {
    console.warn(
      'SizeDirective is deprecated - size is now handled by individual input properties for all components'
    );
  }
}
