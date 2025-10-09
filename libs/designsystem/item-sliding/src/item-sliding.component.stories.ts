import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ItemSlidingComponent } from '@kirbydesign/designsystem/item-sliding';

const meta: Meta<ItemSlidingComponent> = {
  component: ItemSlidingComponent,
  title: 'Components / Item / ItemSliding',
  decorators: [
    moduleMetadata({
      imports: [ItemComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ItemSlidingComponent>;

export const ItemSliding: Story = {
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
  render: (args) => ({
    props: args,
    template: `<kirby-item-sliding ${argsToTemplate(args)}>
      <kirby-item>Item Sliding</kirby-item>
    </kirby-item-sliding>`,
  }),
};
