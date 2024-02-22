import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { DropdownComponent } from './dropdown.component';
import { DropdownModule } from './dropdown.module';

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'DropdownComponent',
  decorators: [
    moduleMetadata({
      imports: [DropdownModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<DropdownComponent>;

export const TestGrid: Story = {
  argTypes: {
    selectedIndex: {
      options: ['asc', 'desc'],
      control: { type: 'radio' },
    },
    focusedIndex: {
      control: { type: 'number' },
    },
    expand: {
      control: { type: 'text' },
    },
  },
  args: {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    placeholder: 'Please select:',
    itemTextProperty: 'text',
    attentionLevel: '3',
    disabled: false,
    hasError: false,
    size: 'md',
    tabindex: 0,
    usePopover: false,
  },
  render: (args: DropdownComponent) => ({
    props: args,
    template: `<kirby-dropdown ${argsToTemplate(args)}></kirby-dropdown>`,
  }),
};
