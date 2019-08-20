import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `[keyHandler]`,
})
export class KeyHandlerDirective {
  constructor(private element: ElementRef) {}

  @HostListener('keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();

      const hostElement = <HTMLElement>this.element.nativeElement;
      hostElement.click();
    }
  }
}
