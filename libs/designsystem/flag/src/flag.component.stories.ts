import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FlagComponent } from './flag.component';

const meta: Meta<FlagComponent> = {
  component: FlagComponent,
  title: 'FlagComponent',
};
export default meta;
type Story = StoryObj<FlagComponent>;

export const TestGrid: Story = {
  args: {
    size: 'md',
    themeColor: 'transparent',
  },
};

export const Heading: Story = {
  args: {
    size: 'md',
    themeColor: 'transparent',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/flag works!/gi)).toBeTruthy();
  },
};
