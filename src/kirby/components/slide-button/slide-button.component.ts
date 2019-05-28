import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
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
  @Input() public text = '';
  @Input() public expand?: 'fullWidth';

  @Output() public slideDone = new EventEmitter();
  @Output() public slidingPercentageChanged = new EventEmitter<number>();
  @ViewChild('sliderButtonRef') public sliderButtonRef: ElementRef;

  public isSlideDone = false;

  private _value: number = 0;
  public get value(): number {
    return this._value;
  }
  public set value(v: number) {
    this._value = v;
    this.calculatePctInTens();
  }

  public pctInTens = 0;
  private calculatePctInTens() {
    this.pctInTens = Math.ceil(this.value / 10) * 10;
  }

  private resetSliderIntervalTimer: any;

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

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
