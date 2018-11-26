import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[kirbyGridCardHost]',
})
export class GridCardDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
