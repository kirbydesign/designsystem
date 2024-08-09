import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent, ButtonSize } from '@kirbydesign/designsystem/button';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Components / Button',
  decorators: [
    moduleMetadata({
      imports: [IconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Button: Story = {
  args: {
    noDecoration: false,
    isFloating: false,
    size: ButtonSize.MD,
    showIconOnly: false,
    attentionLevel: '1',
  },
  argTypes: {
    attentionLevel: {
      options: ['1', '2', '3'],
      control: { type: 'radio' },
    },
    size: {
      options: Object.values(ButtonSize),
      control: { type: 'radio' },
    },
  },
  render: (args: ButtonComponent) => ({
    props: args,
    template: `
      <button kirby-button ${argsToTemplate(args)}>Default</button>
    `,
  }),
};
