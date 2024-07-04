import type { Meta, StoryObj } from '@storybook/angular';

import { Observable } from 'rxjs';
import { AlertComponent } from '@kirbydesign/designsystem/modal';

const meta: Meta<AlertComponent> = {
  component: AlertComponent,
  title: 'Components / Alert',
};
export default meta;
type Story = StoryObj<AlertComponent>;

export const Alert: Story = {
  args: {
    title: 'Alert Title',
    message: 'Alert message.' as string & Observable<string>,
    iconName: 'warning',
    okBtn: 'Okay',
    okBtnIsDestructive: false,
    cancelBtn: 'Cancel',
  },
};
