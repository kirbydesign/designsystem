import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { screen } from 'platform';
import { EventData } from 'tns-core-modules/data/observable/observable';
import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';

const screenScale = screen.mainScreen.scale;

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  cardSizeClass = '';

  constructor() { }

  ngOnInit() {
  }

  onViewLoaded(args: EventData) {
    const stack = <FlexboxLayout>args.object;

    // A timeout is crap, but try without, fail you will
    setTimeout(() => {
      // TODO: Get breakpoints from somewhere
      const heightDP = stack.getMeasuredHeight() / screenScale;
      const widthDP = stack.getMeasuredWidth() / screenScale;
      if (widthDP >= 400) {
        this.cardSizeClass = 'card-large';
      } else if (widthDP >= 200) {
        this.cardSizeClass = 'card-medium';
      } else {
        this.cardSizeClass = 'card-small';
      }
    }, 100);
  }

}
