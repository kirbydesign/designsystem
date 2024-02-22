import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { LoadingOverlayComponent } from './loading-overlay.component';

const meta: Meta<LoadingOverlayComponent> = {
  component: LoadingOverlayComponent,
  title: 'LoadingOverlayComponent',
};
export default meta;
type Story = StoryObj<LoadingOverlayComponent>;

export const TestGrid: Story = {
  args: {
    isLoading: true,
    showBackdrop: true,
    hideContent: false,
  },
};

export const Heading: Story = {
  args: {
    isLoading: true,
    showBackdrop: true,
    hideContent: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/loading-overlay works!/gi)).toBeTruthy();
  },
};
