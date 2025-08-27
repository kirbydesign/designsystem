import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { forwardAttributes } from '@kirbydesign/designsystem/shared';

@Component({
  imports: [CommonModule],
  selector: 'kirby-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideButtonComponent implements OnDestroy, AfterViewInit {
  @Input() text = '';
  @Input() expand: 'block';

  @Output() slideDone = new EventEmitter();
  @Output() slidingPercentageChanged = new EventEmitter<number>();

  @ViewChild('hiddenButton', { read: ElementRef })
  hiddenButton!: ElementRef<HTMLButtonElement>;

  private _attributesToForward = ['aria-label', 'aria-labelledby'];

  readonly slideDoneFadeTime = 500;
  readonly slideResetTime = 100;

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

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.hiddenButton.nativeElement
    );
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
      // Return slider thumb to beginning of slider button in increments of 2
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

  handleSlideDone() {
    this.slideDone.emit();
    this.isSlideDone = true;
  }
}
