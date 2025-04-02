import { inject, provideAppInitializer } from '@angular/core';
import { applicationConfig, Preview } from '@storybook/angular';

import { defaultParameters } from 'tools/storybook-config/shared-config';
import { IconRegistryService } from '@kirbydesign/designsystem/icon';
import { provideKirby } from '@kirbydesign/designsystem/config';
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
        provideKirby(),
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
