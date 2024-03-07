import type { Meta, StoryObj } from '@storybook/angular';

import { RangeComponent } from './range.component';

const meta: Meta<RangeComponent> = {
  component: RangeComponent,
  title: 'RangeComponent',
};
export default meta;
type Story = StoryObj<RangeComponent>;

export const Default: Story = {
  args: {
    value: 0,
    step: 1,
    minLabel: '',
    maxLabel: '',
    debounce: 0,
    pin: false,
    ticks: false,
    disabled: false,
  },
  argTypes: {
    min: {
      type: 'number',
    },
    max: {
      type: 'number',
    },
  },
};
