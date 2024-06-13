import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';

import { ColorHelper } from '@kirbydesign/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

import docJson from '../docs/documentation.json';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'white',
          value: '#fff',
        },
        {
          name: 'gray',
          value: ColorHelper.getBackgroundColor(),
        },
        {
          name: 'dark',
          value: '#353535',
        },
      ],
    },
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
