import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { RangeComponent } from './range.component';

const meta: Meta<RangeComponent> = {
  component: RangeComponent,
  title: 'RangeComponent',
};
export default meta;
type Story = StoryObj<RangeComponent>;

export const TestGrid: Story = {
  args: {
    minLabel: '',
    maxLabel: '',
    debounce: 0,
    max: 0,
    min: 0,
    pin: false,
    step: 1,
    ticks: false,
    disabled: false,
    // pinFormatter: this.defaultPinFormatter,
    // value: '',
  },
};

export const Heading: Story = {
  args: {
    minLabel: '',
    maxLabel: '',
    debounce: 0,
    max: 0,
    min: 0,
    pin: false,
    step: 1,
    ticks: false,
    disabled: false,
    // pinFormatter: this.defaultPinFormatter,
    // value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/range works!/gi)).toBeTruthy();
  },
};
