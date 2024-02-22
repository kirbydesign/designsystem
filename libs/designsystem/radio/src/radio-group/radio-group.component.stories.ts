import type { Meta, StoryObj } from '@storybook/angular';

import { RadioGroupComponent } from './radio-group.component';

const meta: Meta<RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'RadioGroupComponent',
};
export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const TestGrid: Story = {
  args: {
    // disabled: '',
    hasError: false,
    // items: '',
    itemTextProperty: 'text',
    itemDisabledProperty: 'disabled',
    // selectedIndex: '',
    value: '',
  },
};
