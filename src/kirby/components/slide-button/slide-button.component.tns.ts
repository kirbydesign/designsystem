import { Component, NgZone, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { ContentView, View, EventData } from 'tns-core-modules/ui/content-view';
import { registerElement } from 'nativescript-angular';

import { ScssHelper } from '@kirbydesign/designsystem/scss/scss-helper';
import { constants } from 'perf_hooks';
import * as applicationModule from 'tns-core-modules/application';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { MTRoundImageView } from './round-image-view';
import { SlideButtonIos } from './slide-button-ios';
declare var MTSlideToOpenView, CGRect, UIView, UILabel;

export const SLIDE_BUTTON_SELECTOR = 'kirby-slide-button';

@Component({
  selector: SLIDE_BUTTON_SELECTOR,
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
})
export class SlideButtonComponent extends ContentView {
  private stackView: View;

  addButtonAndroid() {
    const androidButton = new android.widget.Button(applicationModule.android.context);
    androidButton.setText('Some button text');
    this.stackView.nativeView.nativeView.addView(androidButton);
  }

  getButtonIOS() {
    let button = UIButton.alloc().init();
    button.setTitleForState('Add', UIControlState.Normal);
    button.setTitleColorForState(UIColor.blueColor, UIControlState.Normal);

    const x = this.stackView.scaleX;
    const y = this.stackView.scaleY;

    console.log(`X and y is: ${x} ${y}`);

    var rect = {
      origin: {
        x: x,
        y: y,
      },
      size: {
        width: 200,
        height: 200,
      },
    };
    button.frame = rect;

    console.log('Stack view' + JSON.stringify(this.stackView.nativeView));
    return button;
  }

  onViewLoaded(args: EventData) {
    this.stackView = <View>args.object;

    if (!this.stackView) {
      return console.log('No stack layout');
    }

    const x = this.stackView.scaleX;
    const y = this.stackView.scaleY;

    var rect = {
      origin: {
        x: x,
        y: y,
      },
      size: {
        width: 200,
        height: 200,
      },
    };

    const slideButton = new SlideButtonIos(rect);

    // slideButton.view.frame = rect;

    // slideButton.view.leadingAnchor.constraintEqualToAnchor(
    //   this.stackView.nativeView.leadingAnchor
    // ).active = true;
    // slideButton.view.trailingAnchor.constraintEqualToAnchor(
    //   this.stackView.nativeView.trailingAnchor
    // ).active = true;
    // slideButton.view.topAnchor.constraintEqualToAnchor(
    //   this.stackView.nativeView.topAnchor
    // ).active = true;
    // slideButton.view.bottomAnchor.constraintEqualToAnchor(
    //   this.stackView.nativeView.bottomAnchor
    // ).active = true;

    // slideButton.sliderViewTopDistance = 0;
    // slideButton.sliderCornerRadious = 28;
    // slideButton.thumnailImageView.backgroundColor = UIColor.redColor;

    this.stackView.nativeView.addSubview(slideButton);

    // const button = this.getButtonIOS();
    // this.stackView.nativeView.addSubview(button);

    // this.view = UIView.alloc().init();
    // this.textLabel = UILabel.alloc().init();

    // this.thumnailImageView = UIImageView.alloc().init();
    // // const img = UIImage.alloc().init();
    // // this.thumnailImageView = new MTRoundImageView({ image: img });
    // this.thumnailImageView.userInteractionEnabled = true;
    // this.thumnailImageView.contentMode = UIViewContentMode.Center;

    // this.sliderHolderView = UIView.alloc().init();
    // this.draggedView = UIView.alloc().init();

    // console.log('Called on view loaded');

    // this.stackView.nativeView.addSubview(this.view);
    // this.view.addSubview(this.thumnailImageView);
    // this.view.addSubview(this.sliderHolderView);
    // this.view.addSubview(this.draggedView);
    // this.sliderHolderView.addSubview(this.textLabel);
    // this.view.bringSubviewToFront(this.thumnailImageView);
    // this.setupConstraint();
    // setStyle()

    // this.addButtonIOS();
  }

  onLoaded(): void {
    super.onLoaded();

    // if (!this.stackLayout) {
    //   return console.log('No stack layout');
    // }

    // // this.view = <View>this.nativeView; // We need a reference to the view so we can access it on orientation changes

    // console.log('Called on view loaded2');

    // this.addButtonIOS();

    // const iosView = this.ios.view;
    // iosView.layer.shadowColor = ScssHelper.SHADOW_COLOR.ios.CGColor;
    // iosView.layer.shadowOffset = CGSizeMake(0, ScssHelper.SHADOW_OFFSET_Y);
    // iosView.layer.shadowOpacity = ScssHelper.SHADOW_OPACITY;
    // iosView.layer.shadowRadius = ScssHelper.SHADOW_RADIUS;

    // const iosView = this.ios;
    // const view = UIView.alloc().init();
    // iosView.addSubview(view);

    // const sliderHolderView = UIView.alloc().init();
    // const textLabel = this.textLabel();

    // view.addSubview(sliderHolderView);
    // sliderHolderView.addSubview(textLabel);

    // sliderHolderView.backgroundColor = 'blue';
    // textLabel.text = 'some text lala';
    // textLabel.font = UIFont.systemFont(ofSize: 15.0)
    // textLabel.textColor = UIColor(red:0.1, green:0.61, blue:0.84, alpha:1)
    // textLabel.textAlignment = .center
    // sliderHolderView.backgroundColor = defaultSliderBackgroundColor
    // sliderHolderView.layer.cornerRadius = sliderCornerRadious

    // this.view._addView(this.view);
    // this.view._addView(thumnailImageView)
    // view.addSubview(sliderHolderView)
    // view.addSubview(draggedView)
    // sliderHolderView.addSubview(textLabel)
    // view.bringSubviewToFront(self.thumnailImageView)
    // setupConstraint()
    // setStyle()
    // // Add pan gesture
    // panGestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(self.handlePanGesture(_:)))
    // panGestureRecognizer.minimumNumberOfTouches = 1
    // thumnailImageView.addGestureRecognizer(panGestureRecognizer)
  }

  constructor(private zone: NgZone) {
    super();
  }

  public onSliderValueChange(val: string) {
    // this.value = +val;
    // this.slidingPercentageChanged.emit(this.value);
  }

  onTouch(args: TouchGestureEventData) {
    console.log('On touch clicked');
    // if (args.action === 'up') {
    //   this.onSliderMouseup();
    // }
    // if (args.action === 'down') {
    //   this.onSliderMousedown();
    // }
  }
}

registerElement(
  SLIDE_BUTTON_SELECTOR,
  () => require('./slide-button.component').SlideButtonComponent
);
