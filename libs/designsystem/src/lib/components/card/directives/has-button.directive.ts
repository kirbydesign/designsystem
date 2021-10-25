import { Directive, OnInit } from '@angular/core';
import { CardComponent } from 'libs/designsystem/src';

@Directive({
  selector: 'kirby-card[click]',
})
export class HasButtonDirective implements OnInit {
  constructor(private card: CardComponent) {}

  ngOnInit(): void {
    this.card.hasButton = true;
  }
}
