import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ProgressCircleComponent } from './progress-circle.component';

const meta: Meta<ProgressCircleComponent> = {
  component: ProgressCircleComponent,
  title: 'ProgressCircleComponent',
};
export default meta;
type Story = StoryObj<ProgressCircleComponent>;

export const Primary: Story = {
  args: {
    value: 0,
    size: 'md',
    themeColor: 'success',
  },
};

export const Heading: Story = {
  args: {
    value: 0,
    size: 'md',
    themeColor: 'success',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/progress-circle works!/gi)).toBeTruthy();
  },
};
