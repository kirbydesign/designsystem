import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { RouterOutletComponent } from './router-outlet.component';

const meta: Meta<RouterOutletComponent> = {
  component: RouterOutletComponent,
  title: 'RouterOutletComponent',
};
export default meta;
type Story = StoryObj<RouterOutletComponent>;

export const TestGrid: Story = {
  args: {
    main: false,
  },
};

export const Heading: Story = {
  args: {
    main: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/router-outlet works!/gi)).toBeTruthy();
  },
};
