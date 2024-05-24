import { importProvidersFrom } from '@angular/core';
import { ColorHelper } from '@kirbydesign/core';
import { applicationConfig, Preview } from '@storybook/angular';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

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
    },
    options: {
      storySort: {
        order: ['Fundamentals', 'Components'],
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
