import { CurrencyPipe, DecimalPipe, getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgControl } from '@angular/forms';

import { NumericFormatter } from './numeric.formatter';

type ValueWithSplitDecimal = { value: string; decimalPart: string };

type Config = {
  maxNumberOfIntegrals: number;
  thousandSeparatorEnabled: boolean;
  allowNegativeNumber: boolean;
  maximumNumberOfDecimals: number;
};

@Injectable({
  providedIn: 'root',
})
export class NumericInputAnalyzer {
  private digitsPattern = /^[0-9]+$/g;
  private allowedPattern = /^[0-9.,]+$/g;
  private excludedPattern = /[^0-9.,]+/g;
  private separatorPattern = /[.,]+/g;

  private groupingSeparator: string;
  private decimalSeparator: string;
  private neutralGroupingSeparator = ','; // en-US
  private lastValue = '';
  private currentValue = '';

  private destroy$ = new Subject();
  private cursorPosition: number;
  private ngControl: NgControl;
  private hostElement: HTMLInputElement;

  private config: Config = {
    maxNumberOfIntegrals: 100,
    thousandSeparatorEnabled: true,
    allowNegativeNumber: false,
    maximumNumberOfDecimals: -1,
  };

  private integralPart: string;
  private decimalPart: string;
  private allowedCharsOnly: boolean;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe
  ) {}

  public run(ngControl: NgControl, hostElement: HTMLInputElement, config?: Config): any {
    if (config !== undefined) {
      this.config = config;
    }
    this.hostElement = hostElement;
    this.lastValue = hostElement.value;
    this.ngControl = ngControl;

    this.groupingSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyGroup);
    this.decimalSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyDecimal);

    console.log('grouping decimal', this.groupingSeparator, this.decimalSeparator);

    // @ts-ignore
    return this.ngControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        map((value: string) => value || ''),
        map((value: string) => this.capture(value)),
        filter((value: string) => this.lastValue !== value && value !== ''),
        map((value: string) => this.validateValue(value)),
        map((value: string) => this.handleIntegralPart(value)),
        map((value: string) => this.handleDecimalPart(value)),
        map((value: string) => this.output(value))
      )
      .subscribe((value: string) => {
        console.log('updating lastvalue', value);
        this.lastValue = value;
      });
  }

  Destroy(): void {
    this.destroy$.next();
  }

  /////////////////////////////////
  //// pipe methods
  /////////////////////////////////

  private capture(value: string): string {
    this.currentValue = value;
    console.log('/////////////////////////////////');
    console.log('value', value);
    console.log('this.lastValue', this.lastValue);
    return value;
  }

  private validateValue(value: string): string {
    this.findCursorPosition(this.hostElement);
    this.allowedCharsOnly = this.hasAllowedCharsOnly(value);
    if (!this.allowedCharsOnly) {
      return this.lastValue;
    }
    this.correctCursorPosition(value);
    return value;
  }

  private handleIntegralPart(value: string): string {
    if (!this.allowedCharsOnly) {
      return value;
    }
    this.integralPart = this.extractIntegralPart(value);
    this.integralPart = this.replaceSeparator(this.integralPart, this.groupingSeparator, '');
    this.integralPart = this.addGroupingSeparators(this.integralPart);
    console.log('addGroupingSeparators', this.integralPart);
    this.integralPart = this.replaceSeparator(
      this.integralPart,
      this.neutralGroupingSeparator,
      this.groupingSeparator
    );
    console.log('handleIntegralPart result', this.integralPart);
    return value;
  }

  private handleDecimalPart(value: string): string {
    if (!this.allowedCharsOnly) {
      return value;
    }
    this.decimalPart = this.findDecimalPart(value);
    if (this.decimalPart === null) {
      return this.lastValue;
    }
    return value;
  }

  private output(value: string): string {
    value = this.integralPart + this.decimalPart;
    console.log('output assemble value', value, this.currentValue);
    if (value !== this.currentValue) {
      this.updateValue(value);
    }
    return value;
  }

  /////////////////////////////////
  //// end pipe methods
  /////////////////////////////////

  private hasAllowedCharsOnly(value: string): boolean {
    const m = value.match(this.excludedPattern);
    if (m !== null && m.length > 0) {
      this.adjustCursorPositionAfterFormatting(this.lastValue.length, value.length);
      return false;
    }
    return true;
  }

  private findCursorPosition(inputElement: HTMLInputElement): void {
    this.cursorPosition = inputElement.selectionStart;
  }

  private correctCursorPosition(value: string): void {
    const count = this.countGroupingSeparator(value.substring(0, this.cursorPosition));
    this.cursorPosition -= count;
  }

  private replaceSeparator(value: string, separator: string, replaceValue: string): string {
    if (separator === replaceValue) {
      return value;
    }
    const r = new RegExp('[' + separator + ']+', 'g');
    while (value.indexOf(separator) > -1) {
      value = value.replace(r, replaceValue);
    }
    return value;
  }

  private formatIntegralPart(): void {
    if (this.integralPart === '') {
      return;
    }
    const convertedValue = this.convertIntoNumber(this.integralPart);
    this.integralPart = convertedValue.toString(10);
  }

  private formatResult(value: number): string {
    const formatter: NumericFormatter = new NumericFormatter(
      this.locale,
      this.decimalPipe,
      this.currencyPipe
    );
    const output = formatter.format(value);
    return output;
  }

  private addGroupingSeparators(value: string): string {
    const newValue = this.formatResult(this.convertIntoNumber(value));
    if (newValue === null) {
      return value;
    }
    if (value.length !== newValue.length) {
      if (value.length > newValue.length) {
        this.cursorPosition -= value.length - newValue.length;
      }
      if (newValue.length > value.length) {
        this.cursorPosition += newValue.length - value.length;
      }
    }
    return newValue;
  }

  private findDecimalPart(value: string): string {
    if (value.indexOf(this.decimalSeparator) === -1) {
      return '';
    }
    const decimalPart = this.extractDecimalUsingConfigSettings(value);
    return decimalPart;
  }

  private adjustCursorPositionAfterFormatting(
    formattedValLength: number,
    lengthBeforeFormatting: number
  ): void {
    if (lengthBeforeFormatting === formattedValLength + 1) {
      this.cursorPosition = this.cursorPosition - 1;
    }
    if (lengthBeforeFormatting === formattedValLength - 1) {
      this.cursorPosition = this.cursorPosition + 1;
    }
  }

  private updateValue(value: string): void {
    if (value === undefined || value === null) {
      return;
    }
    console.log('updateValue value', value);

    this.ngControl.control.setValue(value, {
      emitEvent: false,
      onlySelf: true,
      emitModelToViewChange: true,
    });

    // this.hostElement.value = value;
    /*
    let v = this.integralPart;
    if (this.decimalPart !== '') {
      v = this.integralPart + this.decimalPart;
    }*/

    // This is for setting the formControl value without thousand separators but not reflecting it in the view
    // console.log('updateValue v', v);
    /*
        this.ngControl.control.setValue(v, {
          emitEvent: false,
          emitModelToViewChange: false,
          onlySelf: true,
        });
    */
    if (this.cursorPosition !== undefined) {
      this.hostElement.setSelectionRange(this.cursorPosition, this.cursorPosition);
    }
  }

  private convertIntoNumber(value: string): number {
    const result = parseFloat(value);
    return result;
  }

  private extractDecimalUsingConfigSettings(value: string): string {
    if (this.unlimitedDecimalSupport()) {
      let decimalPart = this.extractDecimalPart(value);
      decimalPart = this.removeExtraDecimalSeparators(decimalPart);
      decimalPart = this.removeGroupingSeparatorAfterDecimalSeparator(decimalPart);
      return decimalPart;
    } else if (this.requiresDecimalSupport()) {
      let decimalPart = this.extractDecimalPart(value);
      decimalPart = this.removeExtraDecimalSeparators(decimalPart);
      decimalPart = this.removeGroupingSeparatorAfterDecimalSeparator(decimalPart);
      decimalPart = this.removeExceedingDecimals(decimalPart);
      return decimalPart;
    }
    return '';
  }

  private extractDecimalPart(value: string): string {
    const idx = value.indexOf(this.decimalSeparator);
    if (idx > -1) {
      return value.substring(idx);
    }
    return value;
  }

  private extractIntegralPart(value: string): string {
    const idx = value.indexOf(this.decimalSeparator);
    if (idx > -1) {
      return value.substring(0, idx);
    }
    return value;
  }

  private removeExtraDecimalSeparators(value: string): string {
    const count = this.countDecimalSeparator(value);
    if (count > 1) {
      value = this.replaceSeparator(value, this.decimalSeparator, '');
      return this.decimalSeparator + value;
    }
    return value;
  }

  private removeGroupingSeparatorAfterDecimalSeparator(value: string): string {
    if (
      value.indexOf(this.decimalSeparator) > -1 &&
      value.lastIndexOf(this.groupingSeparator) > value.lastIndexOf(this.decimalSeparator)
    ) {
      value = this.replaceSeparator(value, this.groupingSeparator, '');
      return value;
    }
    return value;
  }

  private countDecimalSeparator(value: string): number {
    let counter = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < value.length; i++) {
      if (value[i] === this.decimalSeparator) {
        counter++;
      }
    }
    return counter;
  }

  private countGroupingSeparator(value: string): number {
    let counter = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < value.length; i++) {
      if (value[i] === this.groupingSeparator) {
        counter++;
      }
    }
    return counter;
  }

  private requiresDecimalSupport(): boolean {
    return this.config.maximumNumberOfDecimals > 0;
  }

  private unlimitedDecimalSupport(): boolean {
    return this.config.maximumNumberOfDecimals === -1;
  }

  private zeroLengthDecimalSupport(): boolean {
    return this.config.maximumNumberOfDecimals === 0;
  }

  private numberOfDecimals(value: string): number {
    const indexOfDecimalSep = value.indexOf(this.decimalSeparator);
    if (indexOfDecimalSep === -1) {
      return 0;
    }
    const substr = value.substr(indexOfDecimalSep + 1);
    return substr.length;
  }

  private removeExceedingDecimals(value: string): string {
    if (this.requiresDecimalSupport()) {
      const count = this.numberOfDecimals(value);
      if (count > this.config.maximumNumberOfDecimals) {
        return value.substring(0, value.length - (count - this.config.maximumNumberOfDecimals));
      }
    }
    return value;
  }
}
