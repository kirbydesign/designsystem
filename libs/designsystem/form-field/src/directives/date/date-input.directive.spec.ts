import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { LOCALE_ID } from '@angular/core';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
// eslint-disable-next-line @nx/enforce-module-boundaries

import { InputComponent } from '../../input/input.component';

import { DateInputDirective } from './date-input.directive';

describe('DateInputDirective', () => {
  let locale: 'da' | 'en-GB' = 'en-GB';
  let spectator: SpectatorDirective<DateInputDirective>;

  registerLocaleData(localeDa);

  const createDirective = createDirectiveFactory({
    directive: DateInputDirective,
    imports: [InputComponent],
    providers: [
      {
        provide: LOCALE_ID,
        useFactory: () => locale,
      },
    ],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createDirective(`<input kirby-input type="date" />`);
    });

    it('should get the instance', () => {
      const instance = spectator.directive;
      expect(instance).toBeDefined();
    });

    it('should have initial date-mask placeholder', () => {
      // @ts-ignore
      expect(spectator.element.placeholder).toEqual('mm/dd/yyyy');
    });

    it('should not have initial date-mask value', () => {
      // @ts-ignore
      expect(spectator.element.value).toEqual('');
    });

    it('should keep date-mask when typing', () => {
      spectator.typeInElement('11', spectator.element);
      expect(spectator.element).toHaveValue('11/dd/yyyy');
    });

    it('should add leading zero for month > 4', () => {
      spectator.typeInElement('4', spectator.element);
      expect(spectator.element).toHaveValue('04/dd/yyyy');
    });

    it('should add leading zero for day > 4', () => {
      spectator.typeInElement('01/4', spectator.element);
      expect(spectator.element).toHaveValue('01/04/yyyy');
    });

    it('should have inputmode="numeric"', () => {
      expect((spectator.element as HTMLInputElement).inputMode).toBe('numeric');
    });

    it('should replace type="date", with type="text"', () => {
      expect((spectator.element as HTMLInputElement).type).toBe('text');
    });

    it('should only allow numeric characters', () => {
      spectator.typeInElement('a', spectator.element);
      expect(spectator.element).toHaveValue('');
    });

    it('should not prefill year by default', () => {
      spectator.typeInElement('10/04/20', spectator.element);
      expect(spectator.element).toHaveValue('10/04/20yy');
    });

    it('should handle multiple seperators', () => {
      spectator.typeInElement('01/01-2021', spectator.element);
      expect(spectator.element).toHaveValue('01/01/2021');

      spectator.typeInElement('01-01-2021', spectator.element);
      expect(spectator.element).toHaveValue('01/01/2021');

      spectator.typeInElement('01/01/2021', spectator.element);
      expect(spectator.element).toHaveValue('01/01/2021');
    });

    it('should replace yyyy with åååå', () => {
      locale = 'da';

      // @ts-ignore
      expect(spectator.element.placeholder).toEqual('mm/dd/yyyy');
      locale = 'en-GB';
    });

    describe('datemask element', () => {
      it('should have the same font-family as input', () => {
        const datemask = spectator.element.parentNode.querySelector('.date-mask');

        const inputFontFamily = TestHelper.getCssProperty(spectator.element, 'font-family');
        const datemaskFontFamily = TestHelper.getCssProperty(datemask, 'font-family');

        expect(datemaskFontFamily).toEqual(inputFontFamily);
      });

      it('should have the same font-size as input', () => {
        const datemask = spectator.element.parentNode.querySelector('.date-mask');

        const inputFontSize = TestHelper.getCssProperty(spectator.element, 'font-size');
        const datemaskFontSize = TestHelper.getCssProperty(datemask, 'font-size');

        expect(datemaskFontSize).toEqual(inputFontSize);
      });

      it('should have the same line-height as input', () => {
        const datemask = spectator.element.parentNode.querySelector('.date-mask');

        const inputLineHeight = TestHelper.getCssProperty(spectator.element, 'line-height');
        const datemaskLineHeight = TestHelper.getCssProperty(datemask, 'line-height');

        expect(datemaskLineHeight).toEqual(inputLineHeight);
      });

      it('should have same padding as input padding', () => {
        const datemask = spectator.element.parentNode.querySelector('.date-mask');

        const inputPadding = TestHelper.getCssProperty(spectator.element, 'padding');
        const datemaskPadding = TestHelper.getCssProperty(datemask, 'padding');

        expect(datemaskPadding).toEqual(inputPadding);
      });
    });
  });

  describe('when configured with value', () => {
    beforeEach(() => {
      spectator = createDirective(`<input kirby-input type="date" value="01-01-2024" />`);
    });

    it('should have date-mask placeholder', () => {
      // @ts-ignore
      expect(spectator.element.placeholder).toEqual('mm/dd/yyyy');
    });

    it('should have initial date-mask value', () => {
      // @ts-ignore
      expect(spectator.element.value).toEqual('01/01/2024');
    });
  });

  describe('when configured with prefillYear', () => {
    beforeEach(() => {
      spectator = createDirective(`<input kirby-input type="date" [prefillYear]="true" />`);
    });

    it('should prefill year with current year when configured', () => {
      spectator.typeInElement('10/04/20', spectator.element);

      const currentYear = new Date().getFullYear();
      expect(spectator.element).toHaveValue(`10/04/${currentYear}`);
    });
  });

  describe('when configured with [useNativeDatePicker]="true"', () => {
    beforeEach(() => {
      spectator = createDirective(`<input kirby-input type="date" [useNativeDatePicker]="true" />`);
    });

    it('should leave type="date" untouched', () => {
      expect((spectator.element as HTMLInputElement).type).toBe('date');
    });

    it('should not have date-mask element', () => {
      const datemask = spectator.element.parentNode.querySelector('.date-mask');
      expect(datemask).toBeNull();
    });
  });

  describe('when configured with [useNativeDatePicker]="false"', () => {
    // Should produce same results as the default scenario
    beforeEach(() => {
      spectator = createDirective(
        `<input kirby-input type="date" [useNativeDatePicker]="false" />`
      );
    });

    it('should have a date-mask element', () => {
      const datemask = spectator.element.parentNode.querySelector('.date-mask');
      expect(datemask).toBeDefined();
    });

    it('should replace type="date" with type="text"', () => {
      expect((spectator.element as HTMLInputElement).type).toBe('text');
    });
  });
});
