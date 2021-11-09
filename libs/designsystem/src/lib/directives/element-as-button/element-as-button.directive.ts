import { Directive, ElementRef, HostBinding, HostListener, OnInit, Optional } from '@angular/core';

import { CardComponent } from '../../components/card/card.component';

@Directive({
  // tslint:disable-next-line
  selector: 'kirby-card[click],kirby-avatar[click]',
})
export class ElementAsButtonDirective implements OnInit {
  @HostBinding('attr.role') role: string = 'button';
  @HostBinding('attr.tabindex') tabindex: number = 0;

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
