import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'table[kirbyDataTable]',
})
export class DataTableDirective {
  constructor(private elementRef: ElementRef) {
    const tableStyle = `
      border-collapse: collapse;
      width: 100%;
    `;

    this.elementRef.nativeElement.setAttribute('style', tableStyle);
  }
}
