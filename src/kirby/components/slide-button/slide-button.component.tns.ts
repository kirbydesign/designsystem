import { Component, NgZone, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { ContentView, View, EventData } from 'tns-core-modules/ui/content-view';
import { registerElement } from 'nativescript-angular';

import { ScssHelper } from '@kirbydesign/designsystem/scss/scss-helper';
import { constants } from 'perf_hooks';
import * as applicationModule from 'tns-core-modules/application';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
declare var MTSlideToOpenView, CGRect, UIView, UILabel;

export const SLIDE_BUTTON_SELECTOR = 'kirby-slide-button';

@Component({
  selector: SLIDE_BUTTON_SELECTOR,
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
})
export class SlideButtonComponent extends ContentView {
  view: View;

  addButtonAndroid() {
    const androidButton = new android.widget.Button(applicationModule.android.context);
    androidButton.setText('Some button text');
    this.view.nativeView.nativeView.addView(androidButton);
  }

  addButtonIOS() {
    let button = UIButton.alloc().init();
    button.setTitleForState('Add', UIControlState.Normal);
    button.setTitleColorForState(UIColor.blueColor, UIControlState.Normal);

    const x = this.view.scaleX;
    const y = this.view.scaleY;

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

    console.log('Stack view' + JSON.stringify(this.view.nativeView));
    this.view.nativeView.addSubview(button);
  }

  onViewLoaded(args: EventData) {
    this.view = <View>args.object;

    if (!this.view) {
      return console.log('No stack layout');
    }

    // this.view = <View>this.nativeView; // We need a reference to the view so we can access it on orientation changes

    console.log('Called on view loaded');

    this.addButtonIOS();
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

  //   private func setupConstraint() {
  //     view.translatesAutoresizingMaskIntoConstraints = false
  //     thumnailImageView.translatesAutoresizingMaskIntoConstraints = false
  //     sliderHolderView.translatesAutoresizingMaskIntoConstraints = false
  //     textLabel.translatesAutoresizingMaskIntoConstraints = false
  //     draggedView.translatesAutoresizingMaskIntoConstraints = false
  //     // Setup for view
  //     view.leadingAnchor.constraint(equalTo: self.leadingAnchor).isActive = true
  //     view.trailingAnchor.constraint(equalTo: self.trailingAnchor).isActive = true
  //     view.topAnchor.constraint(equalTo: self.topAnchor).isActive = true
  //     view.bottomAnchor.constraint(equalTo: self.bottomAnchor).isActive = true
  //     // Setup for circle View
  //     leadingThumbnailViewConstraint = thumnailImageView.leadingAnchor.constraint(equalTo: view.leadingAnchor)
  //     leadingThumbnailViewConstraint?.isActive = true
  //     topThumbnailViewConstraint = thumnailImageView.topAnchor.constraint(equalTo: view.topAnchor, constant: thumbnailViewTopDistance)
  //     topThumbnailViewConstraint?.isActive = true
  //     thumnailImageView.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
  //     thumnailImageView.heightAnchor.constraint(equalTo: thumnailImageView.widthAnchor).isActive = true
  //     // Setup for slider holder view
  //     topSliderConstraint = sliderHolderView.topAnchor.constraint(equalTo: view.topAnchor, constant: sliderViewTopDistance)
  //     topSliderConstraint?.isActive = true
  //     sliderHolderView.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
  //     sliderHolderView.leadingAnchor.constraint(equalTo: view.leadingAnchor).isActive = true
  //     sliderHolderView.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
  //     // Setup for textLabel
  //     textLabel.topAnchor.constraint(equalTo: sliderHolderView.topAnchor).isActive = true
  //     textLabel.centerYAnchor.constraint(equalTo: sliderHolderView.centerYAnchor).isActive = true
  //     leadingTextLabelConstraint = textLabel.leadingAnchor.constraint(equalTo: sliderHolderView.leadingAnchor, constant: textLabelLeadingDistance)
  //     leadingTextLabelConstraint?.isActive = true
  //     textLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: CGFloat(-8)).isActive = true
  //     // Setup for Dragged View
  //     draggedView.leadingAnchor.constraint(equalTo: sliderHolderView.leadingAnchor).isActive = true
  //     draggedView.topAnchor.constraint(equalTo: sliderHolderView.topAnchor).isActive = true
  //     draggedView.centerYAnchor.constraint(equalTo: sliderHolderView.centerYAnchor).isActive = true
  //     trailingDraggedViewConstraint = draggedView.trailingAnchor.constraint(equalTo: thumnailImageView.trailingAnchor, constant: thumbnailViewStartingDistance)
  //     trailingDraggedViewConstraint?.isActive = true
  // }

  // private func setStyle() {
  //     thumnailImageView.backgroundColor = defaultThumbnailColor
  //     textLabel.text = defaultLabelText
  //     textLabel.font = UIFont.systemFont(ofSize: 15.0)
  //     textLabel.textColor = UIColor(red:0.1, green:0.61, blue:0.84, alpha:1)
  //     textLabel.textAlignment = .center
  //     sliderHolderView.backgroundColor = defaultSliderBackgroundColor
  //     sliderHolderView.layer.cornerRadius = sliderCornerRadious
  //     draggedView.backgroundColor = defaultSlidingColor
  //     draggedView.layer.cornerRadius = sliderCornerRadious
  // }

  sliderHolderView(): UIView {
    const view = UIView.new();
    return view;
  }

  textLabel(): UILabel {
    const label = UILabel.alloc().init();
    return label;
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
