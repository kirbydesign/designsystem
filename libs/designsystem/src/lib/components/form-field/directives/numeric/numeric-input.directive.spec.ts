import '@angular/common/locales/global/da';
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { NumericInputDirective } from './numeric-input.directive';

describe('Directive: NumericInputDirective', () => {
  [
    { id: 'en', separators: { group: ',', decimal: '.' } },
    { id: 'da', separators: { group: '.', decimal: ',' } },
  ].forEach((locale) => {
    describe(`locale: ${locale.id}`, () => {
      const createHost = createDirectiveFactory({
        directive: NumericInputDirective,
        declarations: [NumericInputDirective],
        imports: [FormsModule, ReactiveFormsModule],
        providers: [
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

        it('should NOT convert thousand-separator to decimal-separator when changed char is a thousand-separator and "thousandSeparatorEnabled" is disabled', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });

          const val = `12${sep}34`;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe('1234');
        });

        it('should remove thousand-separator when disabled', () => {
          const template = `<input kirby-numeric-input thousandSeparatorEnabled=false [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const inputElm = spectatorDirective.element as HTMLInputElement;
          inputElm.value = '1234';
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(3, 3);
          testFormControl.setValue(`12${sep}34`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`1234`);
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
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`1${sep}234`);
        });

        it('should NOT remove decimals from number if decimals enabled', () => {
          const template = `<input kirby-numeric-input maximumNumberOfDecimals=-1 [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          const val = `1234${decSep}12345679`;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(
            `1${sep}234${decSep}12345679`
          );
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
          testFormControl.setValue(`0${decSep}1234`, {
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
          const template = `<input kirby-numeric-input  [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });

          const inputElm = spectatorDirective.element as HTMLInputElement;
          inputElm.value = '1234';
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(1, 1);
          testFormControl.setValue(`-10${decSep}1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`-10${decSep}1234`);
        });
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
          testFormControl.setValue(`-${decSep}1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`-0${decSep}1234`);
        });
      });
      describe('handle cursor position', () => {
        let template: string;
        let inputElm: HTMLInputElement;
        beforeEach(() => {
          template = `<input kirby-numeric-input  [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          inputElm = spectatorDirective.element as HTMLInputElement;
        });

        it('should add an integral digit beyound first group separator and increment cursor position', () => {
          inputElm.value = '123';
          inputElm.setSelectionRange(3, 3);
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(3, 3);
          testFormControl.setValue(`1234`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`1${sep}234`);
          expect(inputElm.selectionStart).toBe(4);
        });

        it('should add an integral digit 1 char beyond first group separator and increment cursor position', () => {
          inputElm.value = '123';
          inputElm.setSelectionRange(2, 2);
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(2, 2);
          testFormControl.setValue(`1243`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`1${sep}243`);
          expect(inputElm.selectionStart).toBe(3);
        });

        it('should delete an integral digit before first group separator and maintain cursor position', () => {
          inputElm.value = '1234567';
          inputElm.setSelectionRange(0, 0);
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          inputElm.setSelectionRange(2, 2);
          testFormControl.setValue(`124567`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`124${sep}567`);
          expect(inputElm.selectionStart).toBe(2);
        });

        it('should remove thousand separators when going from 123,456,789 to 123,489 digit number and maintain correct cursor position', () => {
          const element = spectatorDirective.element as HTMLInputElement;
          const cursorPos = 7;
          const orgVal = `123456789`;
          const formattedValue = `123${sep}456${sep}789`;
          testFormControl.setValue(orgVal);
          inputElm.setSelectionRange(cursorPos, cursorPos);
          spectatorDirective.detectChanges();
          expect(element.value).toBe(formattedValue);
          expect(inputElm.selectionStart).toBe(cursorPos);
          console.log(element.value);

          testFormControl.setValue(`12345689`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect(inputElm.selectionStart).toBe(cursorPos);
          expect(element.value).toBe(`12${sep}345${sep}689`);

          testFormControl.setValue(`1234589`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect(inputElm.selectionStart).toBe(cursorPos);
          expect(element.value).toBe(`1${sep}234${sep}589`);

          testFormControl.setValue(`123489`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect(element.value).toBe(`123${sep}489`);
          expect(inputElm.selectionStart).toBe(cursorPos - 1);

          //expect(inputElm.selectionStart).toBe(0);
        });

        it('should delete the first integral digit and maintain cursor position', () => {
          inputElm.value = '1234567';
          inputElm.setSelectionRange(0, 0);
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          testFormControl.setValue(`234567`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();

          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`234${sep}567`);
          expect(inputElm.selectionStart).toBe(0);
        });

        it('should delete 3 chars after the first integral digit and maintain cursor position', () => {
          //Hvis jeg indsætter 123,456,789 og dernæst sletter 6, 5 og 4 så havner min cursor efter kommaet
          inputElm.value = '123456789';
          inputElm.setSelectionRange(4, 4);
          spectatorDirective.detectChanges();
          spectatorDirective.directive.ngOnInit();
          expect(inputElm.value).toBe(`123456789`);
          expect(inputElm.selectionStart).toBe(4);
          console.log(
            'inputElm value and selectionStart',
            inputElm.value,
            inputElm.selectionStart,
            inputElm.selectionEnd
          );

          testFormControl.setValue(`123456789`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          console.log(
            'inputElm value and selectionStart',
            inputElm.value,
            inputElm.selectionStart,
            inputElm.selectionEnd
          );
          expect(inputElm.value).toBe(`123${sep}456${sep}789`);
          expect(inputElm.selectionStart).toBe(5);

          testFormControl.setValue(`12345789`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect(inputElm.value).toBe(`12${sep}345${sep}789`);
          console.log(
            'inputElm value and selectionStart',
            inputElm.value,
            inputElm.selectionStart,
            inputElm.selectionEnd
          );
          expect(inputElm.selectionStart).toBe(5);

          testFormControl.setValue(`1234789`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(
            `1${sep}234${sep}789`
          );
          console.log(
            'inputElm value and selectionStart',
            inputElm.value,
            inputElm.selectionStart,
            inputElm.selectionEnd
          );

          expect(inputElm.selectionStart).toBe(5);

          testFormControl.setValue(`123789`, {
            emitModelToViewChange: false,
            emitViewToModelChange: false,
            onlySelf: true,
          });
          spectatorDirective.detectChanges();
          expect(inputElm.value).toBe(`123${sep}789`);
          console.log(
            'inputElm value and selectionStart',
            inputElm.value,
            inputElm.selectionStart,
            inputElm.selectionEnd
          );

          expect(inputElm.selectionStart).toBe(5);
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
          testFormControl.setValue(`0${decSep}${decSep}1234`, {
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
