import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ListItemComponent } from './list-item.component';

const meta: Meta<ListItemComponent> = {
  component: ListItemComponent,
  title: 'ListItemComponent',
};
export default meta;
type Story = StoryObj<ListItemComponent>;

export const Primary: Story = {
  args: {
    swipeActions: [],
    isSelected: false,
    isSelectable: false,
  },
};

export const Heading: Story = {
  args: {
    swipeActions: [],
    isSelected: false,
    isSelectable: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list-item works!/gi)).toBeTruthy();
  },
};
