import { Directive, ElementRef, HostBinding, HostListener, Input, Optional } from '@angular/core';

import { CardComponent } from '../card.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'kirby-card[click]',
})
export class CardAsButtonDirective {
  @Input() disableKeydownHandler = false;

  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.tabindex') tabindex: number = 0;
  @HostBinding('class.interaction-state-active') _pressed = false;

  constructor(@Optional() private card: CardComponent, private clickableElement: ElementRef) {}

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _onKeydownHandler(event: KeyboardEvent) {
    if (this.disableKeydownHandler && event.currentTarget !== event.target) return; // Do not handle events for nested elements - let event bubbling take place as normal

    this._pressed = true;
    this.clickableElement.nativeElement.click(event);
    /*
     * Prevent default event from firing so the UA wont
     * catch this event and e.g. scroll the page on space,
     * which is the default behavior in major browsers
     */

    event.preventDefault();
  }

  @HostListener('keyup.space')
  @HostListener('keyup.enter')
  @HostListener('blur')
  _onInactiveHandler() {
    this._pressed = false;
  }
}
