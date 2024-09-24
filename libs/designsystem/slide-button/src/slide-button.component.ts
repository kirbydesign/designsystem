import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'kirby-slide-button',
  templateUrl: './slide-button.component.html',
  styleUrls: ['./slide-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideButtonComponent implements OnDestroy {
  @Input() text = '';
  @Input() expand: 'block';

  @Output() slideDone = new EventEmitter();
  @Output() slidingPercentageChanged = new EventEmitter<number>();

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

  constructor(private changeDetectionRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this.resetSliderIntervalTimer) {
      clearInterval(this.resetSliderIntervalTimer);
    }
  }

  @HostListener('keyup.arrowup', ['$event'])
  @HostListener('keyup.arrowdown', ['$event'])
  @HostListener('keyup.arrowleft', ['$event'])
  @HostListener('keyup.arrowright', ['$event'])
  @HostListener('keyup.pageup', ['$event'])
  @HostListener('keyup.pagedown', ['$event'])
  @HostListener('keyup.home', ['$event'])
  @HostListener('keyup.end', ['$event'])
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

  @HostListener('keydown.arrowup', ['$event'])
  @HostListener('keydown.arrowdown', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  @HostListener('keydown.pageup', ['$event'])
  @HostListener('keydown.pagedown', ['$event'])
  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  onSliderMousedown() {
    clearInterval(this.resetSliderIntervalTimer);
  }

  private handleSlideDone() {
    this.slideDone.emit();
    this.isSlideDone = true;
  }
}
