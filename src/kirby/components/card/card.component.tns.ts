import { Component, OnInit, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { Color } from 'tns-core-modules/color';
import { screen } from 'platform';
import { EventData } from 'tns-core-modules/data/observable/observable';
import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';

import { ScssHelper } from '../../scss/scss-helper';

const screenScale = screen.mainScreen.scale;
declare const CGSizeMake: any;
declare const android: any;

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
      const widthDP = stack.getMeasuredWidth() / screenScale;
      if (widthDP >= ScssHelper.BREAKPOINT_CARD_L) {
        this.cardSizeClass = 'card-large';
      } else if (widthDP >= ScssHelper.BREAKPOINT_CARD_M) {
        this.cardSizeClass = 'card-medium';
      } else {
        this.cardSizeClass = 'card-small';
      }
    }, 100);
    this.addShadow(args);
  }

  addShadow(args: EventData) {
    const tnsView = <any>args.object;
    if (tnsView.android) {
      tnsView.eachChildView((child) => {
        if (child instanceof FlexboxLayout) {
          const bgColor = child.style.backgroundColor;
          const androidView = child.android;
          const shape = new android.graphics.drawable.GradientDrawable();
          shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
          shape.setColor(android.graphics.Color.parseColor(bgColor + ''));
          shape.setCornerRadius(ScssHelper.BORDER_RADIUS);
          androidView.setBackgroundDrawable(shape);
          androidView.setElevation(ScssHelper.ELEVATION_CARD_RESTING);
          return true;
        }
      });
    } else if (tnsView.ios) {
      const iosView = tnsView.ios;
      iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
      iosView.layer.shadowOffset = CGSizeMake(0, ScssHelper.SHADOW_OFFSET_Y);
      iosView.layer.shadowOpacity = ScssHelper.SHADOW_OPACITY;
      iosView.layer.shadowRadius = ScssHelper.SHADOW_RADIUS;
      return;
    }
  }

}
