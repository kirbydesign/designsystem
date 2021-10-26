import { Directive, OnInit } from '@angular/core';

import { CardComponent } from '../card.component';

@Directive({
  // tslint:disable-next-line
  selector: 'kirby-card[click]',
})
export class CardIsClickableDirective implements OnInit {
  constructor(private card: CardComponent) {}

  ngOnInit(): void {
    this.card.cardIsClickable = true;
  }
}
