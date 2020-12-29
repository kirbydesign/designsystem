import { Injectable } from '@angular/core';

import { DateLocaleAnalyser } from '../date-locale-analyser';

@Injectable({
  providedIn: 'root',
})
export class DateKeyRules {
  public digitsPattern = /^[0-9]+$/g;
  public separatorPattern: RegExp;

  constructor(localeConfig: DateLocaleAnalyser) {
    this.separatorPattern = new RegExp('[' + localeConfig.separator + ']+$', 'g');
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
