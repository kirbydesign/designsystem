import type { Meta, StoryObj } from '@storybook/angular';

import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'CardComponent',
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Primary: Story = {
  args: {
    title: 'Default',
    subtitle: '',
    backgroundImageUrl: '',
    hasPadding: false,
    flat: false,
  },
};
