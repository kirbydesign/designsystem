import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { FabSheetComponent } from './fab-sheet.component';

const meta: Meta<FabSheetComponent> = {
  component: FabSheetComponent,
  title: 'FabSheetComponent',
};
export default meta;
type Story = StoryObj<FabSheetComponent>;

export const Primary: Story = {
  args: {
    disabled: false,
    horizontalAlignment: 'right',
  },
};

export const Heading: Story = {
  args: {
    disabled: false,
    horizontalAlignment: 'right',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/fab-sheet works!/gi)).toBeTruthy();
  },
};
