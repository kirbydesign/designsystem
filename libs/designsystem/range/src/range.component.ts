import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'kirby-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RangeComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeComponent implements OnChanges, ControlValueAccessor {
  @Input() minLabel: string;
  @Input() maxLabel: string;
  @Input() debounce: number;
  @Input() max: number;
  @Input() min: number;
  @Input() pin: boolean;
  @Input() step = 1;
  @Input() ticks: boolean;
  @Input() disabled = false;
  @Input() pinFormatter: (value: number) => string | number;
  @Input()
  set value(value: number) {
    if (value !== this.currentValue) {
      this.currentValue = value;
      this.propagateChange(this.currentValue);
    }
  }

  get value(): number {
    return this.currentValue;
  }

  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  private currentValue: number;

  ngOnChanges(_: SimpleChanges) {
    if (!this.ticks) return;

    /*
     * Max 10 ticks are allowed
     */
    const amountOfTicks = (this.max - this.min) / this.step;
    if (amountOfTicks > 9) {
      this.step = (this.max - this.min) / 9;
    }

    /*
     * Set value to the nearest tick
     */
    this.value = this.getTicks().reduce((a, b) => {
      return Math.abs(b - this.value) < Math.abs(a - this.value) ? b : a;
    });
  }

  private getTicks() {
    const ticks = [];
    for (let value = Number(this.min); value <= Number(this.max); value += Number(this.step)) {
      ticks.push(value);
    }
    return ticks;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public _onRangeValueChange($event: any): void {
    this.writeValue($event.detail.value);
    this.change.emit(this.currentValue);
  }

  public onTouched = () => {};

  public propagateChange = (_: any) => {};

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
}
