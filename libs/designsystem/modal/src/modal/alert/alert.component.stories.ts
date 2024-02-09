import type { Meta, StoryObj } from '@storybook/angular';

import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  component: AlertComponent,
  title: 'AlertComponent',
};
export default meta;
type Story = StoryObj<AlertComponent>;

export const Primary: Story = {
  args: {
    title: '',
    // message: '',
    iconName: '',
    okBtn: '',
    okBtnIsDestructive: false,
    cancelBtn: '',
  },
};
