import type { Meta, StoryObj } from '@storybook/angular';

import { ModalFooterComponent } from '@kirbydesign/designsystem/modal';

const meta: Meta<ModalFooterComponent> = {
  component: ModalFooterComponent,
  title: 'Components / Modal / ModalFooter',
};
export default meta;
type Story = StoryObj<ModalFooterComponent>;

export const ModalFooter: Story = {
  args: {
    snapToKeyboard: false,
    type: 'fixed',
    themeColor: 'white',
  },
};
