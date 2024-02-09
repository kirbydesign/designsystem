import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonComponent, ButtonSize } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ButtonComponent',
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    noDecoration: false,
    isFloating: false,
    size: ButtonSize.MD,
    showIconOnly: false,
  },
};
