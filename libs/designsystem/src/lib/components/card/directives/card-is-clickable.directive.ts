import { Directive, HostBinding, OnInit } from '@angular/core';

import { CardComponent } from '../card.component';

@Directive({
  // tslint:disable-next-line
  selector: 'kirby-card[click]',
})
export class CardIsClickableDirective implements OnInit {
  @HostBinding('attr.role') role: string = 'button';

  constructor(private card: CardComponent) {}

  ngOnInit(): void {
    this.card.flat = false;
  }
}
