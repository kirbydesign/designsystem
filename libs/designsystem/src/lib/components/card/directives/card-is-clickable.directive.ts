import { Directive, HostBinding, OnInit, Optional } from '@angular/core';

import { CardComponent } from '../card.component';

@Directive({
  // tslint:disable-next-line
  selector: 'kirby-card[click]',
})
export class CardIsClickableDirective implements OnInit {
  @HostBinding('attr.role') role: string = 'button';

  constructor(@Optional() private card: CardComponent) {}

  ngOnInit(): void {
    if (this.card) {
      this.card.flat = false;
    }
  }
}
