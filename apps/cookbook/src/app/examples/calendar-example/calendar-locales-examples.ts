export const moduleProviderExample = `import {registerLocaleData } from '@angular/common';
import localeData from '@angular/common/locales/en-DK';
import { LOCALE_ID, NgModule } from '@angular/core';

registerLocaleData(localeData);

@NgModule({
    ...
    providers: [
        { provide: LOCALE_ID, useValue: 'en-DK' },
    ],
    ...
})
export class AppModule {}
`;

export const componentProviderExample = `import { Component, LOCALE_ID } from '@angular/core';
import { Locale } from "@kirbydesign/designsystem";

@Component({
    ...
    providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    ...
})
export class MyComponent {}
`;

export const additionalLocalesExampleTS = `import { es, ja } from 'date-fns/locale';

@Component({
    ...
})
export class MyComponent {
    additionalLocales = { es, ja };
}
`;

export const additionalLocalesExampleHTML = `<kirby-calendar [locales]="additionalLocales"></kirby-calendar>`;

export const customLocaleExampleTS = `import { Locale } from "@kirbydesign/designsystem";

type CustomLocale = { [key: string]: Locale };

@Component({
    ...
})
export class MyComponent {
    myCostumLocale: CustomLocale = {
        myLocale: {
        code: 'myLocale',
        formatDistance: this.formatDistance,
        formatLong: this.formatLong,
        formatRelative: this.formatRelative,
        localize: this.localize,
        match: this.match,
        options: {
            weekStartsOn: 1 /* Monday */,
            firstWeekContainsDate: 4,
        },
    },

    customLocales = { myCostumLocale }
};
`;

export const customLocaleExampleHTML = `<kirby-calendar [customLocales]="customLocales"></kirby-calendar>`;
