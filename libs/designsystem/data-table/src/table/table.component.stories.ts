import type { Meta, StoryObj } from '@storybook/angular';

import { TableComponent } from './table.component';

const meta: Meta<TableComponent> = {
  component: TableComponent,
  title: 'TableComponent',
};
export default meta;
type Story = StoryObj<TableComponent>;

export const Primary: Story = {
  args: {
    fixedLayout: false,
  },
};
