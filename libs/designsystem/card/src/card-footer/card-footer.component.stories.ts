import type { Meta, StoryObj } from '@storybook/angular';

import { CardFooterComponent } from './card-footer.component';

const meta: Meta<CardFooterComponent> = {
  component: CardFooterComponent,
  title: 'CardFooterComponent',
};
export default meta;
type Story = StoryObj<CardFooterComponent>;

export const Primary: Story = {
  args: {
    hasPadding: true,
  },
};
