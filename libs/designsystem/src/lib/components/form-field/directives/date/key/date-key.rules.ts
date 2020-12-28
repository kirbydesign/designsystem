import { Injectable } from '@angular/core';
import { FormatWidth, getLocaleDateFormat, NumberSymbol } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DateKeyRules {
  public digitsPattern = /^[0-9]+$/g;
  public separatorPattern: RegExp;
  public separator: string;

  constructor(private locale: string) {
    const localeFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);

    const d = localeFormat.indexOf('dd');
    const m = localeFormat.indexOf('MM');
    const y = localeFormat.indexOf('y');
    if (y > 0) {
      this.separator = localeFormat[y - 1];
    } else if (d > 0) {
      this.separator = localeFormat[d - 1];
    } else if (m > 0) {
      this.separator = localeFormat[m - 1];
    }
    this.separatorPattern = new RegExp('[' + this.separator + ']+$', 'g');
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

  public isKeyValid(key: string): boolean {
    this.digitsPattern.lastIndex = 0;
    if (this.digitsPattern.test(key)) {
      console.log('this.digitsPattern true');
      return true;
    }

    if (this.separatorPattern.test(key)) {
      return true;
    }
    return false;
  }
}
