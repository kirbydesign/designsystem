import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ActionSheetComponent } from '@kirbydesign/designsystem/modal';
import { FabSheetComponent } from './fab-sheet.component';

const meta: Meta<FabSheetComponent> = {
  component: FabSheetComponent,
  title: 'FabSheetComponent',
  decorators: [
    moduleMetadata({
      imports: [ActionSheetComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<FabSheetComponent>;

export const TestGrid: Story = {
  argTypes: {
    horizontalAlignment: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
    },
  },
  args: {
    disabled: false,
    horizontalAlignment: 'right',
  },
  render: (args: FabSheetComponent) => ({
    props: args,
    template: `<kirby-fab-sheet horizontalAlignment="right" [disabled]="disableFabSheet">
    <kirby-icon name="write-message"></kirby-icon>
    <kirby-action-sheet
      header="Your action sheet header"
      subheader="Your action sheet subheader"
      [items]="items"
      (itemSelect)="onItemSelect($event)"
    ></kirby-action-sheet>
  </kirby-fab-sheet>
  `,
  }),
};
