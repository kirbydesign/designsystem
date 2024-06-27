import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ItemComponent, ItemModule, ItemSize } from '@kirbydesign/designsystem/item';

import { ItemExampleModule } from '~/app/examples/item-example/item-example.module';

const meta: Meta<ItemComponent> = {
  component: ItemComponent,
  decorators: [
    moduleMetadata({
      imports: [ItemModule, ItemExampleModule],
    }),
  ],
  title: 'Components / Item',
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

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-item-example></cookbook-item-example>`,
  }),
};
