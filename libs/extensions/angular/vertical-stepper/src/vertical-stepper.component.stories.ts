import { type Meta, type StoryObj } from '@storybook/angular';
import { VerticalStepperComponent } from '@kirbydesign/extensions-angular/vertical-stepper';

/**
 * The vertical stepper visualizes progress through a sequential flow, such as an order or onboarding process.
 * Each step can be pending, active (in progress), or completed.
 *
 * ## Usage Guidelines
 * - Use the vertical stepper to communicate _where_ a user is in a multi-step flow, not to navigate between steps.
 * - Keep step titles short. Use the optional description to add supporting detail for a step.
 */
const meta: Meta<VerticalStepperComponent> = {
  component: VerticalStepperComponent,
  title: 'Components/Vertical Stepper',
  args: {
    steps: [
      { title: 'Order received' },
      { title: 'Processing order', description: 'Your order is being processed.' },
      { title: 'Order sent', description: 'Your order is on its way to you.' },
      { title: 'Order delivered' },
    ],
    activeIndex: 1,
  },
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0 } },
  },
};
export default meta;
type Story = StoryObj<VerticalStepperComponent>;

/**
 * By default, steps before `activeIndex` are shown as completed, the step at `activeIndex` is shown as active/in-progress,
 * and the remaining steps are shown as pending.
 */
export const Default: Story = {};

/**
 * All steps are shown as pending when `activeIndex` is `0`.
 */
export const FirstStepActive: Story = {
  args: {
    activeIndex: 0,
  },
};

/**
 * All steps are shown as completed when `activeIndex` is equal to, or greater than, the number of steps.
 */
export const AllStepsCompleted: Story = {
  args: {
    activeIndex: 4,
  },
};

/**
 * Steps can optionally have a description providing more detail, shown below the title.
 */
export const WithoutDescriptions: Story = {
  args: {
    steps: [
      { title: 'Order received' },
      { title: 'Processing order' },
      { title: 'Order sent' },
      { title: 'Order delivered' },
    ],
  },
};
