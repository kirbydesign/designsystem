import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Preview } from '@storybook/angular';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { defaultParameters } from 'tools/storybook-config/shared-config';

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
      providers: [importProvidersFrom([KirbyIonicModule])],
    }),
  ],
};

export default preview;
