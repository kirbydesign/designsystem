import { Component, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { OrientationChangedEventData } from 'tns-core-modules/application';
import { ContentView } from 'tns-core-modules/ui/content-view';
import { EventData, View } from 'tns-core-modules/ui/page/page';
import * as app from 'tns-core-modules/application';
import { Color } from 'tns-core-modules/color';
import { registerElement } from 'nativescript-angular';

import { ScssHelper } from '~/kirby/scss/scss-helper';

const FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR = 'kirby-floating-action-button';

declare const CGSizeMake: any;
declare const android: any;


@Component({
    selector: FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR,
    templateUrl: './floating-action-button.component.html',
    styleUrls: ['./floating-action-button.component.scss'],
})

// TODO: add same properties as ionic floating action button, as described in the docs
// TODO: add unit tests for everything (example/component/showcase)
// TODO: add documentation
// TODO: create pull-request
export class FloatingActionButtonComponent extends ContentView {
    @Input() iconSrc?: string = '~/assets/icons/add/add.png';
    @Input() hasShadow?: boolean = true;
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

    addShadow(): void {
        if (!this.hasShadow) {
            return;
        }

        if (this.view.android) {
            let nativeView = this.view.android;
            var shape = new android.graphics.drawable.GradientDrawable();
            shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
            shape.setColor(android.graphics.Color.parseColor('#30bcff'));
            nativeView.setBackgroundDrawable(shape);
            nativeView.setElevation(ScssHelper.ELEVATION_IMAGE);
        } else if (this.view.ios) {
            let nativeView = this.view.ios;
            nativeView.layer.shadowColor = new Color('#888888').ios.CGColor;
            nativeView.layer.shadowOffset = CGSizeMake(0, 2.0);
            nativeView.layer.shadowOpacity = 0.5;
            nativeView.layer.shadowRadius = 5.0;
        }
    }
}

registerElement(
    FLOATING_ACTION_BUTTON_COMPONENT_SELECTOR,
    () => require('./floating-action-button.component').FloatingActionButtonComponent
);
