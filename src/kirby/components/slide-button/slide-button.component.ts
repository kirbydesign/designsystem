import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { SlideButtonCommon } from './slide-button.common';

@Component({
  selector: 'kirby-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideButtonComponent extends SlideButtonCommon implements OnDestroy {
  isSlideDone = false;
  pctInTens = 0;

  get value(): number {
    return this._value;
  }
  set value(v: number) {
    this._value = v;
    this.calculatePctInTens();
  }

  private _value: number = 0;
  private resetSliderIntervalTimer: any;
  private calculatePctInTens() {
    this.pctInTens = Math.ceil(this.value / 10) * 10;
  }

  constructor(private changeDetectionRef: ChangeDetectorRef) {
    super();
  }

  ngOnDestroy(): void {
    if (this.resetSliderIntervalTimer) {
      clearInterval(this.resetSliderIntervalTimer);
    }
  }

  onSliderMouseup() {
    if (this.value == 100) {
      this.handleSlideDone();
    } else {
      this.resetSliderIntervalTimer = setInterval(() => {
        if (this.value > 0) {
          this.value -= 2;
        } else {
          clearInterval(this.resetSliderIntervalTimer);
        }

        this.changeDetectionRef.markForCheck();
      }, 1);
    }
  }

  onSliderValueChange(val: string) {
    this.value = +val;
    this.slidingPercentageChanged.emit(this.value);
  }

  onSliderMousedown() {
    clearInterval(this.resetSliderIntervalTimer);
  }

  private handleSlideDone() {
    this.slideDone.emit();
    this.isSlideDone = true;
  }
}
