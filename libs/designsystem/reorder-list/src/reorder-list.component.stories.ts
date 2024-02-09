import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ReorderListComponent } from './reorder-list.component';

const meta: Meta<ReorderListComponent> = {
  component: ReorderListComponent,
  title: 'ReorderListComponent',
};
export default meta;
type Story = StoryObj<ReorderListComponent>;

export const Primary: Story = {
  args: {
    subItemsName: '',
  },
};

export const Heading: Story = {
  args: {
    subItemsName: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/reorder-list works!/gi)).toBeTruthy();
  },
};
