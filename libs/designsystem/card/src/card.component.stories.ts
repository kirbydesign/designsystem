import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { CardComponent } from './card.component';
import { CardHeaderComponent } from './public_api';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'CardComponent',
  decorators: [
    moduleMetadata({
      declarations: [CardHeaderComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<CardComponent>;

export const TestGrid: Story = {
  args: {
    title: '',
    subtitle: '',
    backgroundImageUrl: '',
    hasPadding: false,
    flat: false,
  },
  render: (args: CardComponent) => ({
    props: args,
    template: `
      <kirby-card ${argsToTemplate(args)}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </kirby-card>`,
  }),
};
