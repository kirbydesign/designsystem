import type { Meta, StoryObj } from '@storybook/angular';

import { ModalFooterComponent } from './modal-footer.component';

const meta: Meta<ModalFooterComponent> = {
  component: ModalFooterComponent,
  title: 'ModalFooterComponent',
};
export default meta;
type Story = StoryObj<ModalFooterComponent>;

export const Default: Story = {
  args: {
    snapToKeyboard: false,
    type: 'fixed',
    themeColor: 'white',
  },
};
