import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

import { ActionGroupComponent } from '@kirbydesign/designsystem/action-group';

const meta: Meta<ActionGroupComponent> = {
  component: ActionGroupComponent,
  title: 'Components / Header / ActionGroup',
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, IconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<ActionGroupComponent>;

export const ActionGroup: Story = {
  args: {
    visibleActions: 2,
    align: 'end',
  },
  argTypes: {
    align: {
      options: ['start', 'end'],
      control: { type: 'radio' },
    },
  },
  render: (args) => ({
    props: args,
    template: `<kirby-action-group ${argsToTemplate(args)}>
    <button kirby-button attentionLevel="3">
      <kirby-icon name="edit"></kirby-icon>
      <span class="text">Action 1</span>
    </button>
    <button kirby-button attentionLevel="3">
      Action 2
    </button>
    <button kirby-button attentionLevel="3">
      Action 3
    </button>
  </kirby-action-group>`,
  }),
};
