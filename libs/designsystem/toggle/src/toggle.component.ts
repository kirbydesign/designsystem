import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'kirby-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent implements ControlValueAccessor {
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  _pressed = false;

  onCheckedChange(checked: boolean): void {
    this.checked = checked;
    this._onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  _onActive() {
    this._pressed = true;
  }

  _onInactive() {
    this._pressed = false;
    this._onTouched();
  }

  // Initialize default ControlValueAccessor callback functions (noop)
  // eslint-disable-next-line no-empty-function
  private _onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line no-empty-function
  private _onTouched = () => {};

  /**
   * Sets the toggle's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: boolean): void {
    this.checked = value;
  }
  /**
   * Saves a callback function to be invoked when the toggle's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  /**
   * Saves a callback function to be invoked when the toggle is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  /**
   * Disables the toggle. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.detectChanges();
  }
}
