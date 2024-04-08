import type { Meta, StoryObj } from '@storybook/angular';

import { SlideButtonComponent } from './slide-button.component';

const meta: Meta<SlideButtonComponent> = {
  component: SlideButtonComponent,
  title: 'SlideButtonComponent',
};
export default meta;
type Story = StoryObj<SlideButtonComponent>;

export const Default: Story = {
  args: {
    text: 'Slide button',
  },
};
