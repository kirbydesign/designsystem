import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ButtonSize } from '@kirbydesign/designsystem/button';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { MenuComponent } from './menu.component';

const meta: Meta<MenuComponent> = {
  component: MenuComponent,
  title: 'MenuComponent',
  decorators: [
    moduleMetadata({
      imports: [ItemModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<MenuComponent>;

export const Default: Story = {
  args: {
    isDisabled: false,
    buttonSize: ButtonSize.MD,
    placement: 'bottom-start',
    attentionLevel: '3',
    triggers: ['click'],
    autoPlacement: false,
    closeOnSelect: true,
    closeOnEscapeKey: true,
    closeOnBackdrop: true,
    shift: true,
    minWidth: 0,
  },
  render: (args: MenuComponent) => ({
    props: args,
    template: `<kirby-menu ${argsToTemplate(args)}>
    <kirby-item>
      <p>Action 1</p>
    </kirby-item>
  </kirby-menu>
  `,
  }),
};
