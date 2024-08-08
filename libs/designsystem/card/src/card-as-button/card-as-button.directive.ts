import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
} from '@angular/core';

import { CardComponent } from '../card.component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'kirby-card[click]',
})
export class CardAsButtonDirective implements OnInit {
  @Input() interactionStatesOnly = false;

  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.tabindex') tabindex: number;

  @HostBinding('class.interaction-state-active') _pressed = false;

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _onKeydownHandler(event: KeyboardEvent) {
    this._pressed = true;
    this.clickableElement.nativeElement.click(event);

    if (this.interactionStatesOnly) return;
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

  constructor(private clickableElement: ElementRef) {}

  ngOnInit(): void {
    this.tabindex = this.interactionStatesOnly ? -1 : 0;
  }
}
