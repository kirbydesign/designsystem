import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Preview } from '@storybook/angular';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

import { sharedParameters } from 'tools/storybook-config/shared-parameters';

const preview: Preview = {
  parameters: {
    ...sharedParameters,
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom([KirbyIonicModule])],
    }),
  ],
};

export default preview;
