// Ensure Kirby environment and web components are initialized before any stories render
import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem/config';
provideKirby(withGlobalSetup());
import { inject, provideAppInitializer } from '@angular/core';
import { applicationConfig, Preview } from '@storybook/angular';

import { defaultParameters } from 'tools/storybook-config/shared-config';
import { IconRegistryService } from '@kirbydesign/designsystem/icon';
import { provideKirby, withGlobalSetup } from '@kirbydesign/designsystem/config';
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
  initialGlobals: {
    backgrounds: { value: 'gray' },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideKirby(withGlobalSetup()),
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
