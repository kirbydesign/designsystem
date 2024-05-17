import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { BannerComponent } from './banner.component';

const meta: Meta<BannerComponent> = {
  component: BannerComponent,
  title: 'BannerComponent',
};
export default meta;
type Story = StoryObj<BannerComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/banner works!/gi)).toBeTruthy();
  },
};
