import type { Meta, StoryObj } from '@storybook/angular';

import { SegmentedControlComponent, SegmentedControlMode } from './segmented-control.component';

const meta: Meta<SegmentedControlComponent> = {
  component: SegmentedControlComponent,
  title: 'SegmentedControlComponent',
};
export default meta;
type Story = StoryObj<SegmentedControlComponent>;

export const Primary: Story = {
  args: {
    mode: SegmentedControlMode.default,
    // items: '',
    // selectedIndex: '',
    // value: '',
    // size: '',
    // disableChangeOnSwipe: '',
  },
};
