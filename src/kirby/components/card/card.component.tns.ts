import { Component, Input, OnInit, NgZone } from '@angular/core';
import { View } from 'tns-core-modules/ui/core/view/view';
import { registerElement } from 'nativescript-angular';
import { ContentView } from 'tns-core-modules/ui/content-view';

import { ThemeColor } from '../../helpers/theme-color.type';

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
  @Input() elevation?: 'highlighted' | 'disabled';

  view: View;

  currentScreenWidth: number;

  cardSizeClass = '';

  constructor(private zone: NgZone) {
    super();
  }

  ngOnInit() {}

  getElevation() {
    if (this.elevation === 'disabled') {
      return null;
    } else if (this.elevation === 'highlighted') {
      return 'z4';
    } else {
      return 'z2';
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
