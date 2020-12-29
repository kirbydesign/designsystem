import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { NumericInputKeyDirective } from './numeric-input-key.directive';
import { KeyboardHelper } from './keyboard-helper';

describe('Directive: NumericInputKeyDirective', () => {
  [
    //    { id: 'da', separators: { group: '.', decimal: ',' } },
    { id: 'en', separators: { group: ',', decimal: '.' } },
  ].forEach((locale) => {
    describe(`locale: ${locale.id}`, () => {
      const createHost = createDirectiveFactory({
        directive: NumericInputKeyDirective,
        declarations: [NumericInputKeyDirective, DecimalPipe, CurrencyPipe],
        imports: [FormsModule, ReactiveFormsModule],
        providers: [
          DecimalPipe,
          CurrencyPipe,
          {
            provide: LOCALE_ID,
            useValue: locale.id,
          },
        ],
      });
      let testFormControl: FormControl;
      let spectatorDirective: SpectatorDirective<NumericInputKeyDirective>;
      let sep: string;
      let decSep: string;

      beforeEach(() => {
        testFormControl = new FormControl('');
        sep = locale.separators.group;
        decSep = locale.separators.decimal;
      });

      describe('grouping separator', () => {
        it('should detect key down and up', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled="false"  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;

          const val1 = '4';
          KeyboardHelper.Press(spectatorDirective, input, val1);
          expect(input.value).toBe(val1);

          const val2 = '2';
          KeyboardHelper.Press(spectatorDirective, input, val2);
          expect(input.value).toBe(val1 + val2);
          const val3 = '1';
          KeyboardHelper.Press(spectatorDirective, input, val3);
          expect(input.value).toBe(val1 + val2 + val3);
        });

        it('should NOT add grouping separators for number if not enabled', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled="false" />`;
          spectatorDirective = createHost(template, {});

          const input = spectatorDirective.element as HTMLInputElement;
          const val = '1234567890'; //
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(val);
        });

        it('should add grouping separators for number and set changed value in formControl', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled="true"  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;

          const val = '1234567890';
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          const expectedValue = `1${sep}234${sep}567${sep}890`;
          expect(input.value).toBe(expectedValue);
        });

        it('should only allow one leading "0" in input', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled="true"  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = '00';
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`0`);
        });

        it('should remove leading "0"s in input', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled="true"  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = '001234567890';
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`1${sep}234${sep}567${sep}890`);
        });

        it('should NOT add thousand separators for 20 digit number after decimal separator with 10 decimals', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled="true"  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = `1234567899${decSep}1234567890`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }

          expect(input.value).toBe(`1${sep}234${sep}567${sep}899${decSep}1234567890`);
        });

        it('should NOT add thousand separators for 3 digit integral', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled="true"  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = `123`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`123`);
        });

        it('should update add thousand separators when going from 3 to 4 digit number', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled=true  />`;
          spectatorDirective = createHost(template, {});

          const input = spectatorDirective.element as HTMLInputElement;
          let val = `123`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`123`);
          val = `4`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`1${sep}234`);
        });
      });

      describe('thousand to decimal separator', () => {
        beforeEach(() => {});

        it('should NOT convert thousand-separator to decimal-separator when changed char is a thousand-separator and "thousandToDecimalSeparatorEnabled" is disabled', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled=false  />`;
          spectatorDirective = createHost(template, {});

          const input = spectatorDirective.element as HTMLInputElement;
          const val = `12${locale.separators.group}341`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }

          expect((spectatorDirective.element as HTMLInputElement).value).toBe('12341');
        });

        it('should remove non number chars', () => {
          const template = `<input kirby-key-numeric-input thousandSeparatorEnabled=false  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = '12€34';
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect((spectatorDirective.element as HTMLInputElement).value).toBe('1234');
        });
      });
      describe('decimalsEnabled', () => {
        beforeEach(() => {});

        it('should remove decimals from number if decimals not enabled', () => {
          const template = `<input kirby-key-numeric-input maximumNumberOfDecimals=0 />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = `1234${decSep}12345679`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`123${sep}412${sep}345${sep}679`);
        });

        it('should NOT remove decimals from number if decimals enabled', () => {
          const template = `<input kirby-key-numeric-input maximumNumberOfDecimals=-1 />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = `1234${decSep}12345679`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`1${sep}234${decSep}12345679`);
        });
      });

      describe('maximumNumberOfDecimals', () => {
        it('should allow only maximum number of decimals', () => {
          const template = `<input kirby-key-numeric-input maximumNumberOfDecimals="2" />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = `${decSep}1234`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`0${decSep}12`);
        });
      });
      describe('format negative', () => {
        it('should add a "-" if isNegativeNumber, lenght is > 0 and value is not 0', () => {
          const template = `<input kirby-key-numeric-input   />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = `-0${decSep}1234`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(val);
        });
      });
      describe('remove duplicate decimal separator', () => {
        it('should only allow one decimal separator', () => {
          const template = `<input kirby-key-numeric-input maximumNumberOfDecimals=-1  />`;
          spectatorDirective = createHost(template, {});
          const input = spectatorDirective.element as HTMLInputElement;
          const val = `0${decSep}${decSep}1234`;
          for (let c of val) {
            KeyboardHelper.Press(spectatorDirective, input, c);
          }
          expect(input.value).toBe(`0${decSep}1234`);
        });
      });
    });
  });
});
