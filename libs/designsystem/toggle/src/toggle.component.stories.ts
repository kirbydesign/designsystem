import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { ToggleExampleComponent } from '~/app/examples/toggle-example.component';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'Components / Toggle',
  decorators: [
    moduleMetadata({
      imports: [ToggleComponent, ToggleExampleComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Toggle: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-toggle-example></cookbook-toggle-example>`,
  }),
};
