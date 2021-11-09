import { Directive, ElementRef, HostBinding, HostListener, OnInit, Optional } from '@angular/core';

import { CardComponent } from '../card.component';

@Directive({
  // tslint:disable-next-line
  selector: 'kirby-card[click]',
})
export class CardIsClickableDirective implements OnInit {
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.tabindex') tabindex: string = '0';

  constructor(@Optional() private card: CardComponent, private clickableElement: ElementRef) {}

  ngOnInit(): void {
    if (this.card) {
      this.card.flat = false;
    }
  }

  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  _onKeydownHandler(event: KeyboardEvent) {
    this.clickableElement.nativeElement.click(event);
  }
}
