import { Component, NgZone, Input } from '@angular/core';
import { OrientationChangedEventData } from 'tns-core-modules/application';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { EventData, View } from 'tns-core-modules/ui/page/page';
import * as app from 'tns-core-modules/application';
import { Color } from 'tns-core-modules/color';
import { registerElement } from 'nativescript-angular';

const FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR = 'kirby-floating-action-button';

declare const CGSizeMake: any;
declare const android: any;
declare var require: any;
const style: any = require('sass-extract-loader!./floating-action-button.component.scss');

@Component({
  selector: FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR,
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
})
export class FloatingActionButtonComponent extends ContentView {
  // TODO: showShadow should become an "elevation" enum in the future;
  @Input() showShadow?: boolean = true;
  @Input() disabled?: boolean = false;

  view: View;

  constructor(private zone: NgZone) {
    super();
  }

  onViewLoaded(args: EventData) {
    this.view = <View>args.object;
    this.setupOnOrientationChangeListener();
    this.addShadow();
  }

  setupOnOrientationChangeListener() {
    app.on(app.orientationChangedEvent, (args: OrientationChangedEventData) => {
      // Run in the zone, to make sure Angular data binding is informed of this:
      this.zone.run(() => this.addShadow());
    });
  }

  // TODO: extract a shared function; logic of adding shadow is the same as in many other components;
  addShadow(): void {
    if (!this.showShadow || this.disabled) {
      return;
    }

    if (this.view.android) {
      let nativeView = this.view.android;
      var shape = new android.graphics.drawable.GradientDrawable();
      shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
      shape.setColor(android.graphics.Color.parseColor(this.getThemeColor('kirby-primary-shade')));
      nativeView.setBackgroundDrawable(shape);
      nativeView.setElevation(15);
    } else if (this.view.ios) {
      let nativeView = this.view.ios;
      nativeView.layer.shadowColor = new Color(
        this.getThemeColor('kirby-primary-shade')
      ).ios.CGColor;
      nativeView.layer.shadowOffset = CGSizeMake(0, 2.0);
      nativeView.layer.shadowOpacity = 0.3;
      nativeView.layer.shadowRadius = 5.0;
    }
  }

  getThemeColor(name: string) {
    return style.global['$kirby-colors'].value[name].value.hex;
  }
}

registerElement(
  FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR,
  () => require('./floating-action-button.component').FloatingActionButtonComponent
);
