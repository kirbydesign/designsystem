import type { Meta, StoryObj } from '@storybook/angular';

import { ActionSheetComponent } from './action-sheet.component';

const meta: Meta<ActionSheetComponent> = {
  component: ActionSheetComponent,
  title: 'ActionSheetComponent',
};
export default meta;
type Story = StoryObj<ActionSheetComponent>;

export const Default: Story = {
  args: {
    header: 'Action Sheet header',
    subheader: 'Action Sheet sub-header',
    items: [
      { id: '1', text: 'Option 1' },
      { id: '2', text: 'Option 2' },
      { id: '3', text: 'Option 3' },
    ],
    cancelButtonText: 'Cancel',
    hideCancel: false,
    disabled: false,
  },
};
