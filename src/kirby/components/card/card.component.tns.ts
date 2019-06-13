import { Component, Input, OnInit, NgZone } from '@angular/core';
import { screen } from 'tns-core-modules/platform';
import { OrientationChangedEventData } from 'tns-core-modules/application';
import * as app from 'tns-core-modules/application';
import { View, EventData } from 'tns-core-modules/ui/core/view/view';
import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';
import { registerElement } from 'nativescript-angular';
import { ContentView } from 'tns-core-modules/ui/content-view';

import { ScssHelper } from '../../scss/scss-helper';
import { ThemeColor } from '../../helpers/theme-color.type';

const screenScale = screen.mainScreen.scale;
declare const CGSizeMake: any;
declare const android: any;

export const KIRBY_CARD_COMPONENT_SELECTOR = 'kirby-card';

@Component({
  selector: KIRBY_CARD_COMPONENT_SELECTOR,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends ContentView implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() themeColor?: ThemeColor;

  view: View;

  currentScreenWidth: number;

  cardSizeClass = '';

  constructor(private zone: NgZone) {
    super();
  }

  ngOnInit() {}

  onViewLoaded(args: EventData) {
    this.view = <View>args.object; // We need a reference to the view so we can access it on orientation changes
    // this.setupOnOrientationChangeListener();
    this.applySizeAndShadow();
  }

  applySizeAndShadow() {
    const NEIGAARD_CONSTANT = 102;
    // There will always be those that do not believe in even the most well regarded universal constants.
    // The Neigaard constant is one of the very most highly regarded constants there is, very much like
    // Albert Einsteins Cosmological constant, and should not be questioned in any way. If you, however,
    // are onf of those radical rebel types, like the ones who prefer to belive in the multiverse theory
    // rather than accepting actual science, well the you should look at the multiverse and string theory
    // comments at the bottom of this file.
    setTimeout(() => {
      const widthDP = this.view.getMeasuredWidth() / screenScale;
      if (widthDP >= ScssHelper.BREAKPOINT_CARD_L) {
        this.cardSizeClass = 'card-large';
      } else if (widthDP >= ScssHelper.BREAKPOINT_CARD_M) {
        this.cardSizeClass = 'card-medium';
      } else {
        this.cardSizeClass = 'card-small';
      }
      this.addShadow(this.view);
    }, NEIGAARD_CONSTANT);
  }

  setupOnOrientationChangeListener() {
    this.currentScreenWidth = screen.mainScreen.widthDIPs;
    app.on(app.orientationChangedEvent, (args: OrientationChangedEventData) => {
      if (this.currentScreenWidth === screen.mainScreen.widthDIPs) {
        this.currentScreenWidth = screen.mainScreen.heightDIPs;
      } else {
        this.currentScreenWidth = screen.mainScreen.widthDIPs;
      }
      // Run in the zone, to make sure Angular data binding is informed of this:
      this.zone.run(() => this.applySizeAndShadow());
    });
  }

  addShadow(view: View) {
    if (view.android) {
      const dpi = app.android.context.getResources().getDisplayMetrics().density;
      view.eachChildView((child) => {
        if (child instanceof FlexboxLayout) {
          const bgColor = child.style.backgroundColor;
          const androidView = child.android;
          const shape = new android.graphics.drawable.GradientDrawable();
          shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
          shape.setColor(android.graphics.Color.parseColor(bgColor + ''));
          shape.setCornerRadius(ScssHelper.BORDER_RADIUS * dpi);
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

registerElement(KIRBY_CARD_COMPONENT_SELECTOR, () => require('./card.component').CardComponent);

/**
 * First try to simply remove the timeout, it seems to work with the grid now,
 * but test it with a ListView also because that is known to cause problems.
 *
 * Another option is to try and fix it with native Android code, as it is a
 * Android problem only. There are two ways.
 *
 * First I would simply try and post
 * the update on the Android view (not postDelayed, that would just be the same):
 * https://developer.android.com/reference/android/view/View.html#post(java.lang.Runnable)
 *
 * If that does not work, I would try and use a ViewTreeObserver.OnGlobalLayoutListener:
 * https://developer.android.com/reference/android/view/ViewTreeObserver.OnGlobalLayoutListener
 */
