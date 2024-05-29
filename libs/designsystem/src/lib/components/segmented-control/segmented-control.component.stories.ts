import type { Meta, StoryObj } from '@storybook/angular';

import { SegmentedControlComponent, SegmentedControlMode } from '@kirbydesign/designsystem/src/lib';

const meta: Meta<SegmentedControlComponent> = {
  component: SegmentedControlComponent,
  title: 'SegmentedControlComponent',
};
export default meta;
type Story = StoryObj<SegmentedControlComponent>;

export const Default: Story = {
  args: {
    mode: SegmentedControlMode.default,
    items: [
      {
        text: 'First item',
        id: 'first',
      },
      {
        text: 'Second item',
        id: 'second',
        badge: {
          icon: 'attach',
          description: 'Item with attachment',
          themeColor: 'success',
        },
      },
    ],
    selectedIndex: 0,
    size: 'md',
  },
};
