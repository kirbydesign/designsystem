import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

import { CardComponent } from '@kirbydesign/designsystem/card';
import { SlideButtonComponent } from '@kirbydesign/designsystem/slide-button';
// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';

const meta: Meta<SlideButtonComponent> = {
  component: SlideButtonComponent,
  title: 'Components / Slide Button',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<SlideButtonComponent>;

export const SlideButton: Story = {
  args: {
    text: 'Confirm',
  },
};

export const Focused: Story = {
  args: {
    text: 'Confirm',
  },
  decorators: [componentWrapperDecorator((story) => `<div style="padding: 8px">${story}</div>`)],
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('button');
    (button as HTMLElement)?.focus();
  },
};

export const Surfaces: Story = {
  render: renderOnSurfaces(`
    <p class="kirby-text-normal">{{ surface }}</p>
    <kirby-slide-button text="Confirm"></kirby-slide-button>
  `),
};
