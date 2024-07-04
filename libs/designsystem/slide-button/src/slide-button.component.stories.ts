import type { Meta, StoryObj } from '@storybook/angular';

import { SlideButtonComponent } from '@kirbydesign/designsystem/slide-button';

const meta: Meta<SlideButtonComponent> = {
  component: SlideButtonComponent,
  title: 'Components / Slide Button',
};
export default meta;
type Story = StoryObj<SlideButtonComponent>;

export const SlideButton: Story = {
  args: {
    text: 'Slide button',
  },
};
