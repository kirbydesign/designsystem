import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'IconComponent',
};
export default meta;
type Story = StoryObj<IconComponent>;

export const TestGrid: Story = {
  args: {
    name: '',
    customName: '',
  },
};

export const Heading: Story = {
  args: {
    name: '',
    customName: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/icon works!/gi)).toBeTruthy();
  },
};
