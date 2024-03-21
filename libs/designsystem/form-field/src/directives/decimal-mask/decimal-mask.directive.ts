import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { Directive, ElementRef, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import 'inputmask/lib/extensions/inputmask.numeric.extensions';
import Inputmask from 'inputmask/lib/inputmask';

interface InputMask {
  unmaskedvalue: () => string;
  setValue: (val: string) => void;
}

@Directive({
  standalone: true,
  // eslint-disable-next-line
  selector: '[kirby-decimal-mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DecimalMaskDirective,
    },
  ],
})
export class DecimalMaskDirective implements ControlValueAccessor, OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() precision = 2;
  @Input() setMaxOnOverflow = false;
  @Input() alignment: 'left' | 'right' = 'right';

  @Input() set allowMinus(allowMinus: boolean) {
    this._allowMinus = allowMinus || (this.min || 0) < 0;
  }

  @Input() set disableGroupSeperator(disabled: string) {
    this._groupSeperatorDisabled = String(disabled) === '' || String(disabled) === 'true';
  }

  @Input() set maxlength(maxlength: number) {
    this._maxlength = maxlength;

    const maxlengthValue = parseInt('9'.repeat(maxlength));
    this.max = this.getMax(maxlengthValue);
    this.min = this.getMin(maxlengthValue);
  }

  groupSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.Group);
  radixPoint = getLocaleNumberSymbol(this.locale, NumberSymbol.Decimal);
  inputmask: InputMask;

  _allowMinus = false;
  _maxlength: number;
  _groupSeperatorDisabled: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: string) => {};

  constructor(private elementRef: ElementRef, @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit(): void {
    // Set type="text", because functionality like 'setSelectionRange' are not supported on type="number"
    this.elementRef.nativeElement.setAttribute('type', 'text');

    // Remove maxlength as this is handled by the mask
    this.elementRef.nativeElement.removeAttribute('maxlength');

    this.initMask();
  }

  writeValue(val: number): void {
    if (!this.inputmask) return;
    const formattedValue = String(val).replace('.', this.radixPoint);
    this.inputmask.setValue(formattedValue);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  registerOnTouched(_: any): void {}

  setDisabledState?(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  private initMask(): void {
    new Inputmask('decimal', {
      groupSeparator: this._groupSeperatorDisabled ? '' : this.groupSeparator,
      radixPoint: this.radixPoint,
      digits: this._maxlength ? 0 : this.precision,
      min: this.min,
      max: this.max,
      allowMinus: this._allowMinus,
      negationSymbol: {
        front: getLocaleNumberSymbol(this.locale, NumberSymbol.MinusSign),
        back: '',
      },
      SetMaxOnOverflow: this.setMaxOnOverflow,
      showMaskOnFocus: false,
      showMaskOnHover: false,
      placeholder: '',
      rightAlign: this.alignment === 'right',
      onBeforeWrite: () => {
        if (!this.inputmask) return;
        const unmaskedValue = this.inputmask.unmaskedvalue();
        this.onChange(unmaskedValue.replace(this.radixPoint, '.'));
      },
    }).mask(this.elementRef.nativeElement);
    this.inputmask = this.elementRef.nativeElement.inputmask;
  }

  private getMax(maxlengthValue: number): number {
    return this.max === undefined ? maxlengthValue : Math.min(this.max, maxlengthValue);
  }

  private getMin(maxlengthValue: number): number {
    if (!this.allowMinus) return;
    maxlengthValue = -Math.abs(maxlengthValue);
    return this.min === undefined ? maxlengthValue : -Math.abs(Math.max(this.min, maxlengthValue));
  }
}
