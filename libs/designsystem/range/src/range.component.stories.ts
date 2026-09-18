import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { RangeComponent } from '@kirbydesign/designsystem/range';
import { TestHelper } from '@kirbydesign/designsystem/testing';

const meta: Meta<RangeComponent> = {
  component: RangeComponent,
  title: 'Components / Range',
  parameters: {
    layout: 'padded',
  },
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
    min: { type: 'number' },
    max: { type: 'number' },
  },
};

export const RangePin: Story = {
  args: {
    pin: true,
    value: 50,
  },
  render: (args) => ({
    props: args,
    // Pin only shows on drag interaction, but can be imitated with transform: scale(1) for testing.
    // Scaling messes with Ionics translate styles that move it to the right position.
    // But since we just want to verify its dimensions, we simply hide the knob and show just the pin.
    styles: [
      `
      kirby-range {
        margin-top: var(--kirby-spacing-l);
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

export const Focused: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
  },
  play: async ({ canvasElement }) => {
    const range = canvasElement.querySelector('ion-range');
    await TestHelper.whenReady(range);
    (range as HTMLElement).focus();
  },
};

export const DualKnobs: Story = {
  args: {
    dualKnobs: true,
    value: { lower: 25, upper: 75 },
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
    min: { type: 'number' },
    max: { type: 'number' },
  },
};

export const DualKnobsPin: Story = {
  args: {
    dualKnobs: true,
    pin: true,
    value: { lower: 20, upper: 80 },
    min: 0,
    max: 100,
  },
  render: (args) => ({
    props: args,
    styles: [
      `
      kirby-range {
        margin-top: var(--kirby-spacing-l);
      }

      ::ng-deep ion-range::part(pin) {
        transform: scale(1);
      }

      ::ng-deep ion-range::part(knob-a),
      ::ng-deep ion-range::part(knob-b) {
        visibility: hidden;
      }
      `,
    ],
    template: `<kirby-range ${argsToTemplate(args)}></kirby-range>`,
  }),
};

export const DualKnobsTicks: Story = {
  args: {
    dualKnobs: true,
    ticks: true,
    value: { lower: 2, upper: 7 },
    step: 1,
    min: 0,
    max: 9,
    minLabel: '0',
    maxLabel: '9',
  },
};

export const DualKnobsDisabled: Story = {
  args: {
    dualKnobs: true,
    disabled: true,
    value: { lower: 30, upper: 70 },
    min: 0,
    max: 100,
    minLabel: 'Min',
    maxLabel: 'Max',
  },
};
