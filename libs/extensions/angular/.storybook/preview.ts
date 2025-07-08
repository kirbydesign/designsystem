import { applicationConfig, Preview } from '@storybook/angular';
import { withThemeByClassName } from '@storybook/addon-themes';

import { setCompodocJson } from '@storybook/addon-docs/angular';
/** Zone JS is required by Angular itself. */
import 'zone.js';

import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem/config';
import { provideKirbyExtensionsLocalizationToken } from '@kirbydesign/extensions-angular/localization';

import { defaultParameters } from 'tools/storybook-config/shared-config';

import { Renderer } from 'storybook/internal/types';
import docJson from '../docs/documentation.json';

setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    ...defaultParameters,
    backgrounds: {
      disable: true,
    },
    docs: {
      canvas: { className: 'canvas' },
      toc: {
        headingSelector: 'h2, h3',
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'gray' },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideKirby(withGlobalSetup()),
        provideKirbyExtensionsLocalizationToken(() => ({
          nativeCurrency: 'DKK',
          defaultLang: 'da',
          countryCode: '+45',
          timeZone: 'Europe/Copenhagen',
        })),
      ],
    }),

    withThemeByClassName<Renderer>({
      themes: {
        light: 'light-theme',
        dark: 'dark-theme',
        canvas: 'canvas-theme light-theme',
        tertiary: 'tertiary-theme dark-theme',
      },
      defaultTheme: 'light',
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
