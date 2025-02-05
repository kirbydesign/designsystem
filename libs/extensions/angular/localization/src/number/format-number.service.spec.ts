import { registerLocaleData } from '@angular/common';
import localeDa from '@angular/common/locales/da';
import { LOCALE_ID } from '@angular/core';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { FormatNumberService } from './format-number.service';

registerLocaleData(localeDa);

['da'].forEach((locale) => {
  describe(`FormatNumberService [${locale}]`, () => {
    let spectator: SpectatorService<FormatNumberService>;
    const createService = createServiceFactory({
      service: FormatNumberService,
      providers: [
        {
          provide: LOCALE_ID,
          useValue: locale,
        },
      ],
    });

    beforeEach(() => (spectator = createService()));

    describe(`formatNumber`, () => {
      it('should format date for month', () => {
        const number = 1234567.1234;

        const formattedNumber = spectator.service.formatNumber(number, '1.2-2');

        const thousandSeparator = new Intl.NumberFormat(locale).format(1000).charAt(1);
        const decimalSeparator = new Intl.NumberFormat(locale).format(0.1).charAt(1);

        const expected = `1${thousandSeparator}234${thousandSeparator}567${decimalSeparator}12`;
        expect(formattedNumber).toBe(expected);
      });
    });
  });
});

['en'].forEach((locale) => {
  describe(`FormatNumberService [${locale}]`, () => {
    let spectator: SpectatorService<FormatNumberService>;
    const createService = createServiceFactory({
      service: FormatNumberService,
      providers: [
        {
          provide: LOCALE_ID,
          useValue: 'da', //Set to 'da' while it is also hardcoded
        },
      ],
    });

    beforeEach(() => (spectator = createService()));

    describe(`formatNumber`, () => {
      it('should format date for month', () => {
        const number = 1234567.1234;

        const formattedNumber = spectator.service.formatNumber(number, '1.2-2');

        const thousandSeparator = new Intl.NumberFormat('da').format(1000).charAt(1);
        const decimalSeparator = new Intl.NumberFormat('da').format(0.1).charAt(1);

        const expected = `1${thousandSeparator}234${thousandSeparator}567${decimalSeparator}12`;
        expect(formattedNumber).toBe(expected);
      });
    });
  });
});
