// Replace your-framework with the framework you are using (e.g., react, vue3)
import { ColorHelper } from '@kirbydesign/core';
import { componentWrapperDecorator, Preview } from '@storybook/angular';

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
    componentWrapperDecorator(
      (story) => `<div style="display: flex; flex-direction: column; gap: 10px">${story}</div>`
    ),
  ],
};

export default preview;
