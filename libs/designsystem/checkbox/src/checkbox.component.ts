import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UniqueIdGenerator } from '@kirbydesign/designsystem/helpers';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'kirby-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() checked: boolean = false;
  @Input() attentionLevel: '1' | '2' = '2';

  @HostBinding('class.has-label')
  @Input()
  text: string;

  @HostBinding('class')
  @Input()
  size?: 'xs' | 'sm' | 'md';

  @HostBinding('class.error')
  @Input()
  hasError: boolean = false;

  @Input() disabled = false;
  @HostBinding('attr.disabled')
  get _isDisabled() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.attention-level1') get isAttentionLevel1() {
    return this.attentionLevel === '1';
  }
  @HostBinding('class.attention-level2') get isAttentionLevel2() {
    return this.attentionLevel === '2';
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  onChecked(checked: boolean): void {
    this.checked = checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
    this.onTouched();
  }

  // IDs used for a11y labelling
  _labelId = UniqueIdGenerator.scopedTo('kirby-checkbox-label').next();

  //ControleValueAcessor
  private _onChange: (value: boolean) => void = () => {};
  private _onTouched = () => {};

  /**
   * Writes a new value to the form control associated with the custom checkbox control.
   * Part of the ControlValueAccessor interface.
   */
  writeValue(value: boolean): void {
    this.checked = value;
  }

  /**
   * Registers a callback function that should be called when the value of the checkbox changes.
   * Part of the ControlValueAccessor interface.
   */
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the checkbox is touched.
   * Part of the ControlValueAccessor interface.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the checkbox.
   * Part of the ControlValueAccessor interface.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
