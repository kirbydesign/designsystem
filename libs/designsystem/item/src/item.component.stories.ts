import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ItemComponent, ItemModule, ItemSize } from '@kirbydesign/designsystem/item';

import { RadioModule } from '@kirbydesign/designsystem/radio';
import { ItemExampleModule } from '~/app/examples/item-example/item-example.module';

const meta: Meta<ItemComponent> = {
  component: ItemComponent,
  decorators: [
    moduleMetadata({
      imports: [ItemModule, ItemExampleModule, RadioModule],
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
  argTypes: {
    size: {
      options: Object.values(ItemSize),
      control: { type: 'radio' },
    },
  },
  render: (args: ItemComponent) => ({
    props: args,
    template: `<kirby-item ${argsToTemplate(args)}>Item</kirby-item>`,
  }),
};

export const ItemWithRadioLegacySyntax: Story = {
  name: 'Item With Radio - Legacy Syntax',
  render: () => ({
    styles: [`h2 { margin-top: 32px; }`],
    template: `<h2>Extra small</h2>
<kirby-radio-group value="1">
  <kirby-item size="xs">
    <kirby-radio value="1" slot="start"></kirby-radio>
    <kirby-label>Slot start, selected</kirby-label>
  </kirby-item> 
  <kirby-item size="xs">
    <kirby-radio value="2" slot="start"></kirby-radio>
    <kirby-label>Slot start</kirby-label>
  </kirby-item> 
  <kirby-item size="xs">
    <kirby-radio value="3" slot="end"></kirby-radio>
    <kirby-label>Slot end</kirby-label>
  </kirby-item> 
</kirby-radio-group>

<h2>Small</h2>
<kirby-radio-group value="1">
  <kirby-item size="sm">
    <kirby-radio value="1" slot="start"></kirby-radio>
    <kirby-label>Slot start, selected</kirby-label>
  </kirby-item> 
  <kirby-item size="sm">
    <kirby-radio value="2" slot="start"></kirby-radio>
    <kirby-label>Slot start</kirby-label>
  </kirby-item> 
  <kirby-item size="sm">
    <kirby-radio value="3" slot="end"></kirby-radio>
    <kirby-label>Slot end</kirby-label>
  </kirby-item> 
</kirby-radio-group>

<h2>Medium</h2>
<kirby-radio-group value="1">
  <kirby-item size="md">
    <kirby-radio value="1" slot="start"></kirby-radio>
    <kirby-label>Slot start, selected</kirby-label>
  </kirby-item> 
  <kirby-item size="md">
    <kirby-radio value="2" slot="start"></kirby-radio>
    <kirby-label>Slot start</kirby-label>
  </kirby-item> 
  <kirby-item size="md">
    <kirby-radio value="3" slot="end"></kirby-radio>
    <kirby-label>Slot end</kirby-label>
  </kirby-item>  
</kirby-radio-group>`,
  }),
};

export const ItemWithRadioModernSyntax: Story = {
  name: 'Item With Radio - Modern Syntax',
  render: () => ({
    styles: [`h2 { margin-top: 32px; }`],
    template: `<h2>Extra small</h2>
<kirby-radio-group value="1">
  <kirby-item size="xs">
    <kirby-radio value="1" slot="start"></kirby-radio>
    <kirby-label>Slot start, selected</kirby-label>
  </kirby-item>
  <kirby-item size="xs">
    <kirby-radio value="2" slot="start"></kirby-radio>
    <kirby-label>Slot start</kirby-label>
  </kirby-item>
  <kirby-item size="xs">
    <kirby-radio value="3" slot="end"></kirby-radio>
    <kirby-label>Slot end</kirby-label>
  </kirby-item>
  <kirby-item size="xs">
    <kirby-radio value="4" slot="start"></kirby-radio>
    <kirby-label>No slot</kirby-label>
  </kirby-item>
</kirby-radio-group>

<h2>Small</h2>
<kirby-radio-group value="1">
  <kirby-item size="sm">
    <kirby-radio value="1" slot="start"></kirby-radio>
    <kirby-label>Slot start, selected</kirby-label>
  </kirby-item>
  <kirby-item size="sm">
    <kirby-radio value="2" slot="start"></kirby-radio>
    <kirby-label>Slot start</kirby-label>
  </kirby-item>
  <kirby-item size="sm">
    <kirby-radio value="3" slot="end"></kirby-radio>
    <kirby-label>Slot end</kirby-label>
  </kirby-item>
  <kirby-item size="sm">
    <kirby-radio value="4" slot="start"></kirby-radio>
    <kirby-label>No slot</kirby-label>
  </kirby-item>
</kirby-radio-group>

<h2>Medium</h2>
<kirby-radio-group value="1">
  <kirby-item size="md">
    <kirby-radio value="1" slot="start"></kirby-radio>
    <kirby-label>Slot start, selected</kirby-label>
  </kirby-item>
  <kirby-item size="md">
    <kirby-radio value="2" slot="start"></kirby-radio>
    <kirby-label>Slot start</kirby-label>
  </kirby-item>
  <kirby-item size="md">
    <kirby-radio value="3" slot="end"></kirby-radio>
    <kirby-label>Slot end</kirby-label>
  </kirby-item>
  <kirby-item size="md">
    <kirby-radio value="4" slot="start"></kirby-radio>
    <kirby-label>No slot</kirby-label>
  </kirby-item>
</kirby-radio-group>`,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-item-example></cookbook-item-example>`,
  }),
};
