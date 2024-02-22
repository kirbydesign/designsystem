import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ListComponent } from './list.component';

const meta: Meta<ListComponent> = {
  component: ListComponent,
  title: 'ListComponent',
};
export default meta;
type Story = StoryObj<ListComponent>;

export const TestGrid: Story = {
  args: {
    items: [],
    getStandAloneByProperty: '',
    standAloneSpacing: 'xxs',
    noMoreItemsText: '',
    showDivider: true,
    markSelectedRow: false,
    shape: 'rounded',
    hasItemSpacing: false,
    isLoadOnDemandEnabled: false,
    swipeActions: [],
    disableSelectionHighlight: false,
  },
};

export const Heading: Story = {
  args: {
    items: [],
    getStandAloneByProperty: '',
    standAloneSpacing: 'xxs',
    noMoreItemsText: '',
    showDivider: true,
    markSelectedRow: false,
    shape: 'rounded',
    hasItemSpacing: false,
    isLoadOnDemandEnabled: false,
    swipeActions: [],
    disableSelectionHighlight: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/list works!/gi)).toBeTruthy();
  },
};
