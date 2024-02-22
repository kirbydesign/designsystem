import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ToggleButtonComponent } from './toggle-button.component';

const meta: Meta<ToggleButtonComponent> = {
  component: ToggleButtonComponent,
  title: 'ToggleButtonComponent',
};
export default meta;
type Story = StoryObj<ToggleButtonComponent>;

export const TestGrid: Story = {
  args: {
    checked: false,
  },
};

export const Heading: Story = {
  args: {
    checked: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/toggle-button works!/gi)).toBeTruthy();
  },
};
