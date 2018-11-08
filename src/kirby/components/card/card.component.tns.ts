import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { screen } from 'platform';
import { EventData } from 'tns-core-modules/data/observable/observable';
import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';

const screenScale = screen.mainScreen.scale;

@Component({
  selector: 'kirby-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  someClass = '';

  constructor() { }

  ngOnInit() {
    console.log('We got init');
  }

  onViewLoaded(args: EventData) {
    console.log('We got loaded');
    const stack = <FlexboxLayout>args.object;

    setTimeout(() => {
        console.log('stack.getMeasuredHeight: ' + stack.getMeasuredHeight());
        console.log('stack.getMeasuredWidth: ' + stack.getMeasuredWidth());

        const heightDP = stack.getMeasuredHeight() / screenScale;
        const widthDP = stack.getMeasuredWidth() / screenScale;
        console.log('heightDP: ' + heightDP);
        console.log('widthDP: ' + widthDP);

        if (widthDP >= 400) {
          this.someClass = 'large';
        } else if (widthDP >= 200) {
          this.someClass = 'medium';
        } else {
          this.someClass = 'small';
        }
    }, 100);
  }

}
