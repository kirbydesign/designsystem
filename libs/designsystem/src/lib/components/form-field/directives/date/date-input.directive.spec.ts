import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { DateInputDirective } from './date-input.directive';

describe('Directive: DateInputDirective', () => {
  [{ id: 'en', separators: { sep: '/' } }].forEach((locale) => {
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
      let month: string;
      let day: string;
      let year: string;

      beforeEach(() => {
        testFormControl = new FormControl('');
        sep = locale.separators.sep;
        month = '11';
        day = '22';
        year = '2020';
        const template = `<input kirby-date-input [formControl]="testFormControl" />`;
        spectatorDirective = createHost(template, {
          hostProps: { testFormControl },
        });
      });
      describe('dates separator', () => {
        it('should add separator and set changed value in formControl', () => {
          const val = month + day + year;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();

          const expectedValue = `${month}${sep}${day}${sep}${year}`;
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(expectedValue);
        });

        it('should remove leading "0"s in input', () => {
          const val = '00' + day + year;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          const expectedValue = `01${sep}${day}${sep}${year}`;
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(expectedValue);
        });

        it('should remove dates out of range in input', () => {
          const val = '32' + '32' + year;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          const expectedValue = `01${sep}01${sep}${year}`;
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(expectedValue);
        });

        it('should accept first char as 1', () => {
          const val = '1';
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(val);
        });

        it('should accept first part (month or day) as 01', () => {
          const val = '01';
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(val);
        });

        it('should accept month and as x/y', () => {
          const val = `${month}${sep}${month}`; //use month only to avoid looking a dd/mm and mm/dd scenarios
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(val);
        });
        it('should accept full date as x/y/z', () => {
          const val = `${month}${sep}${month}${sep}${year}`; //use month only to avoid looking a dd/mm and mm/dd scenarios
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect((spectatorDirective.element as HTMLInputElement).value).toBe(val);
        });
      });

      describe('empty string', () => {
        it('should not format input, nor set selection range', () => {
          const input = spectatorDirective.element as HTMLInputElement;
          spyOn(input, 'setSelectionRange');
          expect(input.value).toBe('');
          expect(input.setSelectionRange).not.toHaveBeenCalled();
        });
      });
    });
  });
});
