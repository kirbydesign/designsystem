import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TableSortableComponent } from './sortable.component';

const meta: Meta<TableSortableComponent> = {
  component: TableSortableComponent,
  title: 'TableSortableComponent',
};
export default meta;
type Story = StoryObj<TableSortableComponent>;

export const Primary: Story = {
  args: {
    sortable: false,
    active: false,
    sortDirection: 'asc',
    iconAlignment: 'end',
    alignment: 'start',
  },
};

export const Heading: Story = {
  args: {
    sortable: false,
    active: false,
    sortDirection: 'asc',
    iconAlignment: 'end',
    alignment: 'start',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/sortable works!/gi)).toBeTruthy();
  },
};
