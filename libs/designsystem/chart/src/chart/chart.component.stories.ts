import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ChartComponent } from './chart.component';

const meta: Meta<ChartComponent> = {
  component: ChartComponent,
  title: 'ChartComponent',
};
export default meta;
type Story = StoryObj<ChartComponent>;

export const Primary: Story = {
  args: {
    type: 'column',
  },
};

export const Heading: Story = {
  args: {
    type: 'column',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/chart works!/gi)).toBeTruthy();
  },
};
