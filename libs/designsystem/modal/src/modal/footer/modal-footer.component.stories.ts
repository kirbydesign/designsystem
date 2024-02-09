import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ModalFooterComponent } from './modal-footer.component';

const meta: Meta<ModalFooterComponent> = {
  component: ModalFooterComponent,
  title: 'ModalFooterComponent',
};
export default meta;
type Story = StoryObj<ModalFooterComponent>;

export const Primary: Story = {
  args: {
    snapToKeyboard: false,
    type: 'fixed',
    themeColor: 'white',
  },
};

export const Heading: Story = {
  args: {
    snapToKeyboard: false,
    type: 'fixed',
    themeColor: 'white',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/modal-footer works!/gi)).toBeTruthy();
  },
};
