import { formatNumber, getLocaleNumberSymbol, NumberSymbol } from '@angular/common';

type Config = {
  maxNumberOfIntegrals: number;
  thousandSeparatorEnabled: boolean;
  allowNegativeNumber: boolean;
  maximumNumberOfDecimals: number;
};

export type RetValue = {
  cursorPos: number;
  value: string;
};

export class NumericInputAnalyzer {
  public invalid: boolean;
  private cursorPosition: number;
  private excludedPattern = /[^0-9.,]+/g;
  private groupingSeparator: string;
  private decimalSeparator: string;
  private neutralGroupingSeparator = ','; // en-US

  private lastValue = '';
  private lastCursorPosition = 0;

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

  constructor(private locale: string, config?: Config) {
    if (config !== undefined) {
      this.config = config;
    }
    this.groupingSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyGroup);
    this.decimalSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyDecimal);
  }

  public analyse(
    cursorPosition: number,
    lastCursorPosition: number,
    value: string,
    lastValue: string
  ): RetValue {
    this.cursorPosition = cursorPosition;
    this.lastCursorPosition = lastCursorPosition;
    this.lastValue = lastValue;
    value = value || '';
    this.resetAndCapture(value);
    if (this.hasExitState(value)) {
      if (value === '-' && !this.config.allowNegativeNumber) {
        return { value: '', cursorPos: 0 };
      }
    } else {
      if (this.hasInvalidCombination(value)) {
        return { value: this.lastValue, cursorPos: this.lastCursorPosition };
      }
      value = this.handleNegativeSign(value);
      value = this.validateValue(value);
      value = this.handleIntegralPart(value);
      value = this.handleDecimalPart(value);
      value = this.createOutput(value);
      this.adjustCursorPosition(value);
    }
    return { value: value, cursorPos: this.cursorPosition };
  }

  private hasExitState(value: string): boolean {
    return this.lastValue === value || value === '';
  }

  private hasInvalidCombination(value: string): boolean {
    return (
      (this.config.allowNegativeNumber && value.lastIndexOf('-') > 0) ||
      (!this.config.allowNegativeNumber && value.indexOf('-') > -1)
    );
  }

  private resetAndCapture(value: string) {
    this.invalid = false;
    this.hasNegativeSign = false;
    this.integralPart = '';
    this.decimalPart = '';
    this.currentValue = value;
  }

  private handleNegativeSign(value: string): string {
    if (value === '' || value === '-') {
      return value;
    }
    if (this.config.allowNegativeNumber) {
      if (value.startsWith('-')) {
        this.hasNegativeSign = true;
        value = value.substring(1);
      }
    }
    return value;
  }

  private validateValue(value: string): string {
    if (value === '' || value === '-') {
      return value;
    }
    this.allowedCharsOnly = this.hasAllowedCharsOnly(value);
    if (!this.allowedCharsOnly) {
      this.invalid = true;
      return this.extractLastValue();
    }
    return value;
  }
  private extractLastValue(): string {
    if (this.lastValue.length > 0 && this.lastValue[0] === '-') {
      this.hasNegativeSign = true;
      return this.lastValue.substring(1);
    } else {
      this.hasNegativeSign = false;
      return this.lastValue;
    }
  }
  private handleIntegralPart(value: string): string {
    if (value === '' || value === '-') {
      return value;
    }
    this.integralPart = this.extractIntegralPart(value);
    this.integralPart = this.replaceSeparator(this.integralPart, this.groupingSeparator, '');
    if (this.integralPart.length > this.config.maxNumberOfIntegrals) {
      this.invalid = true;
      value = this.extractLastValue();
      this.integralPart = this.extractIntegralPart(value);
      this.integralPart = this.replaceSeparator(this.integralPart, this.groupingSeparator, '');
    }
    this.integralPart = this.addGroupingSeparators(this.integralPart);
    if (this.integralPart === '') {
      this.integralPart = '0';
    }
    return value;
  }

  private handleDecimalPart(value: string): string {
    if (value === '' || value === '-') {
      return value;
    }
    this.decimalPart = this.findDecimalPart(value);
    if (this.decimalPart === null) {
      return this.lastValue;
    }
    return value;
  }

  private createOutput(value: string): string {
    if (value === '' || value === '-') {
      return value;
    }
    value = this.integralPart + this.decimalPart;
    if (value === '') {
      return '';
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
    if (this.invalid) {
      return;
    }
    if (value === '') {
      this.cursorPosition = 0;
      return;
    }
    if (value === undefined) {
      this.cursorPosition = 0;
      return;
    }

    if (value === '-') {
      return;
    }
    const lastCount = this.countGroupingSeparators(
      this.lastValue.substring(0, this.lastCursorPosition)
    );
    const newCount = this.countGroupingSeparators(value.substring(0, this.cursorPosition));
    this.cursorPosition += newCount - lastCount;
  }

  private replaceSeparator(value: string, separator: string, replaceValue: string): string {
    if (separator === replaceValue) {
      return value;
    }
    const r = new RegExp(`[${separator}]`, 'g');
    while (value.indexOf(separator) > -1) {
      value = value.replace(r, replaceValue);
    }
    return value;
  }

  private addGroupingSeparators(value: string): string {
    if (!this.config.thousandSeparatorEnabled) {
      return value;
    }
    let newValue = formatNumber(this.convertIntoNumber(value), this.locale, '0.');
    if (newValue === null) {
      return value;
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
      let result = value.substring(0, idx);
      if (result === '') {
        result = '0';
      }
      return result;
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
    return value.split(this.decimalSeparator).length - 1;
  }

  private countGroupingSeparators(value: string): number {
    return value.split(this.groupingSeparator).length - 1;
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
