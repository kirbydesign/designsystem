import { Directive, ElementRef, HostBinding, HostListener, OnInit, Optional } from '@angular/core';

import { CardComponent } from '../../components/card/card.component';

@Directive({
  // tslint:disable-next-line
  selector: 'kirby-card[click], kirby-chip',
})
export class ElementAsButtonDirective implements OnInit {
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.tabindex') tabindex: number = 0;

  @HostBinding('class.interaction-state-active') pressed = false;
  constructor(@Optional() private card: CardComponent, private clickableElement: ElementRef) {}

  ngOnInit(): void {
    if (this.card) {
      this.card.flat = false;
    }
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _onKeydownHandler(event: KeyboardEvent) {
    this.pressed = true;
    this.clickableElement.nativeElement.click(event);
    /*
     * Prevent default event from firing so the UA wont
     * catch this event and e.g. scroll the page on space,
     * which is the default behavior in major browsers
     */

    event.preventDefault();
  }

  @HostListener('keyup.space', ['$event'])
  @HostListener('keyup.enter', ['$event'])
  @HostListener('blur', ['$event'])
  _onNotActiveHandler() {
    this.pressed = false;
  }
}
