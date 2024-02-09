import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { ModalV2RoutingComponent } from './modal-routing.component';

const meta: Meta<ModalV2RoutingComponent> = {
  component: ModalV2RoutingComponent,
  title: 'ModalV2RoutingComponent',
};
export default meta;
type Story = StoryObj<ModalV2RoutingComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/modal-routing works!/gi)).toBeTruthy();
  },
};
