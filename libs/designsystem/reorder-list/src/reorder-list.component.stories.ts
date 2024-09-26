import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { ReorderListComponent } from '@kirbydesign/designsystem/reorder-list';

const meta: Meta<ReorderListComponent> = {
  component: ReorderListComponent,
  title: 'Components / Reorder List',
};
export default meta;
type Story = StoryObj<ReorderListComponent>;

const getItemTextDefault = (item: any) => {
  return item.title;
};

const items = [
  {
    title: '1',
    ownerName: 'xyz',
    isOwnAccount: false,
    shadowAccounts: [
      {
        title: '1a',
      },
      {
        title: '1b',
      },
      {
        title: '1c',
      },
      {
        title: '1d',
      },
      {
        title: '1e',
      },
      {
        title: '1f',
      },
    ],
  },
  {
    title: '2',
  },
  {
    title: '3',
  },
  {
    title: '4',
    ownerName: 'John',
    isOwnAccount: true,
    shadowAccounts: [
      {
        title: '4a',
      },
    ],
  },
  {
    title: '5',
    isOwnAccount: true,
    shadowAccounts: [
      {
        title: '5a',
      },
    ],
  },
];

export const ReorderList: Story = {
  args: {
    subItemsName: 'shadowAccounts',
    items,
  },
  render: (args) => ({
    props: { getItemTextDefault, ...args },
    template: `
    <kirby-reorder-list ${argsToTemplate(args)} [getItemTextDefault]="getItemTextDefault">
    <kirby-item
      *kirbyListItemTemplate="let reorderItem; let isSubItem = isSubItem"
      reorderable="true"
    >
      <kirby-label>
        <h3 [ngClass]="{ 'kirby-text-bold': !isSubItem }">{{ reorderItem.title }}</h3>
        <p *ngIf="!reorderItem.isOwnAccount" detail>{{ reorderItem.ownerName }}</p>
      </kirby-label>
      <kirby-toggle slot="end" checked="true"></kirby-toggle>
    </kirby-item>`,
  }),
};
