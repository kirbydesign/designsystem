import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { InputCounterComponent } from './input-counter.component';

const meta: Meta<InputCounterComponent> = {
  component: InputCounterComponent,
  title: 'InputCounterComponent',
};
export default meta;
type Story = StoryObj<InputCounterComponent>;

export const TestGrid: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/input-counter works!/gi)).toBeTruthy();
  },
};
