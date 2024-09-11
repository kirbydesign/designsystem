import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';

import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { sharedParameters } from '../../../../tools/storybook-config/shared-parameters';

import docJson from '../docs/documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    ...sharedParameters,
    docs: {
      canvas: { className: 'canvas' },
      toc: {
        headingSelector: 'h2, h3',
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
