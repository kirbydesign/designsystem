import { Component, Input, NgZone, OnInit } from '@angular/core';
import * as app from 'application';
import { OrientationChangedEventData } from 'application';
import { EventData, View } from 'tns-core-modules/ui/core/view/view';
import { ScssHelper } from '../../scss/scss-helper';

declare const CGSizeMake: any;
declare const android: any;

@Component({
  selector: 'kirby-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() size: string;

  view: View;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  onViewLoaded(args: EventData) {
    this.view = <View>args.object; // We need a reference to the view so we can access it on orientation changes
    this.setupOnOrientationChangeListener();
    this.addShadow();
  }

  setupOnOrientationChangeListener() {
    app.on(app.orientationChangedEvent, (args: OrientationChangedEventData) => {
      // Run in the zone, to make sure Angular data binding is informed of this:
      this.zone.run(() => this.addShadow());
    });
  }

  addShadow() {
    setTimeout(() => {
      if (this.view.android) {
        this.view.eachChildView((child) => {
          const bgColor = child.style.backgroundColor;
          const androidView = child.android;
          const shape = new android.graphics.drawable.GradientDrawable();
          shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
          shape.setColor(android.graphics.Color.parseColor(bgColor + ''));
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
