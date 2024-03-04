import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';

import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'CardComponent',
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
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
