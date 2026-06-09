import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator } from '@storybook/angular';

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

export const Focused: Story = {
  args: {
    text: 'Slide to confirm',
  },
  decorators: [componentWrapperDecorator((story) => `<div style="padding: 8px">${story}</div>`)],
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    (button as HTMLElement)?.focus();
  },
};
