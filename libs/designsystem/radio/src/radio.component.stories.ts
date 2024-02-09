import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { RadioComponent } from './radio.component';

const meta: Meta<RadioComponent> = {
  component: RadioComponent,
  title: 'RadioComponent',
};
export default meta;
type Story = StoryObj<RadioComponent>;

export const Primary: Story = {
  args: {
    text: '',
    size: 'md',
    disabled: false,
  },
};

export const Heading: Story = {
  args: {
    text: '',
    size: 'md',
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/radio works!/gi)).toBeTruthy();
  },
};
