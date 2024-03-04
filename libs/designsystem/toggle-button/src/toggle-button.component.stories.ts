import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { ToggleButtonComponent } from './toggle-button.component';

const meta: Meta<ToggleButtonComponent> = {
  component: ToggleButtonComponent,
  title: 'ToggleButtonComponent',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ToggleButtonComponent>;

export const Default: Story = {
  args: {
    checked: false,
  },
  render: (args: ToggleButtonComponent) => ({
    props: args,
    template: `<kirby-toggle-button ${argsToTemplate(args)}>
    <button kirby-button unchecked attentionLevel="3">Deactivated</button>
    <button kirby-button checked>Activated</button>
  </kirby-toggle-button>`,
  }),
};
