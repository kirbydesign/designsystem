import type { Meta, StoryObj } from '@storybook/angular';

import { ItemSlidingComponent } from './item-sliding.component';

const meta: Meta<ItemSlidingComponent> = {
  component: ItemSlidingComponent,
  title: 'ItemSlidingComponent',
};
export default meta;
type Story = StoryObj<ItemSlidingComponent>;

export const Primary: Story = {
  args: {
    // side: '',
  },
};
