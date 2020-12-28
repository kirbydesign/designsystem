import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NumericKeyRules {
  public digitsPattern = /[0-9]/g;
  public separatorPattern: RegExp;
  public groupingSeparatorPattern: RegExp;
  private groupingSeparator: string;
  private decimalSeparator: string;

  constructor(@Inject(LOCALE_ID) private locale: string,) {
    this.groupingSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyGroup);
    this.decimalSeparator = getLocaleNumberSymbol(this.locale, NumberSymbol.CurrencyDecimal);
    this.separatorPattern = new RegExp('[' + this.decimalSeparator + ']+$', 'g');
    this.groupingSeparatorPattern = new RegExp('[' + this.groupingSeparator + ']+$', 'g');
  }

  public isMetaKeyAllowed(key: string): boolean {
    switch (key) {
      case 'ArrowRight':
      case 'ArrowLeft':
      case 'Tab':
      case 'Enter':
      case 'Backspace':
      case 'Delete':
      case 'Home':
      case 'End':
      case 'Ctrl':
      case 'Alt':
      case 'Control':
        return true;
    }
    return false;
  }

  public isKeyValid(
    allowNegativeNumber: boolean,
    maximumNumberOfDecimals: number,
    cursorPosition: number,
    key: string
  ): boolean {
    this.digitsPattern.lastIndex = 0;

    if (this.digitsPattern.test(key)) {
      return true;
    }

    if (allowNegativeNumber) {
      if (key === '-' && cursorPosition === 0) {
        return true;
      } else {
        if (key === '-') {
          return false;
        }
      }
    }
    if (maximumNumberOfDecimals === 0) {
      this.separatorPattern.lastIndex = 0;
      if (this.separatorPattern.test(key)) {
        return false;
      }
    }
    this.separatorPattern.lastIndex = 0;
    if (this.separatorPattern.test(key)) {
      return true;
    }
    this.groupingSeparatorPattern.lastIndex = 0;
    if (this.groupingSeparatorPattern.test(key)) {
      return false;
    }
    return false;
  }
}
