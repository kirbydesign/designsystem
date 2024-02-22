import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SlideButtonComponent } from './slide-button.component';

const meta: Meta<SlideButtonComponent> = {
  component: SlideButtonComponent,
  title: 'SlideButtonComponent',
};
export default meta;
type Story = StoryObj<SlideButtonComponent>;

export const TestGrid: Story = {
  args: {
    text: '',
  },
};

export const Heading: Story = {
  args: {
    text: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/slide-button works!/gi)).toBeTruthy();
  },
};
