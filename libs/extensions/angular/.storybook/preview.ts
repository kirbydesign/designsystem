import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';

import { provideKirby } from '@kirbydesign/designsystem/kirby-ionic-module';
import { provideKirbyExtensionsLocalizationToken } from '@kirbydesign/extensions-angular/localization';

import { defaultParameters } from 'tools/storybook-config/shared-config';

import docJson from '../docs/documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    ...defaultParameters,
    docs: {
      canvas: { className: 'canvas' },
      toc: {
        headingSelector: 'h2, h3',
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideKirby(),
        provideKirbyExtensionsLocalizationToken(() => ({
          nativeCurrency: 'DKK',
          defaultLang: 'da',
          countryCode: '+45',
          timeZone: 'Europe/Copenhagen',
        })),
      ],
    }),
  ],
};

export default preview;
