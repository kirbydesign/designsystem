// Replace your-framework with the framework you are using (e.g., react, vue3)
import { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'white',
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
          value: '#f6f6f6',
        },
      ],
    },
  },
};

export default preview;
