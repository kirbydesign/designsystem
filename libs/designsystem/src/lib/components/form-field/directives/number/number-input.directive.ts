import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { Directive, ElementRef, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Inputmask from 'inputmask';

interface InputMask {
  unmaskedvalue: () => number;
  setValue: (val: number) => void;
}

@Directive({
  selector:
    '[kirby-input][type="number"]:not([kirby-input-disable-mask]), input[kirby-input-numeric]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumberInputDirective,
    },
  ],
})
export class NumberInputDirective implements ControlValueAccessor, OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() precision = 2;
  @Input() allowMinus = false;
  @Input() setMaxOnOverflow = false;
  @Input() set maxlength(val: number) {
    const maxlengthValue = parseInt('9'.repeat(val));
    this.max = this.getMax(maxlengthValue);
    this.min = this.getMin(maxlengthValue);
  }

  inputmask: InputMask;
  onChange = (_: number) => {};

  constructor(private elementRef: ElementRef, @Inject(LOCALE_ID) private locale: string) {}

  ngOnInit() {
    // Set type="text", because functionality like 'setSelectionRange' are not supported on type="number"
    this.elementRef.nativeElement.setAttribute('type', 'text');

    // Remove maxlength as this are handled by the mask
    this.elementRef.nativeElement.removeAttribute('maxlength');

    this.initMask();
  }

  writeValue(val: number) {
    if (!this.inputmask) return;
    this.inputmask.setValue(val);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(_: any) {}

  private initMask(): void {
    new Inputmask('decimal', {
      groupSeparator: getLocaleNumberSymbol(this.locale, NumberSymbol.Group),
      radixPoint: getLocaleNumberSymbol(this.locale, NumberSymbol.Decimal),
      digits: this.precision,
      min: this.min,
      max: this.max,
      allowMinus: this.allowMinus || (this.min || 0) < 0,
      negationSymbol: {
        front: getLocaleNumberSymbol(this.locale, NumberSymbol.MinusSign),
        back: '',
      },
      SetMaxOnOverflow: this.setMaxOnOverflow,
      showMaskOnFocus: false,
      showMaskOnHover: false,
      onBeforeWrite: () => {
        this.onChange(this.inputmask.unmaskedvalue());
      },
    }).mask(this.elementRef.nativeElement);
    this.inputmask = this.elementRef.nativeElement.inputmask;
  }

  private getMax(maxlengthValue: number): number {
    return !this.max ? maxlengthValue : Math.min(this.max, maxlengthValue);
  }

  private getMin(maxlengthValue: number): number {
    if (!this.allowMinus) return null;
    maxlengthValue = -Math.abs(maxlengthValue);
    return !this.min ? maxlengthValue : -Math.abs(Math.max(this.min, maxlengthValue));
  }
}
