import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { CurrencyFormatterDirective } from './currency-formatter.directive';

describe('Directive: CurrencyFormatterDirective', () => {
  const createHost = createDirectiveFactory({
    directive: CurrencyFormatterDirective,
    declarations: [CurrencyFormatterDirective],
  });

  let spectator: SpectatorDirective<CurrencyFormatterDirective>;
  let element: HTMLInputElement;

  beforeEach(() => {
    const template = ` <input type="currency" kirby-input currencyFormatter />`;
    spectator = createHost(template);
    element = spectator.element as HTMLInputElement;
  });

  fit('should allow a decimal number', () => {
    element.value = '0,50';
    element.dispatchEvent(new Event('input'));
    spectator.detectChanges();

    expect(element.value).toBe(`0,50`);
  });

  fit('should add a leading 0 when entering a fraction', () => {
    element.value = ',50';
    element.dispatchEvent(new Event('input'));
    spectator.detectChanges();

    expect(element.value).toBe(`0,50`);
  });

  describe('thousand separator', () => {
    fit('should add thousand separators for 9 digit number', () => {
      element.value = '234567899';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`234.567.899`);
    });

    fit('should only allow one "0" in input', () => {
      element.value = '00';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`0`);
    });

    fit('should remove leading "0"s in input', () => {
      element.value = '001234567';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`1.234.567`);
    });

    fit('should NOT add thousand separators for 3 digit number', () => {
      element.value = '123';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`123`);
    });

    fit('should update add thousand separators when going from 3 to 4 digit number', () => {
      element.value = '123';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();
      element.value = '1234';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`1.234`);
    });

    fit('should remove thousand separators when going from 4 to 3 digit number', () => {
      element.value = '1234';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();
      element.value = '123';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`123`);
    });
  });

  describe('Whole number and fraction length', () => {
    fit('should by default only allow 9 digits before the decimal point', () => {
      element.value = '1234567890';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`123.456.789`);
    });

    fit('should by default only allow 2 decimals', () => {
      element.value = '123,123';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`123,12`);
    });

    fit('should only allow declared max number of digits before the decimal point', () => {
      spectator.directive.MAX_WHOLE_NUMBER_LENGTH = 3;
      element.value = '1111,11';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe('111,11');
    });

    fit('should only allow declared max number of decimals', () => {
      spectator.directive.MAX_FRACTION_LENGTH = 3;
      element.value = '1,5555';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe('1,555');
    });
  });

  describe('Localization format', () => {
    fit('should by default show grouping selector (.) and decimal point (,)', () => {
      element.value = '123456789,10';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`123.456.789,10`);
    });

    fit('should show grouping selector (,) and decimal point (.) when format = en-GB', () => {
      spectator.directive.LOCALIZATION_FORMAT = 'en-GB';
      element.value = '123456789.10';
      element.dispatchEvent(new Event('input'));
      spectator.detectChanges();

      expect(element.value).toBe(`123,456,789.10`);
    });
  });
});
