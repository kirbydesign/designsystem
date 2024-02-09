// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/angular';

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
          value: '#f6f6f6',
        },
        {
          name: 'dark',
          value: '#353535',
        },
      ],
    },
  },
};

export default preview;
