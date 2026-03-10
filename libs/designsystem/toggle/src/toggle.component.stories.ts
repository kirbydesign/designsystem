import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { ToggleExampleComponent } from '~/app/examples/toggle-example/toggle-example.component';
import { ToggleDefaultExampleComponent } from '~/app/examples/toggle-example/examples/default';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'Components / Toggle',
  decorators: [
    moduleMetadata({
      imports: [ToggleExampleComponent, ToggleDefaultExampleComponent],
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

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
};

export const DefaultExample: Story = {
  render: () => ({
    template: `<cookbook-toggle-default-example></cookbook-toggle-default-example>`,
  }),
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-toggle-example></cookbook-toggle-example>`,
  }),
};
