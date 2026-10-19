import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardComponent } from '@kirbydesign/designsystem/card';
import { SpinnerComponent } from '@kirbydesign/designsystem/spinner';
// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';

const meta: Meta<SpinnerComponent> = {
  component: SpinnerComponent,
  title: 'Components / Spinner',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Spinner: Story = {
  args: {},
};

export const Surfaces: Story = {
  render: renderOnSurfaces(`
    <p class="kirby-text-normal">{{ surface }}</p>
    <kirby-spinner></kirby-spinner>
  `),
};
