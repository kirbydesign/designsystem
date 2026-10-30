import {
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';

import { CardComponent } from '@kirbydesign/designsystem/card';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import {
  SegmentedControlComponent,
  SegmentedControlMode,
} from '@kirbydesign/designsystem/segmented-control';

// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../.storybook/story-helpers';
import { SegmentedControlExampleComponent } from '~/app/examples/segmented-control-example/segmented-control-example.component';

const meta: Meta<SegmentedControlComponent> = {
  component: SegmentedControlComponent,
  decorators: [
    moduleMetadata({
      imports: [SegmentedControlExampleComponent, CardComponent],
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

const segmentedControlModes = Object.values(SegmentedControlMode);

// The focus ring is drawn on the segment button's shadow part, which pseudo-states can't force.
// See the "Focused" story for focus coverage.
const segmentedControlStates = interactionStates.filter((state) => state !== 'focus-visible');

// The selected segment is labelled with the state
const segmentedControlItems = Object.fromEntries(
  segmentedControlStates.map((state) => [
    state,
    [
      { text: state, id: 'selected' },
      { text: 'Unselected', id: 'unselected' },
    ],
  ])
);

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      idsOnSurfaces('segmented-control', segmentedControlModes),
      'ion-segment-button'
    ),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (mode of modes; track mode) {
      <p class="kirby-text-small-light">{{ mode }}</p>
      <div class="row">
        @for (state of states; track state) {
          <kirby-segmented-control
            [attr.id]="'segmented-control-' + surface + '-' + mode + '-' + state"
            [mode]="mode"
            [items]="items[state]"
            [selectedIndex]="0"
          ></kirby-segmented-control>
        }
      </div>
    }
  `,
    'max-content',
    { modes: segmentedControlModes, states: segmentedControlStates, items: segmentedControlItems },
    { stacked: true }
  ),
};
