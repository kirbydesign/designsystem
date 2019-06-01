import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

import { SlideButtonCommon } from './slide-button.common';

export const SLIDE_BUTTON_SELECTOR = 'kirby-slide-button';
@Component({
  selector: SLIDE_BUTTON_SELECTOR,
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideButtonComponent extends SlideButtonCommon implements OnDestroy {
  @ViewChild('sliderButtonRef') public sliderButtonRef: ElementRef;

  public isSlideDone = false;

  private _value: number = 0;
  public get value(): number {
    return this._value;
  }
  public set value(v: number) {
    this._value = v;
    this.calculatePctInTens();
    this.slidingPercentageChanged.emit(v);
  }

  public pctInTens = 0;
  private calculatePctInTens() {
    this.pctInTens = Math.ceil(this.value / 10) * 10;
  }

  private resetSliderIntervalTimer: any;

  constructor(private changeDetectionRef: ChangeDetectorRef) {
    super();
  }

  ngOnDestroy(): void {
    if (this.resetSliderIntervalTimer) {
      clearInterval(this.resetSliderIntervalTimer);
    }
  }

  public onSliderMouseup() {
    if (this.value == 100) {
      this.handleSlideDone();
    } else {
      this.resetSliderIntervalTimer = setInterval(() => {
        if (this.value !== 0) {
          this.value--;
        }

        this.changeDetectionRef.markForCheck();
      }, 1);
    }
  }

  onTouch(args: TouchGestureEventData) {
    if (args.action === 'up') {
      this.onSliderMouseup();
    }
    if (args.action === 'down') {
      this.onSliderMousedown();
    }
  }

  public onSliderValueChange(val: string) {
    this.value = +val;
  }

  public onSliderMousedown() {
    clearInterval(this.resetSliderIntervalTimer);
  }

  private handleSlideDone() {
    this.slideDone.emit();
    this.isSlideDone = true;
  }
}
