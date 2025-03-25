import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldControl } from '@kirbydesign/designsystem/types';

@Component({
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'textarea[kirby-textarea]',
  styleUrls: ['./textarea.component.scss'],
  templateUrl: './textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements OnChanges, FormFieldControl, ControlValueAccessor {
  kirbyChange = new EventEmitter<string>();
  private _hasError: boolean = false;

  @Input() value: string;

  /**
   * Removes padding, width, rounded borders and drop-shadow when set to `true`.
   */
  @HostBinding('class.borderless')
  @Input()
  borderless: boolean;

  @HostBinding('attr.aria-invalid')
  @HostBinding('class.error')
  @Input()
  get hasError(): boolean {
    return this._hasError;
  }

  set hasError(value: boolean) {
    if (this._hasError !== value) {
      this._hasError = value;
      this.hasErrorChange.emit(this._hasError);
    }
  }

  @HostBinding('attr.autocomplete')
  @Input()
  autocomplete: 'on' | 'off' = 'off';

  @HostBinding('attr.autocorrect')
  @Input()
  autocorrect: 'on' | 'off' = 'off';

  @HostBinding('attr.maxlength')
  @Input()
  maxlength: number;

  @Output() hasErrorChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.kirbyChange.emit(changes.value.currentValue);
    }
  }

  writeValue(value: string): void {
    if (value !== this.value) {
      this.kirbyChange.emit(value);
      this.value = value;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnChange(_fn: any): void {
    // handled by built-in textarea support in Angular 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(_fn: any): void {
    // handled by built-in textarea support in Angular 
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDisabledState?(_isDisabled: boolean): void {
    // handled in textarea Angular component
  }

  @HostListener('keyup', ['$event.target.value'])
  _onKeyUp(value: string) {
    this.kirbyChange.emit(value);
  }

  @HostListener('paste', ['$event.target'])
  @HostListener('cut', ['$event.target'])
  _onCutPaste(target: HTMLInputElement) {
    //Value of textarea element is updated after cut/paste:
    setTimeout(() => this.kirbyChange.emit(target.value));
  }
}
