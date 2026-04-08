import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { Directive, ElementRef, Inject, Input, LOCALE_ID, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { extendValueAccessors } from '@kirbydesign/designsystem/helpers';
import Inputmask from 'inputmask/dist/inputmask.es6.js';

interface InputMask {
  unmaskedvalue: () => string;
  setValue: (val: string) => void;
}

@Directive({
  // eslint-disable-next-line
  selector: '[kirby-decimal-mask]',
})
export class DecimalMaskDirective implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() precision = 2;
  @Input() setMaxOnOverflow = false;
  @Input() alignment: 'left' | 'right' = 'right';
  @Input() padPrecisionDigits: boolean = false;

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

  constructor(
    private elementRef: ElementRef,
    @Inject(LOCALE_ID) private locale: string,
    @Optional() @Inject(NG_VALUE_ACCESSOR) private valueAccessors: ControlValueAccessor[]
  ) {
    this.extendBuiltinValueAccessor();
  }

  ngOnInit(): void {
    // Set type="text", because functionality like 'setSelectionRange' are not supported on type="number"
    this.elementRef.nativeElement.setAttribute('type', 'text');

    // Remove maxlength as this is handled by the mask
    this.elementRef.nativeElement.removeAttribute('maxlength');

    this.initMask();
  }

  private initMask(): void {
    new Inputmask('decimal', {
      groupSeparator: this._groupSeperatorDisabled ? '' : this.groupSeparator,
      radixPoint: this.radixPoint,
      digits: this._maxlength ? 0 : this.precision,
      digitsOptional: !this.padPrecisionDigits,
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
      placeholder: this.padPrecisionDigits ? undefined : '',
      rightAlign: this.alignment === 'right',
      onBeforeWrite: () => {
        if (!this.inputmask) return;
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

  private extendBuiltinValueAccessor(): void {
    extendValueAccessors<string>(this.valueAccessors, {
      writeValue: {
        afterWriteValue: (value) => {
          // Update the inputmask display when value is set programmatically
          if (this.inputmask && value != null) {
            const formattedValue = String(value).replace('.', this.radixPoint);
            this.inputmask.setValue(formattedValue);
          }
        },
      },
      registerOnChange: {
        transformValue: (value) => {
          // Provide unmasked and normalized values to the form control
          if (this.inputmask) {
            const unmaskedValue = this.inputmask.unmaskedvalue();
            return unmaskedValue.replace(this.radixPoint, '.');
          }
          return value;
        },
      },
    });
  }
}
