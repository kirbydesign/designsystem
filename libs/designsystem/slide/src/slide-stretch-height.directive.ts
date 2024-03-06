import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[slideStretchHeight]',
})
export class slideStretchHeightDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', '100%');
  }
}
