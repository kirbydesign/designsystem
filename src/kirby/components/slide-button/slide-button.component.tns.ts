import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { PanGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { Button } from 'tns-core-modules/ui/button';

import { SlideButtonCommon } from './slide-button.common';
export const SLIDE_BUTTON_SELECTOR = 'kirby-slide-button';

@Component({
  selector: SLIDE_BUTTON_SELECTOR,
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideButtonComponent extends SlideButtonCommon implements OnInit {
  @ViewChild('slideTextRef') slideTextRef: ElementRef;
  @ViewChild('slideThumbnailRef') slideThumbnailRef: ElementRef;
  slideThumbnailElm: Button;
  prevDeltaX: number;
  prevDeltaY: number;
  isDraggedToEnd: boolean;
  @ViewChild('container') container: ElementRef;
  itemContainer: GridLayout;

  private _slidePct = 0;
  public get slidePct(): number {
    return this._slidePct;
  }
  public set slidePct(v: number) {
    this._slidePct = v;
    this.slideTextRef.nativeElement.opacity = 1 - v / 100;
    this.slidingPercentageChanged.emit(v);
  }

  public ngOnInit() {
    this.itemContainer = <GridLayout>this.container.nativeElement;
    this.slideThumbnailElm = <Button>this.slideThumbnailRef.nativeElement;
  }

  onPan(args: PanGestureEventData) {
    if (args.state === 1) {
      this.onPanDown();
    } else if (args.state === 2) {
      this.onDrag(args);
    } else if (args.state === 3) {
      this.onPanUp();
    }
  }

  constructor() {
    super();
  }

  private onPanUp() {
    if (this.isDraggedToEnd) {
      this.slideDone.emit();
      this.itemContainer.animate({
        opacity: 0,
        duration: this.slideDoneFadeTime,
      });
    } else {
      this.slideThumbnailElm.animate({
        translate: { x: 0, y: 0 },
        duration: this.slideResetTime,
      });
      this.slidePct = 0;
    }
  }

  private onDrag(args: PanGestureEventData) {
    this.slideThumbnailElm.translateX += args.deltaX - this.prevDeltaX;
    this.prevDeltaX = args.deltaX;
    this.prevDeltaY = args.deltaY;
    const convDpToPixelsFactor =
      (this.slideThumbnailElm.width as number) / this.slideThumbnailElm.getMeasuredWidth();
    const edgeX =
      (this.itemContainer.getMeasuredWidth() - this.slideThumbnailElm.getMeasuredWidth()) *
      convDpToPixelsFactor;

    const edgeXMarginAdjusted = edgeX - +this.slideThumbnailElm.margin * 2; // adjusted for thumbnail margin

    const edgeXPct = (this.slideThumbnailElm.translateX / edgeXMarginAdjusted) * 100;
    this.slidePct = edgeXPct > 100 ? 100 : edgeXPct;
    if (this.slideThumbnailElm.translateX < 0) {
      this.resetSlideButton();
    } else if (this.slideThumbnailElm.translateX >= edgeXMarginAdjusted) {
      this.slideThumbnailElm.translateX = edgeXMarginAdjusted;
      this.isDraggedToEnd = true;
    } else {
      this.isDraggedToEnd = false;
    }
  }

  private resetSlideButton() {
    this.slideThumbnailElm.translateX = 0;
  }

  private onPanDown() {
    this.prevDeltaX = 0;
    this.prevDeltaY = 0;
    this.slidePct = 0;
  }
}
