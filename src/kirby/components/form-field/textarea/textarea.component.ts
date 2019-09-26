import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true,
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR],
  selector: 'kirby-textarea',
  styleUrls: ['./textarea.component.scss'],
  templateUrl: './textarea.component.html',
})
export class TextareaComponent implements ControlValueAccessor {
  textareaId = `kirby-textarea-${textareaIds++}`;
  labelId = this.textareaId + '-label';

  @Input() disabled: boolean = false;
  @Input() label: string;
  @Input() name = this.textareaId;
  @Input() placeholder: string;
  @Input() rows: number;
  @Input() set value(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v;
    }
  }

  get value(): any {
    return this._innerValue || '';
  }

  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

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

let textareaIds = 0;
