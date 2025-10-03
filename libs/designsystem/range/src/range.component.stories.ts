import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

import { RangeComponent } from '@kirbydesign/designsystem/range';

const meta: Meta<RangeComponent> = {
  component: RangeComponent,
  title: 'Components / Range',
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
