import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import { renderOnSurfaces } from '../../.storybook/story-helpers';

const meta: Meta<ProgressCircleComponent> = {
  component: ProgressCircleComponent,
  title: 'Components / Progress Circle',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ProgressCircleComponent>;

export const ProgressCircle: Story = {
  args: {
    value: 0,
    size: 'md',
    themeColor: 'success',
  },
};

const themeColors: ProgressCircleComponent['themeColor'][] = ['success', 'warning', 'danger'];
const sizes: ProgressCircleComponent['size'][] = ['sm', 'md', 'lg'];

export const Surfaces: Story = {
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (themeColor of themeColors; track themeColor) {
      <p class="kirby-text-small-light">{{ themeColor }}</p>
      <!-- Skip the progress animation, so the snapshot shows the final value -->
      <div class="row" style="--kirby-transition-duration-extra-long: 0s">
        @for (size of sizes; track size) {
          <kirby-progress-circle [value]="60" [themeColor]="themeColor" [size]="size">
            {{ size }}
          </kirby-progress-circle>
        }
      </div>
    }
  `,
    '320px',
    { themeColors, sizes }
  ),
};
