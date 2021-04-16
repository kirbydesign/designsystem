import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonRange } from '@ionic/angular';

export type RangeValue = number | { lower: number; upper: number };

@Component({
  // tslint:disable-next-line:component-selector
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
export class RangeComponent implements OnInit, ControlValueAccessor {
  @ViewChild('ionRange', { static: false }) ionRange: IonRange;
  @ViewChild(IonRange, { read: ElementRef }) ionRangeElementRef: ElementRef;

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
  get value(): RangeValue {
    return this.currentValue;
  }
  @Output() valueChange: EventEmitter<RangeValue> = new EventEmitter<RangeValue>();

  private currentValue: RangeValue;
  initialized: boolean = false;

  constructor() {}

  ngOnInit() {
    if (!this.ticks) {
      this.initialized = true;
      return;
    }
    const amountOfTicks = (this.max - this.min) / this.step;
    if (amountOfTicks > 9) {
      this.step = (this.max - this.min) / 9;
    }
    this.initialized = true;
  }

  set value(value: RangeValue) {
    if (value !== this.currentValue) {
      this.currentValue = value;
      this.propagateChange(this.currentValue);
      this.valueChange.emit(this.currentValue);
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
