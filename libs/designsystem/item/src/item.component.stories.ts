import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { ItemComponent, ItemSize } from './item.component';

const meta: Meta<ItemComponent> = {
  component: ItemComponent,
  title: 'ItemComponent',
};
export default meta;
type Story = StoryObj<ItemComponent>;

export const Default: Story = {
  args: {
    disabled: false,
    selected: false,
    selectable: false,
    reorderable: false,
    size: ItemSize.MD,
    rotateIcon: false,
  },
  render: (args: ItemComponent) => ({
    props: args,
    template: `<kirby-item ${argsToTemplate(args)}>Item</kirby-item>`,
  }),
};
