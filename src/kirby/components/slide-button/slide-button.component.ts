import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

@Component({
  selector: 'kirby-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
})
export class SlideButtonComponent {
  @Input() public text = '';
  @Input() public expand?: 'fullWidth';

  @Output() public slideDone = new EventEmitter();
  @Output() public slidingPercentageChanged = new EventEmitter<number>();
  @ViewChild('sliderButtonRef') public sliderButtonRef: ElementRef;

  public isSlideDone = false;

  public value = 0;
  public get pctInTens() {
    return Math.ceil(this.value / 10) * 10;
  }

  private resetSliderIntervalTimer: any;

  public onSliderMouseup() {
    console.log(this.value); // TODO: remove
    if (this.value == 100) {
      this.handleSlideDone();
    } else {
      this.resetSliderIntervalTimer = setInterval(() => {
        if (this.value != 0) {
          this.value--;
        }
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
    this.slidingPercentageChanged.emit(this.value);
  }

  public onSliderMousedown() {
    clearInterval(this.resetSliderIntervalTimer);
  }

  private handleSlideDone() {
    this.slideDone.emit();
    this.isSlideDone = true;
  }
}
