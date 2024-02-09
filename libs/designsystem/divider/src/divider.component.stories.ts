import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  component: DividerComponent,
  title: 'DividerComponent',
};
export default meta;
type Story = StoryObj<DividerComponent>;

export const Primary: Story = {
  args: {
    hasMargin: false,
  },
};

export const Heading: Story = {
  args: {
    hasMargin: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/divider works!/gi)).toBeTruthy();
  },
};
