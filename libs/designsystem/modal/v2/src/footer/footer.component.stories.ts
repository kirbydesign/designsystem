import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ModalV2FooterComponent } from './footer.component';

const meta: Meta<ModalV2FooterComponent> = {
  component: ModalV2FooterComponent,
  title: 'ModalV2FooterComponent',
};
export default meta;
type Story = StoryObj<ModalV2FooterComponent>;

export const TestGrid: Story = {
  args: {
    snapToKeyboard: false,
    type: 'fixed',
  },
};

export const Heading: Story = {
  args: {
    snapToKeyboard: false,
    type: 'fixed',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/footer works!/gi)).toBeTruthy();
  },
};
