import { Component, Input, OnInit, NgZone } from '@angular/core';
import { screen } from 'tns-core-modules/platform';
import { OrientationChangedEventData } from 'tns-core-modules/application';
import * as app from 'tns-core-modules/application';
import { View, EventData } from 'tns-core-modules/ui/core/view/view';
import { registerElement } from 'nativescript-angular';
import { ContentView } from 'tns-core-modules/ui/content-view';

import { ScssHelper } from '../../scss/scss-helper';
import { ThemeColor } from '../../helpers/theme-color.type';

const screenScale = screen.mainScreen.scale;

export const KIRBY_CARD_COMPONENT_SELECTOR = 'kirby-card';

@Component({
  selector: KIRBY_CARD_COMPONENT_SELECTOR,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends ContentView {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() themeColor?: ThemeColor;

  DEFAULT_ELEVATION = 2;
  elevation: number = this.DEFAULT_ELEVATION;
  view: View;
  currentScreenWidth: number;
  cardSizeClass = '';

  @Input() set mode(value: 'flat' | 'highlighted') {
    if (value === 'flat') {
      this.elevation = 0;
    } else if (value === 'highlighted') {
      this.elevation = 4;
    } else {
      this.elevation = this.DEFAULT_ELEVATION;
    }
  }

  constructor(private zone: NgZone) {
    super();
  }

  onViewLoaded(args: EventData) {
    this.view = <View>args.object; // We need a reference to the view so we can access it on orientation changes
    // this.setupOnOrientationChangeListener();
    this.applySize();
  }

  applySize() {
    const widthDP = this.view.getMeasuredWidth() / screenScale;
    if (widthDP >= ScssHelper.BREAKPOINT_CARD_L) {
      this.cardSizeClass = 'card-large';
    } else if (widthDP >= ScssHelper.BREAKPOINT_CARD_M) {
      this.cardSizeClass = 'card-medium';
    } else {
      this.cardSizeClass = 'card-small';
    }
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
      this.zone.run(() => this.applySize());
    });
  }
}

registerElement(KIRBY_CARD_COMPONENT_SELECTOR, () => require('./card.component').CardComponent);
