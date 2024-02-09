import type { Meta, StoryObj } from '@storybook/angular';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { TabButtonComponent } from './tab-button.component';

const meta: Meta<TabButtonComponent> = {
  component: TabButtonComponent,
  title: 'TabButtonComponent',
};
export default meta;
type Story = StoryObj<TabButtonComponent>;

export const Primary: Story = {
  args: {
    routerLink: '',
    tab: '',
  },
};

export const Heading: Story = {
  args: {
    routerLink: '',
    tab: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/tab-button works!/gi)).toBeTruthy();
  },
};
