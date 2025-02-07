import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ItemComponent, ItemModule, ItemSize } from '@kirbydesign/designsystem/item';

import { RadioModule } from '@kirbydesign/designsystem/radio';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { ItemExampleComponent } from '~/app/examples/item-example/item-example.component';

const meta: Meta<ItemComponent> = {
  component: ItemComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxComponent, ItemModule, RadioModule, ToggleComponent, ItemExampleComponent],
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
      <p class="kirby-item-title">Slot start, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="xs">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio value="5" slot="end"></kirby-radio>
    <kirby-label>
      <p class="kirby-item-title">Slot end, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="xs">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio aria-label="Alternative radio label" value="6" slot="end"></kirby-radio>
    <kirby-label>
      <p class="kirby-item-title">Slot end, aria-label</p>
      <p class="kirby-item-detail">Label</p>
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
      <p class="kirby-item-title">Slot start, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="sm">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio value="5" slot="end"></kirby-radio>
    <kirby-label>
      <p class="kirby-item-title">Slot end, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-item> 
  <kirby-item size="sm">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio aria-label="Alternative radio label" value="6" slot="end"></kirby-radio>
    <kirby-label>
      <p class="kirby-item-title">Slot end, aria-label</p>
      <p class="kirby-item-detail">Label</p>
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
      <p class="kirby-item-title">Slot start, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-item>
  <kirby-item size="md">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio value="5" slot="end"></kirby-radio>
    <kirby-label>
      <p class="kirby-item-title">Slot end, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-item>  
  <kirby-item size="md">
    <data slot="end" class="kirby-text-bold">1234</data>
    <kirby-radio aria-label="Alternative radio label" value="6" slot="end"></kirby-radio>
    <kirby-label>
      <p class="kirby-item-title">Slot end, aria-label</p>
      <p class="kirby-item-detail">Label</p>
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
        <p class="kirby-item-title">Slot start, complex label</p>
        <p class="kirby-item-detail">Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
  <kirby-item size="xs">
    <kirby-radio value="6" slot="end">
      <kirby-label>
        <p class="kirby-item-title">Slot end, complex label</p>
        <p class="kirby-item-detail">Label</p>
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
        <p class="kirby-item-title">Slot start, complex label</p>
        <p class="kirby-item-detail">Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
  <kirby-item size="sm">
    <kirby-radio value="6" slot="end">
      <kirby-label>
        <p class="kirby-item-title">Slot end, complex label</p>
        <p class="kirby-item-detail">Label</p>
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
        <p class="kirby-item-title">Slot start, complex label</p>
        <p class="kirby-item-detail">Label</p>
      </kirby-label>
    </kirby-radio>
  </kirby-item> 
  <kirby-item size="md">
    <kirby-radio value="6" slot="end">
      <kirby-label>
        <p class="kirby-item-title">Slot end, complex label</p>
        <p class="kirby-item-detail">Label</p>
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
    <p class="kirby-item-title">Slot start, complex label</p>
    <p class="kirby-item-detail">Label</p>
  </kirby-label>
</kirby-item> 
<kirby-item size="xs">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Slot end, complex label</p>
    <p class="kirby-item-detail">Label</p>
  </kirby-label>
</kirby-item>
<kirby-item size="xs">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox aria-label="Alternative checkbox label" slot="end"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Slot end, aria-label</p>
    <p class="kirby-item-detail">Label</p>
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
    <p class="kirby-item-title">Slot start, complex label</p>
    <p class="kirby-item-detail">Label</p>
  </kirby-label>
</kirby-item> 
<kirby-item size="sm">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Slot end, complex label</p>
    <p class="kirby-item-detail">Label</p>
  </kirby-label>
</kirby-item> 
<kirby-item size="sm">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox aria-label="Alternative checkbox label" slot="end"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Slot end, aria-label</p>
    <p class="kirby-item-detail">Label</p>
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
    <p class="kirby-item-title">Slot start, complex label</p>
    <p class="kirby-item-detail">Label</p>
  </kirby-label>
</kirby-item>
<kirby-item size="md">
  <data slot="end" class="kirby-text-bold">1234</data>  
  <kirby-checkbox slot="end"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Slot end, complex label</p>
    <p class="kirby-item-detail">Label</p>
  </kirby-label>
</kirby-item>
<kirby-item size="md">
  <data slot="end" class="kirby-text-bold">1234</data>
  <kirby-checkbox aria-label="Alternative checkbox label" slot="end"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Slot end, aria-label</p>
    <p class="kirby-item-detail">Label</p>
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
      <p class="kirby-item-title">Slot start, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>
<kirby-item size="xs">
  <kirby-checkbox slot="end">
    <kirby-label>
      <p class="kirby-item-title">Slot end, complex label</p>
      <p class="kirby-item-detail">Label</p>
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
      <p class="kirby-item-title">Slot start, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>
<kirby-item size="sm">
  <kirby-checkbox slot="end">
    <kirby-label>
      <p class="kirby-item-title">Slot end, complex label</p>
      <p class="kirby-item-detail">Label</p>
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
      <p class="kirby-item-title">Slot start, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>
<kirby-item size="md">
  <kirby-checkbox slot="end">
    <kirby-label>
      <p class="kirby-item-title">Slot end, complex label</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>`,
  }),
};

export const ItemWithToggleLegacySyntax: Story = {
  name: 'Item With Toggle - Legacy Syntax',
  render: () => ({
    styles: [`h2 { margin-top: 32px; }`],
    template: `<h2>Extra small</h2>
    <kirby-item size="xs">
      <kirby-toggle [checked]="true" slot="start"></kirby-toggle>
      <kirby-label>Slot start, selected</kirby-label>
    </kirby-item> 
    <kirby-item size="xs">
      <kirby-toggle slot="start"></kirby-toggle>
      <kirby-label>Slot start</kirby-label>
    </kirby-item> 
    <kirby-item size="xs">
      <kirby-toggle slot="end"></kirby-toggle>
      <kirby-label>Slot end</kirby-label>
    </kirby-item> 
    <kirby-item size="xs">
      <kirby-toggle slot="start"></kirby-toggle>
      <kirby-label>
        <h3>Slot start, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item> 
    <kirby-item size="xs">
      <data slot="end" class="kirby-text-bold">1234</data>
      <kirby-toggle slot="end"></kirby-toggle>
      <kirby-label>
        <h3>Slot end, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item>
    <kirby-item size="xs">
      <data slot="end" class="kirby-text-bold">1234</data>
      <kirby-toggle aria-label="Alternative toggle label" slot="end"></kirby-toggle>
      <kirby-label>
        <h3>Slot end, aria-label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item> 
    
    <h2>Small</h2>
    <kirby-item size="sm">
      <kirby-toggle [checked]="true" slot="start"></kirby-toggle>
      <kirby-label>Slot start, selected</kirby-label>
    </kirby-item> 
    <kirby-item size="sm">
      <kirby-toggle slot="start"></kirby-toggle>
      <kirby-label>Slot start</kirby-label>
    </kirby-item> 
    <kirby-item size="sm">
      <kirby-toggle slot="end"></kirby-toggle>
      <kirby-label>Slot end</kirby-label>
    </kirby-item> 
    <kirby-item size="sm">
      <kirby-toggle slot="start"></kirby-toggle>
      <kirby-label>
        <h3>Slot start, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item> 
    <kirby-item size="sm">
      <data slot="end" class="kirby-text-bold">1234</data>
      <kirby-toggle slot="end"></kirby-toggle>
      <kirby-label>
        <h3>Slot end, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item> 
    <kirby-item size="sm">
      <data slot="end" class="kirby-text-bold">1234</data>
      <kirby-toggle aria-label="Alternative toggle label" slot="end"></kirby-toggle>
      <kirby-label>
        <h3>Slot end, aria-label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item> 
    
    
    <h2>Medium</h2>
    <kirby-item size="md">
      <kirby-toggle [checked]="true" slot="start"></kirby-toggle>
      <kirby-label>Slot start, selected</kirby-label>
    </kirby-item> 
    <kirby-item size="md">
      <kirby-toggle slot="start"></kirby-toggle>
      <kirby-label>Slot start</kirby-label>
    </kirby-item> 
    <kirby-item size="md">
      <kirby-toggle slot="end"></kirby-toggle>
      <kirby-label>Slot end</kirby-label>
    </kirby-item>
    <kirby-item size="md">
      <kirby-toggle slot="start"></kirby-toggle>
      <kirby-label>
        <h3>Slot start, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item>
    <kirby-item size="md">
      <data slot="end" class="kirby-text-bold">1234</data>  
      <kirby-toggle slot="end"></kirby-toggle>
      <kirby-label>
        <h3>Slot end, complex label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item>
    <kirby-item size="md">
      <data slot="end" class="kirby-text-bold">1234</data>
      <kirby-toggle aria-label="Alternative toggle label" slot="end"></kirby-toggle>
      <kirby-label>
        <h3>Slot end, aria-label</h3>
        <p detail>Label</p>
      </kirby-label>
    </kirby-item> 
    `,
  }),
};

export const ItemWithToggleModernSyntax: Story = {
  name: 'Item With Toggle - Modern Syntax',
  render: () => ({
    styles: [`h2 { margin-top: 32px; }`],
    template: `<h2>Extra small</h2>
    <kirby-item size="xs">
      <kirby-toggle [checked]="true" slot="start">Slot start, selected</kirby-toggle>
    </kirby-item>
    <kirby-item size="xs">
      <kirby-toggle slot="start">Slot start</kirby-toggle>
    </kirby-item>
    <kirby-item size="xs">
      <kirby-toggle slot="end">Slot end</kirby-toggle>
    </kirby-item>
    <kirby-item size="xs">
      <kirby-toggle>No slot</kirby-toggle>
    </kirby-item>
    <kirby-item size="xs">
      <kirby-toggle slot="start">
        <kirby-label>
          <p class="kirby-item-title">Slot start, complex label</p>
          <p class="kirby-item-detail">Label</p>
        </kirby-label>
      </kirby-toggle>
    </kirby-item>
    <kirby-item size="xs">
      <kirby-toggle slot="end">
        <kirby-label>
          <p class="kirby-item-title">Slot end, complex label</p>
          <p class="kirby-item-detail">Label</p>
        </kirby-label>
      </kirby-toggle>
    </kirby-item>
    
    <h2>Small</h2>
    <kirby-item size="sm">
      <kirby-toggle [checked]="true" slot="start">Slot start, selected</kirby-toggle>
    </kirby-item>
    <kirby-item size="sm">
      <kirby-toggle slot="start">Slot start</kirby-toggle>
    </kirby-item>
    <kirby-item size="sm">
      <kirby-toggle slot="end">Slot end</kirby-toggle>
    </kirby-item>
    <kirby-item size="sm">
      <kirby-toggle>No slot</kirby-toggle>
    </kirby-item>
    <kirby-item size="sm">
      <kirby-toggle slot="start">
        <kirby-label>
          <p class="kirby-item-title">Slot start, complex label</p>
          <p class="kirby-item-detail">Label</p>
        </kirby-label>
      </kirby-toggle>
    </kirby-item>
    <kirby-item size="sm">
      <kirby-toggle slot="end">
        <kirby-label>
          <p class="kirby-item-title">Slot end, complex label</p>
          <p class="kirby-item-detail">Label</p>
        </kirby-label>
      </kirby-toggle>
    </kirby-item>
    
    <h2>Medium</h2>
    <kirby-item size="md">
      <kirby-toggle [checked]="true" slot="start">Slot start, selected</kirby-toggle>
    </kirby-item>
    <kirby-item size="md">
      <kirby-toggle slot="start">Slot start</kirby-toggle>
    </kirby-item>
    <kirby-item size="md">
      <kirby-toggle slot="end">Slot end</kirby-toggle>
    </kirby-item>
    <kirby-item size="md">
      <kirby-toggle>No slot</kirby-toggle>
    </kirby-item>
    <kirby-item size="md">
      <kirby-toggle slot="start">
        <kirby-label>
          <p class="kirby-item-title">Slot start, complex label</p>
          <p class="kirby-item-detail">Label</p>
        </kirby-label>
      </kirby-toggle>
    </kirby-item>
    <kirby-item size="md">
      <kirby-toggle slot="end">
        <kirby-label>
          <p class="kirby-item-title">Slot end, complex label</p>
          <p class="kirby-item-detail">Label</p>
        </kirby-label>
      </kirby-toggle>
    </kirby-item>`,
  }),
};

export const Typography: Story = {
  render: () => ({
    template: `<kirby-item><h1>Heading H1<br />Second line</h1></kirby-item>
<kirby-item><h2>Heading H2<br />Second line</h2></kirby-item>
<kirby-item><h3>Heading H3<br />Second line</h3></kirby-item>
<kirby-item><h4>Heading H4<br />Second line</h4></kirby-item>
<kirby-item><h5>Heading H5<br />Second line</h5></kirby-item>
<kirby-item><h6>Heading H6<br />Second line</h6></kirby-item>
<kirby-item><p class="kirby-item-title">Paragraph Title<br />Second line</p></kirby-item>
<kirby-item><data>Data<br />Second line</data></kirby-item>
<kirby-item><p>Paragraph<br />Second line</p></kirby-item>
<kirby-item><data class="kirby-item-subtitle">Data subtitle<br />Second line</data></kirby-item>
<kirby-item><p class="kirby-item-subtitle">Paragraph subtitle<br />Second line</p></kirby-item>
<kirby-item><data class="kirby-item-detail">Data detail<br />Second line</data></kirby-item>
<kirby-item><p class="kirby-item-detail">Paragraph detail<br />Second line</p></kirby-item>`,
  }),
};

export const LabelTypography: Story = {
  render: () => ({
    template: `<kirby-item><kirby-label><h1>Heading H1<br />Second line</h1></kirby-label></kirby-item>
<kirby-item><kirby-label><h2>Heading H2<br />Second line</h2></kirby-label></kirby-item>
<kirby-item><kirby-label><h3>Heading H3<br />Second line</h3></kirby-label></kirby-item>
<kirby-item><kirby-label><h4>Heading H4<br />Second line</h4></kirby-label></kirby-item>
<kirby-item><kirby-label><h5>Heading H5<br />Second line</h5></kirby-label></kirby-item>
<kirby-item><kirby-label><h6>Heading H6<br />Second line</h6></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-item-title">Paragraph Title<br />Second line</p></kirby-label></kirby-item>
<kirby-item><kirby-label><data>Data<br />Second line</data></kirby-label></kirby-item>
<kirby-item><kirby-label><p>Paragraph<br />Second line</p></kirby-label></kirby-item>
<kirby-item><kirby-label><data class="kirby-item-subtitle">Data subtitle<br />Second line</data></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-item-subtitle">Paragraph subtitle<br />Second line</p></kirby-label></kirby-item>
<kirby-item><kirby-label><data class="kirby-item-detail">Data detail<br />Second line</data></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-item-detail">Paragraph detail<br />Second line</p></kirby-label></kirby-item>`,
  }),
};

export const TypographyOverride: Story = {
  render: () => ({
    template: `<kirby-item><h1 class="kirby-text-bold">Heading H1</h1></kirby-item>
<kirby-item><h2 class="kirby-text-bold">Heading H2</h2></kirby-item>
<kirby-item><h3 class="kirby-text-bold">Heading H3</h3></kirby-item>
<kirby-item><h4 class="kirby-text-bold">Heading H4</h4></kirby-item>
<kirby-item><h5 class="kirby-text-bold">Heading H5</h5></kirby-item>
<kirby-item><h6 class="kirby-text-bold">Heading H6</h6></kirby-item>
<kirby-item><p class="kirby-text-display-1">Display 1</p></kirby-item>
<kirby-item><p class="kirby-text-display-2">Display 2</p></kirby-item>
<kirby-item><p class="kirby-text-display-3">Display 3</p></kirby-item>
<kirby-item><p class="kirby-text-xlarge">kirby-text-xlarge</p></kirby-item>
<kirby-item><p class="kirby-text-large">kirby-text-large</p></kirby-item>
<kirby-item><p class="kirby-text-medium">kirby-text-medium</p></kirby-item>
<kirby-item><p class="kirby-text-normal-bold">kirby-text-normal-bold</p></kirby-item>
<kirby-item><h1 class="kirby-text-normal">kirby-text-normal</h1></kirby-item>
<kirby-item><p class="kirby-text-small">kirby-text-small</p></kirby-item>
<kirby-item><p class="kirby-text-small-light">kirby-text-small-light</p></kirby-item>
<kirby-item><p class="kirby-text-xsmall">kirby-text-xsmall</p></kirby-item>
<kirby-item><p class="kirby-text-xxsmall">kirby-text-xxsmall</p></kirby-item>
`,
  }),
};

export const LabelTypographyOverride: Story = {
  render: () => ({
    template: `<kirby-item><kirby-label><h1 class="kirby-text-bold">Heading H1</h1></kirby-label></kirby-item>
<kirby-item><kirby-label><h2 class="kirby-text-bold">Heading H2</h2></kirby-label></kirby-item>
<kirby-item><kirby-label><h3 class="kirby-text-bold">Heading H3</h3></kirby-label></kirby-item>
<kirby-item><kirby-label><h4 class="kirby-text-bold">Heading H4</h4></kirby-label></kirby-item>
<kirby-item><kirby-label><h5 class="kirby-text-bold">Heading H5</h5></kirby-label></kirby-item>
<kirby-item><kirby-label><h6 class="kirby-text-bold">Heading H6</h6></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-display-1">Display 1</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-display-2">Display 2</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-display-3">Display 3</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-xlarge">kirby-text-xlarge</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-large">kirby-text-large</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-medium">kirby-text-medium</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-normal-bold">kirby-text-normal-bold</p></kirby-label></kirby-item>
<kirby-item><kirby-label><h1 class="kirby-text-normal">kirby-text-normal</h1></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-small">kirby-text-small</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-small-light">kirby-text-small-light</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-xsmall">kirby-text-xsmall</p></kirby-label></kirby-item>
<kirby-item><kirby-label><p class="kirby-text-xxsmall">kirby-text-xxsmall</p></kirby-label></kirby-item>
`,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-item-example></cookbook-item-example>`,
  }),
};
