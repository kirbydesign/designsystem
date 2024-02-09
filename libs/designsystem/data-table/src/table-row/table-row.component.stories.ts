import type { Meta, StoryObj } from '@storybook/angular';

import { TableRowComponent } from './table-row.component';

const meta: Meta<TableRowComponent> = {
  component: TableRowComponent,
  title: 'TableRowComponent',
};
export default meta;
type Story = StoryObj<TableRowComponent>;

export const Primary: Story = {
  args: {
    selectable: false,
  },
};
