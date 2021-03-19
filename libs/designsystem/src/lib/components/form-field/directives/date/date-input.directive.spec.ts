import { DatePipe } from '@angular/common';
import '@angular/common/locales/global/da';
import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { DateInputDirective } from './date-input.directive';
import { DateLocaleAnalyser } from './date-locale-analyser';

describe('Directive: DateInputDirective', () => {
  [
    { id: 'en', separators: { sep: '/' } },
    { id: 'da', separators: { sep: '.' } },
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
      let inputElement: HTMLInputElement;
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
        inputElement = spectatorDirective.element as HTMLInputElement;
      });
      describe('dates separator', () => {
        it('should add separator and set changed value in formControl', () => {
          const localeSettings: DateLocaleAnalyser = new DateLocaleAnalyser(locale.id);
          let expectedValue = '';
          if (localeSettings.dayBeforeMonth) {
            expectedValue = `${day}${sep}${month}${sep}${year}`;
          } else {
            expectedValue = `${month}${sep}${day}${sep}${year}`;
          }
          const val = DateFormatHelper.getDate(locale.id, day, month, year);
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(expectedValue);
        });

        it('should remove leading "0"s in input', () => {
          const localeSettings: DateLocaleAnalyser = new DateLocaleAnalyser(locale.id);
          let val = '';
          let expectedValue = '';
          if (localeSettings.dayBeforeMonth) {
            val = `00${month}${year}`;
            expectedValue = `01${sep}${month}${sep}${year}`;
          } else {
            val = `00${day}${year}`;
            expectedValue = `01${sep}${day}${sep}${year}`;
          }

          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(expectedValue);
        });

        it('should handle out of range day (>31) and month (>12)', () => {
          const localeSettings: DateLocaleAnalyser = new DateLocaleAnalyser(locale.id);
          let val = '';
          let expectedValue = '';
          if (localeSettings.dayBeforeMonth) {
            val = '32';
            expectedValue = `31`;
          } else {
            val = '13';
            expectedValue = `12`;
          }

          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(expectedValue);
        });

        it('should handle lower out of range day (0) and month (0)', () => {
          const localeSettings: DateLocaleAnalyser = new DateLocaleAnalyser(locale.id);
          let val = '';
          let expectedValue = '';
          val = `0${sep}`;
          expectedValue = `01${sep}`;
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(expectedValue);
        });

        it('should remove dates out of range in input', () => {
          const val = DateFormatHelper.getDate(locale.id, '32', '13', year);
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          const expectedValue = DateFormatHelper.getDate(locale.id, '31', '12', year);
          expect(inputElement.value.replace(sep, '').replace(sep, '')).toBe(expectedValue);
        });

        it('should accept first char as 1', () => {
          const val = '1';
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(val);
        });

        it('should accept first part (month or day) as 01', () => {
          const val = '01';
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(val);
        });

        it('should accept month as x/y', () => {
          const val = `${month}${sep}${month}`; //use month only to avoid looking a dd/mm and mm/dd scenarios
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(val);
        });
        it('should accept full date as x/y/z', () => {
          const val = `${month}${sep}${month}${sep}${year}`; //use month only to avoid looking a dd/mm and mm/dd scenarios
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(val);
        });

        it('should convert 1/ to 01/', () => {
          const localeSettings: DateLocaleAnalyser = new DateLocaleAnalyser(locale.id);
          let val = '';
          let expectedValue = '';
          val = `0${sep}`;
          expectedValue = `01${sep}`;

          testFormControl.setValue(val);
          spectatorDirective.detectChanges();

          expect(inputElement.value).toBe(expectedValue);
        });

        it('should convert 01/1/ to 01/01/', () => {
          const localeSettings: DateLocaleAnalyser = new DateLocaleAnalyser(locale.id);
          let val = '';
          let expectedValue = '';
          val = `01${sep}1${sep}`;
          expectedValue = `01${sep}01${sep}`;

          testFormControl.setValue(val);
          spectatorDirective.detectChanges();

          expect(inputElement.value).toBe(expectedValue);
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

      describe('invalid characters', () => {
        it('should not allow invalid characters', () => {
          const val = 'a';
          const expectedValue = '';
          testFormControl.setValue(val);
          spectatorDirective.detectChanges();
          expect(inputElement.value).toBe(expectedValue);
        });
      });
    });
  });
});

class DateFormatHelper {
  public static getDate(locale: string, d: string, m: string, y: string): string {
    const localeSettings: DateLocaleAnalyser = new DateLocaleAnalyser(locale);
    if (localeSettings.yearFirst) {
      if (localeSettings.dayBeforeMonth) {
        return y + d + m;
      } else {
        return y + m + d;
      }
    }
    if (localeSettings.dayBeforeMonth) {
      return d + m + y;
    } else {
      return m + d + y;
    }
  }
}
