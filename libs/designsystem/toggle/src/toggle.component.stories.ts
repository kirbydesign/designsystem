import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { TestHelper } from '@kirbydesign/designsystem/testing';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'Components / Toggle',
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Toggle: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Focused: Story = {
  args: {
    checked: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-toggle></kirby-toggle>
      <kirby-toggle [checked]="true"></kirby-toggle>
    `,
    styles: [':host { display: flex; gap: 16px; }'],
  }),
  play: async ({ canvasElement }) => {
    const toggle = canvasElement.querySelector('ion-toggle');
    await TestHelper.whenReady(toggle);
    (toggle as HTMLElement).focus();
  },
};
