import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ActionSheetComponent } from './action-sheet.component';

const meta: Meta<ActionSheetComponent> = {
  component: ActionSheetComponent,
  title: 'ActionSheetComponent',
};
export default meta;
type Story = StoryObj<ActionSheetComponent>;

export const Primary: Story = {
  args: {
    cancelButtonText: 'Cancel',
    hideCancel: false,
    disabled: false,
    header: '',
    subheader: '',
  },
};

export const Heading: Story = {
  args: {
    cancelButtonText: 'Cancel',
    hideCancel: false,
    disabled: false,
    header: '',
    subheader: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/action-sheet works!/gi)).toBeTruthy();
  },
};
