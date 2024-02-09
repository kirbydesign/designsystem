import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { HeaderComponent } from './header.component';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  title: 'HeaderComponent',
};
export default meta;
type Story = StoryObj<HeaderComponent>;

export const Primary: Story = {
  args: {
    centered: false,
    titleMaxLines: 0,
    emphasizeActions: false,
    hasInteractiveTitle: false,
  },
};

export const Heading: Story = {
  args: {
    centered: false,
    titleMaxLines: 0,
    emphasizeActions: false,
    hasInteractiveTitle: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/header works!/gi)).toBeTruthy();
  },
};
