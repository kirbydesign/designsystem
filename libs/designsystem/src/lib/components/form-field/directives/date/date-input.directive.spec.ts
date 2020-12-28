import { DateInputDirective } from './date-input.directive';
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { DatePipe } from '@angular/common';

describe('Directive: DateInputDirective', () => {
  [
    //    { id: 'da', separators: { group: '.', decimal: ',' } },
    { id: 'en', separators: { group: ',', decimal: '.' } },
  ].forEach((locale) => {
    describe(`locale: ${locale.id}`, () => {
      const createHost = createDirectiveFactory({
        directive: DateInputDirective,
        declarations: [DateInputDirective, DatePipe],
        imports: [FormsModule, ReactiveFormsModule],
        providers: [
          DatePipe,
          {
            provide: LOCALE_ID,
            useValue: locale.id,
          },
        ],
      });
      let testFormControl: FormControl;
      let spectatorDirective: SpectatorDirective<DateInputDirective>;
      let sep: string;

      beforeEach(() => {
        testFormControl = new FormControl('');
        sep = locale.separators.group;
      });
      describe('dates separator', () => {
        it('should add separator and set changed value in formControl', () => {
          const template = `<input kirby-date-input  [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const orgVal = '22112020';
          testFormControl.setValue(orgVal);
          spectatorDirective.detectChanges();

          const expectedValue = `22${sep}22${sep}2020$`;
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(expectedValue);
          expect(testFormControl.value).toBe(expectedValue);
        });

        it('should only allow one "0" in input', () => {
          const template = `<input kirby-date-input [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          spectatorDirective.detectChanges();
          testFormControl.setValue('00');
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(`0`);
        });

        it('should remove leading "0"s in input', () => {
          const template = `<input kirby-date-input [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          testFormControl.setValue('00122020');
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(``);
        });
      });

      describe('empty string', () => {
        it('should not format input, nor set selection range', () => {
          const template = `<input kirby-date-input [formControl]="testFormControl" />`;
          spectatorDirective = createHost(template, {
            hostProps: { testFormControl },
          });
          const htmlElement = spectatorDirective.element as HTMLInputElement;
          spyOn(htmlElement, 'setSelectionRange');
          expect(htmlElement.value).toBe('');
          expect(htmlElement.setSelectionRange).not.toHaveBeenCalled();
        });
      });
    });
  });
});
