import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ColorHelper } from '@kirbydesign/core';
import { applicationConfig, Preview } from '@storybook/angular';

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
  },
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom([IonicModule.forRoot({ mode: 'ios' })])],
    }),
  ],
};

export default preview;
