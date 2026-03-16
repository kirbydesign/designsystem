import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { ToggleExampleComponent } from '~/app/examples/toggle-example/toggle-example.component';
import { ToggleStateExampleComponent } from '~/app/examples/toggle-example/examples/state';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'Components / Toggle',
  decorators: [
    moduleMetadata({
      imports: [ToggleExampleComponent, ToggleStateExampleComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const StateExample: Story = {
  render: () => ({
    template: `<cookbook-toggle-state-example></cookbook-toggle-state-example>`,
  }),
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-toggle-example></cookbook-toggle-example>`,
  }),
};
