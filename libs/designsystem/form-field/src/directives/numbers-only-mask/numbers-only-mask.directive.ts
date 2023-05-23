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
  selector: '[kirby-numbers-only-mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumbersOnlyMaskDirective,
    },
  ],
})
export class NumbersOnlyMaskDirective implements ControlValueAccessor, OnInit {
  inputmask: InputMask;

  onChange = (_: string) => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Set type="text", because functionality like 'setSelectionRange' are not supported on type="number"
    this.elementRef.nativeElement.setAttribute('type', 'text');

    this.initMask();
  }

  writeValue(val: number): void {
    if (!this.inputmask) return;
    const formattedValue = String(val);
    this.inputmask.setValue(formattedValue);
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(_: any): void {}

  private initMask(): void {
    new Inputmask({
      placeholder: '',
      regex: '^[-+e\\d.,]+$',
      allowMinus: false,
    }).mask(this.elementRef.nativeElement);
    this.inputmask = this.elementRef.nativeElement.inputmask;
  }
}
