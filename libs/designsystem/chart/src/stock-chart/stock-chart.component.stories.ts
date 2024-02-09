import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { StockChartComponent } from './stock-chart.component';

const meta: Meta<StockChartComponent> = {
  component: StockChartComponent,
  title: 'StockChartComponent',
};
export default meta;
type Story = StoryObj<StockChartComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/stock-chart works!/gi)).toBeTruthy();
  },
};
