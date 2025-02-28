import { importProvidersFrom, inject, provideAppInitializer } from '@angular/core';
import { applicationConfig, Preview } from '@storybook/angular';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { defaultParameters } from 'tools/storybook-config/shared-config';
import { IconRegistryService } from '@kirbydesign/designsystem/icon';
/** Zone JS is required by Angular itself. */
import 'zone.js';

const preview: Preview = {
  parameters: {
    ...defaultParameters,
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom([KirbyIonicModule]),
        provideAppInitializer(() => {
          const iconRegistry = inject(IconRegistryService);
          iconRegistry.addIcons([
            {
              name: 'football',
              svg: 'assets/icons/football.svg',
            },
            {
              name: 'umbrella',
              svg: 'assets/icons/umbrella.svg',
            },
          ]);
        }),
      ],
    }),
  ],
};

export default preview;
