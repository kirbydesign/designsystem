import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent, ButtonSize } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'ButtonComponent',
  decorators: [
    moduleMetadata({
      imports: [IconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  args: {
    noDecoration: false,
    isFloating: false,
    size: ButtonSize.MD,
    showIconOnly: false,
    attentionLevel: '1',
  },
  render: (args: ButtonComponent) => ({
    props: args,
    template: `
      <button kirby-button ${argsToTemplate(args)}>Default</button>
    `,
  }),
};
