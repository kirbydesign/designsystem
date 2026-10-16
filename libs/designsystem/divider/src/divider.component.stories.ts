import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { CardComponent } from '@kirbydesign/designsystem/card';
// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';

const meta: Meta<DividerComponent> = {
  component: DividerComponent,
  title: 'Components / Divider',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<DividerComponent>;

export const Divider: Story = {
  args: {
    hasMargin: false,
  },
};

export const Surfaces: Story = {
  render: renderOnSurfaces(`
    <p class="kirby-text-normal">{{ surface }}</p>
    <kirby-divider></kirby-divider>
    <p class="kirby-text-normal">Divider without margin above</p>
    <kirby-divider [hasMargin]="true"></kirby-divider>
    <p class="kirby-text-normal">Divider with margin above</p>
  `),
};
