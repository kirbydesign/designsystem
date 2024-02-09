import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ProgressCircleRingComponent } from './progress-circle-ring.component';

const meta: Meta<ProgressCircleRingComponent> = {
  component: ProgressCircleRingComponent,
  title: 'ProgressCircleRingComponent',
};
export default meta;
type Story = StoryObj<ProgressCircleRingComponent>;

export const Primary: Story = {
  args: {
    radius: 0,
    value: 0,
    themeColor: 'success',
    strokeWidth: 0,
    upperBound: 0,
  },
};

export const Heading: Story = {
  args: {
    radius: 0,
    value: 0,
    themeColor: 'success',
    strokeWidth: 0,
    upperBound: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/progress-circle-ring works!/gi)).toBeTruthy();
  },
};
