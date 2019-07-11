import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { TouchGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

@Component({
  selector: 'kirby-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideButtonComponent implements OnDestroy {
  @Input() text = '';
  @Input() expand?: 'block';

  @Output() slideDone = new EventEmitter();
  @Output() slidePercentageChanged = new EventEmitter<number>();

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

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

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

  onSliderValueChange(val: string) {
    this.value = +val;
    this.slidePercentageChanged.emit(this.value);
  }

  onSliderMousedown() {
    clearInterval(this.resetSliderIntervalTimer);
  }

  private handleSlideDone() {
    this.slideDone.emit();
    this.isSlideDone = true;
  }
}
