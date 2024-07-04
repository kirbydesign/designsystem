import type { Meta, StoryObj } from '@storybook/angular';

import { SpinnerComponent } from '@kirbydesign/designsystem/spinner';

const meta: Meta<SpinnerComponent> = {
  component: SpinnerComponent,
  title: 'Components / Spinner',
};
export default meta;
type Story = StoryObj<SpinnerComponent>;

export const Spinner: Story = {
  args: {},
};
