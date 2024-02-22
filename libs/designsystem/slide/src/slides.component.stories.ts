import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SlidesComponent } from './slides.component';

const meta: Meta<SlidesComponent> = {
  component: SlidesComponent,
  title: 'SlidesComponent',
};
export default meta;
type Story = StoryObj<SlidesComponent>;

export const TestGrid: Story = {
  args: {
    title: '',
    showNavigation: true,
  },
};

export const Heading: Story = {
  args: {
    title: '',
    showNavigation: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/slides works!/gi)).toBeTruthy();
  },
};
