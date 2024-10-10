import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ItemComponent, ItemModule, ItemSize } from '@kirbydesign/designsystem/item';

import { RadioModule } from '@kirbydesign/designsystem/radio';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ItemExampleModule } from '~/app/examples/item-example/item-example.module';

const meta: Meta<ItemComponent> = {
  component: ItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, ItemModule, ItemExampleModule, RadioModule],
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
  render: (args) => ({
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
  <kirby-item size="xs">
    <kirby-radio value="4" slot="start"></kirby-radio>
    <kirby-label>
      <h3>Slot start, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="xs">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio value="5" slot="end"></kirby-radio>
    <kirby-label>
      <h3>Slot end, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="xs">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio aria-label="Alternative radio label" value="6" slot="end"></kirby-radio>
    <kirby-label>
      <h3>Slot end, aria-label</h3>
      <p detail>Label</p>
    </kirby-label>
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
    <kirby-label>
      <h3>Slot start, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="sm">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio value="5" slot="end"></kirby-radio>
    <kirby-label>
      <h3>Slot end, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="sm">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio aria-label="Alternative radio label" value="6" slot="end"></kirby-radio>
    <kirby-label>
      <h3>Slot end, aria-label</h3>
      <p detail>Label</p>
    </kirby-label>
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
    <kirby-label>
      <h3>Slot start, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-item>
  <kirby-item size="md">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio value="5" slot="end"></kirby-radio>
    <kirby-label>
      <h3>Slot end, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-item>  
  <kirby-item size="md">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio aria-label="Alternative radio label" value="6" slot="end"></kirby-radio>
    <kirby-label>
      <h3>Slot end, aria-label</h3>
      <p detail>Label</p>
    </kirby-label>
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
    <kirby-radio value="1" slot="start">Slot start, selected</kirby-radio>
  </kirby-item>
  <kirby-item size="xs">
    <kirby-radio value="2" slot="start">Slot start</kirby-radio>
  </kirby-item>
  <kirby-item size="xs">
    <kirby-radio value="3" slot="end">Slot end</kirby-radio>
  </kirby-item>
  <kirby-item size="xs">
    <kirby-radio value="4">No slot</kirby-radio>
  </kirby-item>
  <kirby-item size="xs">
    <kirby-radio value="5" slot="start">
      <kirby-label>
        <h3>Slot start, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
  <kirby-item size="xs">
    <kirby-radio value="6" slot="end">
      <kirby-label>
        <h3>Slot end, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
</kirby-radio-group>

<h2>Small</h2>
<kirby-radio-group value="1">
  <kirby-item size="sm">
    <kirby-radio value="1" slot="start">Slot start, selected</kirby-radio>
  </kirby-item>
  <kirby-item size="sm">
    <kirby-radio value="2" slot="start">Slot start</kirby-radio>
  </kirby-item>
  <kirby-item size="sm">
    <kirby-radio value="3" slot="end">Slot end</kirby-radio>
  </kirby-item>
  <kirby-item size="sm">
    <kirby-radio value="4">No slot</kirby-radio>
  </kirby-item>
  <kirby-item size="sm">
    <kirby-radio value="5" slot="start">
      <kirby-label>
        <h3>Slot start, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
  <kirby-item size="sm">
    <kirby-radio value="6" slot="end">
      <kirby-label>
        <h3>Slot end, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
</kirby-radio-group>

<h2>Medium</h2>
<kirby-radio-group value="1">
  <kirby-item size="md">
    <kirby-radio value="1" slot="start">Slot start, selected</kirby-radio>
  </kirby-item>
  <kirby-item size="md">
    <kirby-radio value="2" slot="start">Slot start</kirby-radio>
  </kirby-item>
  <kirby-item size="md">
  <kirby-radio value="3" slot="end">Slot end</kirby-radio>
  </kirby-item>
  <kirby-item size="md">
    <kirby-radio value="4">No slot</kirby-radio>
  </kirby-item>
  <kirby-item size="md">
    <kirby-radio value="5" slot="start">
      <kirby-label>
        <h3>Slot start, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
  <kirby-item size="md">
    <kirby-radio value="6" slot="end">
      <kirby-label>
        <h3>Slot end, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
</kirby-radio-group>`,
  }),
};

export const ItemWithCheckboxLegacySyntax: Story = {
  name: 'Item With Checkbox - Legacy Syntax',
  render: () => ({
    styles: [`h2 { margin-top: 32px; }`],
    template: `<h2>Extra small</h2>
<kirby-item size="xs">
  <kirby-checkbox [checked]="true" slot="start"></kirby-checkbox>
  <kirby-label>Slot start, selected</kirby-label>
</kirby-item> 
<kirby-item size="xs">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>Slot start</kirby-label>
</kirby-item> 
<kirby-item size="xs">
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>Slot end</kirby-label>
</kirby-item> 
<kirby-item size="xs">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>
    <h3>Slot start, complex label</h3>
    <p detail>Label</p>
  </kirby-label>
</kirby-item> 
<kirby-item size="xs">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>
    <h3>Slot end, complex label</h3>
    <p detail>Label</p>
  </kirby-label>
</kirby-item>
<kirby-item size="xs">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox aria-label="Alternative checkbox label" slot="end"></kirby-checkbox>
  <kirby-label>
    <h3>Slot end, aria-label</h3>
  </kirby-label>
</kirby-item> 

<h2>Small</h2>
<kirby-item size="sm">
  <kirby-checkbox [checked]="true" slot="start"></kirby-checkbox>
  <kirby-label>Slot start, selected</kirby-label>
</kirby-item> 
<kirby-item size="sm">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>Slot start</kirby-label>
</kirby-item> 
<kirby-item size="sm">
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>Slot end</kirby-label>
</kirby-item> 
<kirby-item size="sm">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>
    <h3>Slot start, complex label</h3>
    <p detail>Label</p>
  </kirby-label>
</kirby-item> 
<kirby-item size="sm">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>
    <h3>Slot end, complex label</h3>
    <p detail>Label</p>
  </kirby-label>
</kirby-item> 
<kirby-item size="sm">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox aria-label="Alternative checkbox label" slot="end"></kirby-checkbox>
  <kirby-label>
    <h3>Slot end, aria-label</h3>
  </kirby-label>
</kirby-item> 


<h2>Medium</h2>
<kirby-item size="md">
  <kirby-checkbox [checked]="true" slot="start"></kirby-checkbox>
  <kirby-label>Slot start, selected</kirby-label>
</kirby-item> 
<kirby-item size="md">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>Slot start</kirby-label>
</kirby-item> 
<kirby-item size="md">
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>Slot end</kirby-label>
</kirby-item>
<kirby-item size="md">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>
    <h3>Slot start, complex label</h3>
    <p detail>Label</p>
  </kirby-label>
</kirby-item>
<kirby-item size="md">
  <data slot="end" class="kirby-text-bold">1234</data>  
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>
    <h3>Slot end, complex label</h3>
    <p detail>Label</p>
  </kirby-label>
</kirby-item>
<kirby-item size="md">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox aria-label="Alternative checkbox label" slot="end"></kirby-checkbox>
  <kirby-label>
    <h3>Slot end, aria-label</h3>
  </kirby-label>
</kirby-item> 
`,
  }),
};

export const ItemWithCheckboxModernSyntax: Story = {
  name: 'Item With Checkbox - Modern Syntax',
  render: () => ({
    styles: [`h2 { margin-top: 32px; }`],
    template: `<h2>Extra small</h2>
<kirby-item size="xs">
  <kirby-checkbox [checked]="true" slot="start">Slot start, selected</kirby-checkbox>
</kirby-item>
<kirby-item size="xs">
  <kirby-checkbox slot="start">Slot start</kirby-checkbox>
</kirby-item>
<kirby-item size="xs">
  <kirby-checkbox slot="end">Slot end</kirby-checkbox>
</kirby-item>
<kirby-item size="xs">
  <kirby-checkbox>No slot</kirby-checkbox>
</kirby-item>
<kirby-item size="xs">
  <kirby-checkbox slot="start">
    <kirby-label>
      <h3>Slot start, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>
<kirby-item size="xs">
  <kirby-checkbox slot="end">
    <kirby-label>
      <h3>Slot end, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>

<h2>Small</h2>
<kirby-item size="sm">
  <kirby-checkbox [checked]="true" slot="start">Slot start, selected</kirby-checkbox>
</kirby-item>
<kirby-item size="sm">
  <kirby-checkbox slot="start">Slot start</kirby-checkbox>
</kirby-item>
<kirby-item size="sm">
  <kirby-checkbox slot="end">Slot end</kirby-checkbox>
</kirby-item>
<kirby-item size="sm">
  <kirby-checkbox>No slot</kirby-checkbox>
</kirby-item>
<kirby-item size="sm">
  <kirby-checkbox slot="start">
    <kirby-label>
      <h3>Slot start, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>
<kirby-item size="sm">
  <kirby-checkbox slot="end">
    <kirby-label>
      <h3>Slot end, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>

<h2>Medium</h2>
<kirby-item size="md">
  <kirby-checkbox [checked]="true" slot="start">Slot start, selected</kirby-checkbox>
</kirby-item>
<kirby-item size="md">
  <kirby-checkbox slot="start">Slot start</kirby-checkbox>
</kirby-item>
<kirby-item size="md">
  <kirby-checkbox slot="end">Slot end</kirby-checkbox>
</kirby-item>
<kirby-item size="md">
  <kirby-checkbox>No slot</kirby-checkbox>
</kirby-item>
<kirby-item size="md">
  <kirby-checkbox slot="start">
    <kirby-label>
      <h3>Slot start, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>
<kirby-item size="md">
  <kirby-checkbox slot="end">
    <kirby-label>
      <h3>Slot end, complex label</h3>
      <p detail>Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>`,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-item-example></cookbook-item-example>`,
  }),
};
