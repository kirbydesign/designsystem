import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ToggleComponent } from './toggle.component';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'ToggleComponent',
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const TestGrid: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Heading: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/toggle works!/gi)).toBeTruthy();
  },
};
