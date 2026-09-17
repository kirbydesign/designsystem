import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
  Optional,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { extendValueAccessors } from '@kirbydesign/designsystem/helpers';
import Inputmask from 'inputmask';

interface InputMask {
  unmaskedvalue: () => string;
  setValue: (val: string) => void;
  mask: (el: HTMLElement) => void;
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
    const element = this.elementRef.nativeElement;
    // Set type="text", because functionality like 'setSelectionRange' are not supported on type="number"
    element.setAttribute('type', 'text');

    // Remove maxlength as this is handled by the mask
    element.removeAttribute('maxlength');

    if (element.value) {
      element.value = this.toLocaleRadixPoint(element.value);
    }

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

  // Inputmask formats a pasted value incorrectly in two cases: it drops the radix
  // point from decimals (e.g. "5,5" becomes "55,00") and, when precision padding is
  // enforced, it merges the integer digits (e.g. "10" becomes "1.000,00"). For those
  // cases we build the resulting value and re-run the mask, which
  // formats it correctly.
  @HostListener('paste', ['$event'])
  protected onPaste(event: ClipboardEvent): void {
    if (!this.inputmask) return;
    const clipboard = event.clipboardData?.getData('text');
    if (clipboard == null) return;

    const element: HTMLInputElement = this.elementRef.nativeElement;
    const start = element.selectionStart ?? element.value.length;
    const end = element.selectionEnd ?? element.value.length;
    const combined = element.value.slice(0, start) + clipboard + element.value.slice(end);

    const inputmaskFormatsCorrectly =
      !this.padPrecisionDigits && !combined.includes(this.radixPoint);
    if (inputmaskFormatsCorrectly) {
      return;
    }

    // Prevent both the native paste and Inputmask's own paste handler from running.
    event.preventDefault();
    event.stopImmediatePropagation();

    element.value = combined;
    this.inputmask.mask(element);
    element.setSelectionRange(element.value.length, element.value.length);
    element.dispatchEvent(new Event('input', { bubbles: true }));
  }

  private getMax(maxlengthValue: number): number {
    return this.max === undefined ? maxlengthValue : Math.min(this.max, maxlengthValue);
  }

  private getMin(maxlengthValue: number): number {
    if (!this.allowMinus) return;
    maxlengthValue = -Math.abs(maxlengthValue);
    return this.min === undefined ? maxlengthValue : -Math.abs(Math.max(this.min, maxlengthValue));
  }

  private toLocaleRadixPoint(value: string): string {
    return value.replace('.', this.radixPoint);
  }

  private toStandardRadixPoint(value: string): string {
    return value.replace(this.radixPoint, '.');
  }

  private extendBuiltinValueAccessor(): void {
    extendValueAccessors<string>(this.valueAccessors, {
      writeValue: {
        afterWriteValue: (value) => {
          // Update the inputmask display when value is set programmatically
          if (this.inputmask && value != null) {
            this.inputmask.setValue(this.toLocaleRadixPoint(String(value)));
          }
        },
      },
      registerOnChange: {
        transformValue: (value) => {
          // Provide unmasked and normalized values to the form control
          if (this.inputmask) {
            return this.toStandardRadixPoint(this.inputmask.unmaskedvalue());
          }
          return value;
        },
      },
    });
  }
}
