import { Component, Input, OnInit } from '@angular/core';
import { screen } from 'platform';
import { View, EventData } from 'tns-core-modules/ui/core/view/view';
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
    const view = <View>args.object;
    // A timeout is crap, but try without, fail you will
    // If you change this, you must test all the details on both Android and iOS including rotation, may God have mercy on your soul
    setTimeout(() => {
      const widthDP = view.getMeasuredWidth() / screenScale;
      if (widthDP >= ScssHelper.BREAKPOINT_CARD_L) {
        this.cardSizeClass = 'card-large';
      } else if (widthDP >= ScssHelper.BREAKPOINT_CARD_M) {
        this.cardSizeClass = 'card-medium';
      } else {
        this.cardSizeClass = 'card-small';
      }
    }, 100);
    this.addShadow(view);
  }

  addShadow(view: View) {
    if (view.android) {
      view.eachChildView((child) => {
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
    } else if (view.ios) {
      const iosView = view.ios;
      iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
      iosView.layer.shadowOffset = CGSizeMake(0, ScssHelper.SHADOW_OFFSET_Y);
      iosView.layer.shadowOpacity = ScssHelper.SHADOW_OPACITY;
      iosView.layer.shadowRadius = ScssHelper.SHADOW_RADIUS;
      return;
    }
  }

}
