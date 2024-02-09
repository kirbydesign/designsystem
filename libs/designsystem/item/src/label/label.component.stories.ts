import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { LabelComponent } from './label.component';

const meta: Meta<LabelComponent> = {
  component: LabelComponent,
  title: 'LabelComponent',
};
export default meta;
type Story = StoryObj<LabelComponent>;

export const Primary: Story = {
  args: {
    direction: 'vertical',
  },
};

export const Heading: Story = {
  args: {
    direction: 'vertical',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/label works!/gi)).toBeTruthy();
  },
};
