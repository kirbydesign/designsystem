import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ActionSheetComponent } from '@kirbydesign/designsystem/modal';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { FabSheetComponent } from '@kirbydesign/designsystem/fab-sheet';

const meta: Meta<FabSheetComponent> = {
  component: FabSheetComponent,
  title: 'FabSheetComponent',
  decorators: [
    moduleMetadata({
      imports: [ActionSheetComponent, IconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<FabSheetComponent>;

export const Default: Story = {
  args: {
    disabled: false,
    horizontalAlignment: 'right',
  },
  argTypes: {
    horizontalAlignment: {
      options: ['left', 'center', 'right'],
      control: {
        type: 'radio',
      },
    },
  },
  render: (args: FabSheetComponent) => ({
    props: args,
    template: `<kirby-fab-sheet ${argsToTemplate(args)}>
    <kirby-icon name="write-message"></kirby-icon>
    <kirby-action-sheet
      header="Your action sheet header"
      subheader="Your action sheet subheader"
      [items]="[{id: '1', text: 'Item 1' }, {id: '2', text: 'Item 2' }, {id: '3', text: 'Item 3' }]"
    ></kirby-action-sheet>
  </kirby-fab-sheet>
  `,
  }),
};
