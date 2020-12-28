import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { NumericInputDirective } from './numeric-input.directive';

describe('Directive: NumericInputDirective', () => {
  [
    //    { id: 'da', separators: { group: '.', decimal: ',' } },
    { id: 'en', separators: { group: ',', decimal: '.' } },
  ].forEach((locale) => {
    describe(`locale: ${locale.id}`, () => {
      const createHost = createDirectiveFactory({
        directive: NumericInputDirective,
        declarations: [NumericInputDirective, DecimalPipe, CurrencyPipe],
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
      let spectatorDirective: SpectatorDirective<NumericInputDirective>;
      let sep: string;
      let decSep: string;

      beforeEach(() => {
        testFormControl = new FormControl('');
        sep = locale.separators.group;
        decSep = locale.separators.decimal;
      });
      describe('grouping separator', () => {
        it('should NOT add grouping separators for number if not enabled', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const val = '1234567890';
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(val);
        });

        it('should add grouping separators for number and set changed value in formControl', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=true [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const orgVal = '1234567890';
          testFormControl.setValue(orgVal);
          spectatorDirective.detectChanges();

          const expectedValue = `1${sep}234${sep}567${sep}890`;
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(expectedValue);
          expect(testFormControl.value).toBe(expectedValue);
        });

        it('should only allow one "0" in input', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=true [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          testFormControl.setValue('00');
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`0`);
        });

        it('should remove leading "0"s in input', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=true [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          testFormControl.setValue('001234567890');
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(
            `1${sep}234${sep}567${sep}890`
          );
        });

        it('should NOT add thousand separators for 20 digit number after decimal separator with 10 decimals', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=true [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          testFormControl.setValue(`1234567899${decSep}1234567890`);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(
            `1${sep}234${sep}567${sep}899${decSep}1234567890`
          );
        });

        it('should NOT add thousand separators for 3 digit number', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=true [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          testFormControl.setValue(`123`);
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`123`);
        });

        it('should update add thousand separators when going from 3 to 4 digit number', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=true [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          testFormControl.setValue(`123`);
          spectatorDirective.detectChanges();
          testFormControl.setValue(`1234`);
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`1${sep}234`);
        });

        it('should remove thousand separators when going from 4 to 3 digit number', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=true [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          const orgVal = `1${sep}234`;
          testFormControl.setValue(orgVal);
          spectatorDirective.detectChanges();
          const lastCharRemoved = orgVal.slice(0, -1);
          testFormControl.setValue(lastCharRemoved);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`123`);
        });
      });

      describe('thousand to decimal separator', () => {
        beforeEach(() => {});

        it('should NOT convert thousand-separator to decimal-separator when changed char is a thousand-separator and "thousandToDecimalSeparatorEnabled" is disabled', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });

          const val = `12${locale.separators.group}34`;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(val);
        });

        it('should convert thousand-separator to decimal-separator only when changed char is a thousand-separator', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const inputElm = spectatorDirective.element as HTMLInputElement;
          inputElm.value = '1234';
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(3, 3);
          testFormControl.setValue(`12${locale.separators.group}34`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(
            `12${locale.separators.decimal}34`
          );
        });

        it('should convert thousand-separator to decimal-separator when added thousand-separator at beginning of input', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const inputElm = spectatorDirective.element as HTMLInputElement;
          inputElm.value = '1234';
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(1, 1);
          testFormControl.setValue(`${locale.separators.group}1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(
            `0${locale.separators.decimal}1234`
          );
        });

        // tslint:disable-next-line:max-line-length
        it('should convert thousand-separator to decimal-separator when added thousand-separator at beginning of input for negative numbers', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          // spectator.directive.isNegativeNumber = true;
          const inputElm = spectatorDirective.element as HTMLInputElement;
          testFormControl.setValue(`-1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          inputElm.setSelectionRange(2, 2);
          testFormControl.setValue(`-${locale.separators.group}1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(
            `-0${locale.separators.decimal}1234`
          );
        });

        it('should remove non number chars', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          testFormControl.setValue('1234');
          testFormControl.setValue('12€34');
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe('1234');
        });

        it('should not convert thousand-separator to decimal-separator if more than 1 changed char', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          testFormControl.setValue('1234');
          const lastVal = `1233234${locale.separators.group}34`;
          testFormControl.setValue(lastVal);
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(lastVal);
        });
      });
      describe('decimalsEnabled', () => {
        beforeEach(() => {});

        it('should remove decimals from number if decimals not enabled', () => {
          const template = `<input kirby-numeric-input maximumNumberOfDecimals=0 [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          testFormControl.setValue(`1234${decSep}12345679`);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe('1234');
        });

        it('should NOT remove decimals from number if decimals enabled', () => {
          //  spectator.directive.decimalsEnabled = true;
          const template = `<input kirby-numeric-input maximumNumberOfDecimals=-1 [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          const val = `1234${sep}12345679`;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(val);
        });
      });

      describe('empty string', () => {
        it('should not format input, nor set selection range', () => {
          const template = `<input kirby-numeric-input maximumNumberOfDecimals=-1 [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const htmlElement = spectatorDirective.element as HTMLInputElement;
          spyOn(htmlElement, 'setSelectionRange');
          expect(htmlElement.value).toBe('');
          expect(htmlElement.setSelectionRange).not.toHaveBeenCalled();
        });
      });
      describe('maximumNumberOfDecimals', () => {
        it('should allow only maximum number of decimals', () => {
          const template = `<input kirby-numeric-input maximumNumberOfDecimals=2 [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const inputElm = spectatorDirective.element as HTMLInputElement;
          inputElm.value = '1234';
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(1, 1);
          testFormControl.setValue(`${decSep}1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`0${decSep}12`);
        });
      });
      describe('format negative', () => {
        it('should add a "-" if isNegativeNumber, lenght is > 0 and value is not 0', () => {
          //  spectator.directive.isNegativeNumber = true;

          const template = `<input kirby-numeric-input  [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });

          const inputElm = spectatorDirective.element as HTMLInputElement;
          inputElm.value = '1234';
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(1, 1);
          testFormControl.setValue(`${decSep}1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`-0${decSep}1234`);
        });
      });
      describe('remove duplicate decimal separator', () => {
        it('should only allow one decimal separator', () => {
          const template = `<input kirby-numeric-input maximumNumberOfDecimals=-1 [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });

          const inputElm = spectatorDirective.element as HTMLInputElement;
          inputElm.value = '1234';
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(1, 1);
          testFormControl.setValue(`${decSep}${decSep}1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`0${decSep}1234`);
        });
      });
    });
  });
});
