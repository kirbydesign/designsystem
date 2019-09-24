import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';

export type InputType =
  | 'date'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url';

export type Inputmode =
  | 'none'
  | 'text'
  | 'decimal'
  | 'numeric'
  | 'tel'
  | 'search'
  | 'email'
  | 'url'
  | undefined;

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true,
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  selector: 'kirby-input',
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html',
})
export class InputComponent implements ControlValueAccessor {
  inputId = `kirby-input-${inputIds++}`;
  labelId = this.inputId + '-label';

  @Input() autocomplete: 'on' | 'off' = 'off';
  @Input() autocorrect: 'on' | 'off' = 'off';
  @Input() disabled: boolean = false;
  @Input() inputmode: Inputmode;
  @Input() label: string;
  @Input() name = this.inputId;
  @Input() placeholder: string;
  @Input() type: InputType = 'text';

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  get value(): any {
    return this._innerValue || '';
  }

  set value(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v;
    }
  }

  private _propagateChange = (_: any) => {};
  private _innerValue: any;

  onInput(ev: Event): void {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      //set changed value
      this._innerValue = input.value || '';
    }
    // propagate value into form control using control value accessor interface
    this._propagateChange(this._innerValue);
  }

  onBlur(): void {
    this.blur.emit();
  }

  onFocus(): void {
    this.focus.emit();
  }

  writeValue(obj: any): void {
    this._innerValue = obj;
  }
  registerOnChange(fn: any): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

let inputIds = 0;
