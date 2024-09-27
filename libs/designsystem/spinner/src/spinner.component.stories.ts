import type { Meta, StoryObj } from '@storybook/angular';

// TODO: Revert to @kirbydesign/designsystem/spinner before merging
import { KirbySpinnerComponent } from '@kirbydesign/angular/spinner';

const meta: Meta<KirbySpinnerComponent> = {
  component: KirbySpinnerComponent,
  title: 'Components / Spinner',
};
export default meta;
type Story = StoryObj<KirbySpinnerComponent>;

export const Spinner: Story = {
  args: {},
};
