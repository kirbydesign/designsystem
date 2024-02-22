import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ModalV2Component } from './modal.component';

const meta: Meta<ModalV2Component> = {
  component: ModalV2Component,
  title: 'ModalV2Component',
};
export default meta;
type Story = StoryObj<ModalV2Component>;

export const TestGrid: Story = {
  args: {
    flavor: 'modal',
    open: false,
    canDismiss: true,
    title: '',
    hasCollapsibleTitle: false,
    scrollDisabled: false,
    initialBreakpoint: '',
    size: 'md',
    height: '',
  },
};

export const Heading: Story = {
  args: {
    flavor: 'modal',
    open: false,
    canDismiss: true,
    title: '',
    hasCollapsibleTitle: false,
    scrollDisabled: false,
    initialBreakpoint: '',
    size: 'md',
    height: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/modal works!/gi)).toBeTruthy();
  },
};
