import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
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
})
export class RangeComponent implements OnChanges, ControlValueAccessor {
  @Input() minLabel: string;
  @Input() maxLabel: string;
  @Input() debounce: number;
  @Input() max: number;
  @Input() min: number;
  @Input() pin: boolean;
  @Input() step: number = 1;
  @Input() ticks: boolean;
  @Input() disabled;
  @Input()
  get value(): number {
    return this.currentValue;
  }

  set value(value: number) {
    if (value !== this.currentValue) {
      this.currentValue = value;
      this.propagateChange(this.currentValue);
      console.log(this.currentValue);
      this.change.emit(this.currentValue);
    }
  }
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  private currentValue: number;

  ngOnChanges(_: SimpleChanges) {
    if (!this.ticks) return;

    const amountOfTicks = (this.max - this.min) / this.step;
    if (amountOfTicks > 9) {
      this.step = (this.max - this.min) / 9;
    }
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public rangeValueChange($event: any): void {
    this.writeValue($event.detail.value);
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
