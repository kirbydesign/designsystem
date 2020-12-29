import { CurrencyPipe, DecimalPipe, getLocaleNumberSymbol, NumberSymbol } from '@angular/common';

import { NumericFormatter } from './numeric.formatter';

type Config = {
  maxNumberOfIntegrals: number;
  thousandSeparatorEnabled: boolean;
  allowNegativeNumber: boolean;
  maximumNumberOfDecimals: number;
};

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
  private hasNegativeSign = false;

  private config: Config = {
    maxNumberOfIntegrals: 100,
    thousandSeparatorEnabled: true,
    allowNegativeNumber: false,
    maximumNumberOfDecimals: -1,
  };

  private integralPart: string;
  private decimalPart: string;
  private allowedCharsOnly: boolean;

  public cursorPosition: number;
  public invalid: boolean;

  constructor(
    private locale: string,
    private decimalPipe: DecimalPipe,
    private currencyPipe: CurrencyPipe,
    config?: Config
  ) {
    if (config !== undefined) {
      this.config = config;
    }
    this.groupingSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyGroup);
    this.decimalSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyDecimal);
  }

  public analyse(cursorPosition: number, value: string, lastValue: string): string {
    this.cursorPosition = cursorPosition;
    this.lastValue = lastValue;
    value = value || '';
    value = this.resetAndCapture(value);

    if (this.lastValue !== value && value !== '') {
      value = this.handleNegativeSign(value);
      value = this.validateValue(value);
      value = this.handleIntegralPart(value);
      value = this.handleDecimalPart(value);
      value = this.createOutput(value);
    }
    return value;
  }

  private resetAndCapture(value: string): string {
    this.invalid = false;
    this.hasNegativeSign = false;
    this.integralPart = '';
    this.decimalPart = '';
    this.currentValue = value;
    return value;
  }

  private handleNegativeSign(value: string): string {
    if (this.config.allowNegativeNumber) {
      if (value.startsWith('-')) {
        this.hasNegativeSign = true;
        value = value.substring(1);
      }
    }
    return value;
  }
  private validateValue(value: string): string {
    this.allowedCharsOnly = this.hasAllowedCharsOnly(value);
    if (!this.allowedCharsOnly) {
      this.invalid = true;
      return this.lastValue;
    }
    this.adjustCursorPosition(value);
    return value;
  }

  private handleIntegralPart(value: string): string {
    if (!this.allowedCharsOnly) {
      this.invalid = true;
      return value;
    }
    this.integralPart = this.extractIntegralPart(value);
    this.integralPart = this.replaceSeparator(this.integralPart, this.groupingSeparator, '');
    if (this.integralPart.length > this.config.maxNumberOfIntegrals) {
      this.invalid = true;
      return this.lastValue;
    }
    this.integralPart = this.addGroupingSeparators(this.integralPart);
    if (this.integralPart.length === 0) {
      this.integralPart = '0';
    }
    return value;
  }

  private handleDecimalPart(value: string): string {
    if (!this.allowedCharsOnly) {
      this.invalid = true;
      return value;
    }
    this.decimalPart = this.findDecimalPart(value);
    if (this.decimalPart === null) {
      return this.lastValue;
    }
    return value;
  }

  private createOutput(value: string): string {
    value = this.integralPart + this.decimalPart;
    if (value === '') {
      value = this.lastValue;
    }
    if (this.config.allowNegativeNumber && this.hasNegativeSign) {
      value = '-' + value;
    }
    return value;
  }

  private hasAllowedCharsOnly(value: string): boolean {
    const m = value.match(this.excludedPattern);
    if (m !== null && m.length > 0) {
      this.adjustCursorPositionAfterFormatting(this.lastValue.length, value.length);
      return false;
    }
    return true;
  }

  private adjustCursorPosition(value: string): void {
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

  public formatResult(value: number): string {
    const formatter: NumericFormatter = new NumericFormatter(
      this.locale,
      this.decimalPipe,
      this.currencyPipe
    );
    const output = formatter.format(value);
    return output;
  }

  private addGroupingSeparators(value: string): string {
    if (!this.config.thousandSeparatorEnabled) {
      return value;
    }
    let newValue = this.formatResult(this.convertIntoNumber(value));
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
    newValue = this.replaceSeparator(
      newValue,
      this.neutralGroupingSeparator,
      this.groupingSeparator
    );
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
      value = value.substring(idx);
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
      this.invalid = true;
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
      this.invalid = true;
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
        this.invalid = true;
        return value.substring(0, value.length - (count - this.config.maximumNumberOfDecimals));
      }
    }
    return value;
  }
}
