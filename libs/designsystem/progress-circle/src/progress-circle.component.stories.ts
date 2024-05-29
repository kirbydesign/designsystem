import type { Meta, StoryObj } from '@storybook/angular';

import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';

const meta: Meta<ProgressCircleComponent> = {
  component: ProgressCircleComponent,
  title: 'ProgressCircleComponent',
};
export default meta;
type Story = StoryObj<ProgressCircleComponent>;

export const Default: Story = {
  args: {
    value: 0,
    size: 'md',
    themeColor: 'success',
  },
};
