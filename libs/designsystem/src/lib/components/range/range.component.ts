import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
})
export class RangeComponent implements ControlValueAccessor {
  @ViewChild('ionRange', { static: false }) ionRange: IonRange;
  @ViewChild(IonRange, { read: ElementRef }) ionRangeElementRef: ElementRef;

  @Input() minLabel: string;
  @Input() maxLabel: string;
  @Input() color: string;
  @Input() debounce: number;
  @Input() max: number;
  @Input() min: number;
  @Input() mode: 'ios' | 'md';
  @Input() name: string;
  @Input() pin: boolean;
  @Input() snaps: boolean;
  @Input() step: number;
  @Input() ticks: number;
  @Output() valueChange: EventEmitter<RangeValue> = new EventEmitter<RangeValue>();

  @Output() disabled: boolean;
  private currentValue: RangeValue;

  constructor() {}

  public get value(): RangeValue {
    return this.currentValue;
  }

  public set value(value: RangeValue) {
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
