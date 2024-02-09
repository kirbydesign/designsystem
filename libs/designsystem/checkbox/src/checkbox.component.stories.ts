import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  component: CheckboxComponent,
  title: 'CheckboxComponent',
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Primary: Story = {
  args: {
    checked: false,
    attentionLevel: '2',
    text: '',
    size: 'md',
    hasError: false,
    disabled: false,
  },
};

export const Heading: Story = {
  args: {
    checked: false,
    attentionLevel: '2',
    text: '',
    size: 'md',
    hasError: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/checkbox works!/gi)).toBeTruthy();
  },
};
