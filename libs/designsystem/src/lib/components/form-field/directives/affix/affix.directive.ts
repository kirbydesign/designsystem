import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: '[kirby-affix]',
})
export class AffixDirective {
  @Input('kirby-affix') type: 'prefix' | 'suffix';
  constructor(public el: ElementRef) {}
}
