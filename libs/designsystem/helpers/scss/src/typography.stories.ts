import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { FontsExampleComponent } from '~/app/examples/fonts-example/fonts-example.component';

const meta: Meta = {
  title: 'Styles / Typography',
  decorators: [
    moduleMetadata({
      imports: [FontsExampleComponent],
    }),
  ],
};
export default meta;

type Story = StoryObj;

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-fonts-example></cookbook-fonts-example>`,
  }),
};
