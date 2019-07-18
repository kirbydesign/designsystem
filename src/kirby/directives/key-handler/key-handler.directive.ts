import { Directive, HostListener, ElementRef } from '@angular/core';

export enum KEY_CODE {
  ENTER = 13,
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `[keyHandler]`,
})
export class KeyHandlerDirective {
  constructor(private element: ElementRef) {}

  @HostListener('keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ENTER) {
      const hostElement = <HTMLElement>this.element.nativeElement;
      hostElement.click();
    }
  }
}
