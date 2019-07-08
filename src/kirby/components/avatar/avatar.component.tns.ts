import { Component, Input, NgZone } from '@angular/core';
import { registerElement } from 'nativescript-angular';
import * as app from 'tns-core-modules/application';
import { OrientationChangedEventData } from 'tns-core-modules/application';
import { EventData, View } from 'tns-core-modules/ui/core/view/view';
import { ContentView } from 'tns-core-modules/ui/content-view';

import { ScssHelper } from '../../scss/scss-helper';

declare const CGSizeMake: any;
declare const android: any;

const AVATAR_COMPONENT_SELECTOR = 'kirby-avatar';

@Component({
  selector: AVATAR_COMPONENT_SELECTOR,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-avatar',
  },
})
export class AvatarComponent extends ContentView {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() shadow?: false;
  @Input() overlay?: true;

  view: View;

  constructor(private zone: NgZone) {
    super();
  }

  onViewLoaded(args: EventData) {
    this.view = <View>args.object; // We need a reference to the view so we can access it on orientation changes
    // this.setupOnOrientationChangeListener();
    this.addShadow();
  }

  setupOnOrientationChangeListener() {
    app.on(app.orientationChangedEvent, (args: OrientationChangedEventData) => {
      // Run in the zone, to make sure Angular data binding is informed of this:
      this.zone.run(() => this.addShadow());
    });
  }

  addShadow() {
    if (this.shadow) {
      setTimeout(() => {
        if (this.view.android) {
          this.view.eachChildView((child) => {
            const bgColor = child.style.backgroundColor;
            const transparentColor = '#00ff0000';
            const androidView = child.android;
            const shape = new android.graphics.drawable.GradientDrawable();
            shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
            shape.setColor(
              android.graphics.Color.parseColor(bgColor ? bgColor + '' : transparentColor)
            );
            shape.setCornerRadius(androidView.getMeasuredWidth());
            androidView.setBackgroundDrawable(shape);
            androidView.setClipToOutline(true);
            androidView.setElevation(ScssHelper.ELEVATION_IMAGE);
            return true;
          });
        } else if (this.view.ios) {
          const iosView = this.view.ios;
          iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
          iosView.layer.shadowOffset = CGSizeMake(0, ScssHelper.SHADOW_OFFSET_Y);
          iosView.layer.shadowOpacity = ScssHelper.SHADOW_OPACITY;
          iosView.layer.shadowRadius = ScssHelper.SHADOW_RADIUS;
          return;
        }
      }, 100);
    }
  }
}

registerElement(AVATAR_COMPONENT_SELECTOR, () => require('./avatar.component').AvatarComponent);
