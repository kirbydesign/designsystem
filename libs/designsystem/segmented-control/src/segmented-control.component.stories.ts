import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import {
  SegmentedControlComponent,
  SegmentedControlMode,
} from '@kirbydesign/designsystem/segmented-control';

import { SegmentedControlExampleComponent } from '~/app/examples/segmented-control-example/segmented-control-example.component';

const meta: Meta<SegmentedControlComponent> = {
  component: SegmentedControlComponent,
  decorators: [
    moduleMetadata({
      imports: [SegmentedControlExampleComponent],
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

export const Focused: Story = {
  args: {
    mode: SegmentedControlMode.default,
    items: [
      { text: 'First item', id: 'first' },
      { text: 'Second item', id: 'second' },
    ],
    selectedIndex: 0,
    size: 'md',
  },
  decorators: [componentWrapperDecorator((story) => `<div style="padding: 8px">${story}</div>`)],
  play: async ({ canvasElement }) => {
    const segmentButton = canvasElement.querySelector('ion-segment-button');
    await TestHelper.whenReady(segmentButton);
    const nativeButton = segmentButton?.shadowRoot?.querySelector('button');
    (nativeButton as HTMLElement)?.focus();
  },
};
