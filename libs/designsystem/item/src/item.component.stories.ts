import type { Meta, StoryObj } from '@storybook/angular';

import { ItemComponent, ItemSize } from './item.component';

const meta: Meta<ItemComponent> = {
  component: ItemComponent,
  title: 'ItemComponent',
};
export default meta;
type Story = StoryObj<ItemComponent>;

export const Primary: Story = {
  args: {
    disabled: false,
    selected: false,
    selectable: false,
    reorderable: false,
    size: ItemSize.MD,
    rotateIcon: false,
  },
};
