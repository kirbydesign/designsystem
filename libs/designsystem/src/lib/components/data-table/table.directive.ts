import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'table[kirbyTable]',
})
export class TableDirective {
  constructor(private elementRef: ElementRef) {
    const tableStyle = `
      border-collapse: collapse;
      width: 100%;
      background-color: lightgray;
    `;

    this.elementRef.nativeElement.setAttribute('style', tableStyle);
  }
}
