import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
/* eslint-disable-next-line no-restricted-imports */
import { SegmentedControlComponent, SegmentedControlMode } from './segmented-control.component';

import { SegmentedControlExampleModule } from '~/app/examples/segmented-control-example/segmented-control-example.module';

const meta: Meta<SegmentedControlComponent> = {
  component: SegmentedControlComponent,
  decorators: [
    moduleMetadata({
      imports: [SegmentedControlExampleModule],
    }),
  ],
  title: 'Components / Segmented Control',
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

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-segmented-control-example></cookbook-segmented-control-example>`,
  }),
};
