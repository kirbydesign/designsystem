import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ItemModule } from '@kirbydesign/designsystem/item/src';
import { ItemSlidingComponent } from './item-sliding.component';

const meta: Meta<ItemSlidingComponent> = {
  component: ItemSlidingComponent,
  title: 'ItemSlidingComponent',
  decorators: [
    moduleMetadata({
      imports: [ItemModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<ItemSlidingComponent>;

export const Default: Story = {
  args: {
    side: 'left',
    swipeActions: [
      {
        title: 'edit',
        type: 'success',
        onSelected: () => {},
      },
      {
        title: 'archive',
        type: 'warning',
        onSelected: () => {},
      },
      {
        title: 'delete',
        icon: 'trash',
        onSelected: () => {},
        type: 'danger',
      },
    ],
  },
  render: (args: ItemSlidingComponent) => ({
    props: args,
    template: `<kirby-item-sliding ${argsToTemplate(args)}>
      <kirby-item>Item Sliding</kirby-item>
    </kirby-item-sliding>`,
  }),
};
