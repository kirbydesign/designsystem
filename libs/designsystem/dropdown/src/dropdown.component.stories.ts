import type { Meta, StoryObj } from '@storybook/angular';

import { DropdownComponent } from './dropdown.component';

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'DropdownComponent',
};
export default meta;
type Story = StoryObj<DropdownComponent>;

export const Primary: Story = {
  args: {
    items: [],
    // selectedIndex: '',
    // focusedIndex: '',
    itemTextProperty: 'text',
    placeholder: 'Please select:',
    // popout: '',
    attentionLevel: '3',
    disabled: false,
    hasError: false,
    size: 'md',
    tabindex: 0,
    usePopover: false,
  },
};
