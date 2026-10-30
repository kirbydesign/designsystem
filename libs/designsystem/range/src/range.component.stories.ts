import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { RangeComponent } from '@kirbydesign/designsystem/range';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import {
  idsOnSurfaces,
  interactionStates,
  pseudoStatesFor,
  renderOnSurfaces,
} from '../../.storybook/story-helpers';

const meta: Meta<RangeComponent> = {
  component: RangeComponent,
  title: 'Components / Range',
  decorators: [
    moduleMetadata({
      imports: [CardComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<RangeComponent>;

export const Range: Story = {
  args: {
    value: 0,
    step: 1,
    min: 0,
    max: 100,
    minLabel: '',
    maxLabel: '',
    debounce: 0,
    pin: false,
    ticks: false,
    disabled: false,
  },
  argTypes: {
    min: {
      type: 'number',
    },
    max: {
      type: 'number',
    },
  },
};

export const RangePin: Story = {
  args: {
    pin: true,
    value: 50,
  },
  render: (args) => ({
    props: args,
    styles: [
      // Pin only shows on drag interaction, but can be imitated with transform: scale(1) for testing.
      // Scaling messes with Ionics translate styles that move it to the right position.
      // But since we just want to verify its dimensions, we simply hide the knob and show just the pin.
      `
      kirby-range {
        margin: var(--kirby-spacing-l);
      }

      ::ng-deep ion-range::part(pin) {
        transform: scale(1);
      }

      ::ng-deep ion-range::part(knob) {
        visibility: hidden;
      }
      `,
    ],
    template: `
      <kirby-range ${argsToTemplate(args)}></kirby-range>
    `,
  }),
};

const rangeVariants: {
  id: string;
  label: string;
  ticks?: boolean;
  minLabel?: string;
  maxLabel?: string;
}[] = [
  { id: 'default', label: 'Default', minLabel: 'Min', maxLabel: 'Max' },
  { id: 'ticks', label: 'Ticks', ticks: true },
];

// Disabled ranges can't be interacted with, so disabled is shown as a state of its own
const rangeStates = [...interactionStates, 'disabled'] as const;

// Ionic exposes the knob's interaction states as parts, which storybook-addon-pseudo-states
// can't force, so the parts are added to the knobs instead
const addKnobPart = (canvasElement: HTMLElement, state: string, part: string) => {
  const ionRanges = canvasElement.querySelectorAll(`kirby-range[id$="-${state}"] ion-range`);

  ionRanges.forEach((ionRange) => {
    const knob = ionRange.shadowRoot.querySelector('[part~="knob"]');
    knob.part.add(part);
  });
};

const forceKnobStates = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const ionRanges = Array.from(canvasElement.querySelectorAll('ion-range'));
  await TestHelper.whenReady(ionRanges);

  addKnobPart(canvasElement, 'hover', 'hover');
  addKnobPart(canvasElement, 'active', 'activated');
  addKnobPart(canvasElement, 'focus-visible', 'focused');
};

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(
      idsOnSurfaces(
        'range',
        rangeVariants.map((variant) => variant.id)
      ),
      'ion-range'
    ),
  },
  render: renderOnSurfaces(
    `
    <p class="kirby-text-normal-bold">{{ surface }}</p>
    @for (variant of variants; track variant.id) {
      <p class="kirby-text-small-light">{{ variant.label }}</p>
      <div class="row">
        @for (state of states; track state) {
          <div style="width: 160px">
            <p class="kirby-text-xsmall">{{ state }}</p>
            <kirby-range
              [attr.id]="'range-' + surface + '-' + variant.id + '-' + state"
              [value]="50"
              [min]="0"
              [max]="100"
              [step]="variant.ticks ? 25 : 1"
              [ticks]="!!variant.ticks"
              [minLabel]="variant.minLabel ?? ''"
              [maxLabel]="variant.maxLabel ?? ''"
              [disabled]="state === 'disabled'"
            ></kirby-range>
          </div>
        }
      </div>
    }
  `,
    'max-content',
    { variants: rangeVariants, states: rangeStates },
    { stacked: true }
  ),
  play: forceKnobStates,
};
