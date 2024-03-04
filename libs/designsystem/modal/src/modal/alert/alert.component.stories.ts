import type { Meta, StoryObj } from '@storybook/angular';

import { Observable } from 'rxjs';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  component: AlertComponent,
  title: 'AlertComponent',
};
export default meta;
type Story = StoryObj<AlertComponent>;

export const Default: Story = {
  args: {
    title: 'Alert Title',
    message: 'Alert message.' as string & Observable<string>,
    iconName: 'warning',
    okBtn: 'Okay',
    okBtnIsDestructive: false,
    cancelBtn: 'Cancel',
  },
};
