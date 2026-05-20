import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
/* eslint-disable-next-line no-restricted-imports */
import { SegmentedControlComponent, SegmentedControlMode } from './segmented-control.component';

import { SegmentedControlExampleComponent } from '~/app/examples/segmented-control-example/segmented-control-example.component';

const meta: Meta<SegmentedControlComponent> = {
  component: SegmentedControlComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SegmentedControlComponent,
        ButtonComponent,
        IconComponent,
        SegmentedControlExampleComponent,
      ],
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

export const ProjectedContent: Story = {
  args: {
    mode: SegmentedControlMode.default,
    selectedIndex: 0,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-segmented-control
        [selectedIndex]="selectedIndex"
        [mode]="mode"
        [size]="size"
      >
        <li>First Item</li>
        <li>Second Item</li>
        <li><span class="kirby-text-bold">Third Item</span></li>
      </kirby-segmented-control>
    `,
  }),
};

export const ProjectedContentChipMode: Story = {
  args: {
    mode: SegmentedControlMode.compactChip,
    selectedIndex: 0,
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-segmented-control
        [selectedIndex]="selectedIndex"
        [mode]="mode"
        [size]="size"
      >
        <li><div>1D</div><div class="negative">-1.54%</div></li>
        <li><div>1M</div><div class="negative">-15.54%</div></li>
        <li><div>3M</div><div class="positive">+8.54%</div></li>
        <li><div>6M</div><div class="positive">+7.54%</div></li>
        <li><div>ÅTD</div><div class="positive">+17.54%</div></li>
        <li><div>1ÅR</div><div class="positive">+107.54%</div></li>
        <li><div>Maks</div><div class="positive">+141.54%</div></li>
        <li><div class="calendar"><button kirby-button attentionLevel="3"><kirby-icon name="calendar"></kirby-icon></button></div></li>
      </kirby-segmented-control>
      
    `,
    styles: [
      `
        ::ng-deep .positive {
          color: green;
        }

        ::ng-deep .negative {
          color: red;
        }
      `,
    ],
  }),
};
