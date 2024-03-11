import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ItemModule } from '@kirbydesign/designsystem/item';
import { ListComponent } from './list.component';
import { ListModule } from './list.module';

const meta: Meta<ListComponent> = {
  component: ListComponent,
  title: 'ListComponent',
  decorators: [
    moduleMetadata({
      imports: [ItemModule, ListModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<ListComponent>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Vestas Wind Systems has a very long name',
        amount: '5.587.218.309 DKK',
      },
      {
        title: 'Cypress Semiconductor Corporation',
        amount: '76.980 DKK',
      },
    ],
    getStandAloneByProperty: '',
    standAloneSpacing: 'xxs',
    noMoreItemsText: '',
    showDivider: true,
    markSelectedRow: false,
    shape: 'rounded',
    hasItemSpacing: false,
    isLoadOnDemandEnabled: false,
    swipeActions: [],
    disableSelectionHighlight: false,
  },
  render: (args: ListComponent) => ({
    props: args,
    template: `
    <kirby-list ${argsToTemplate(args)}>
    '<kirby-item *kirbyListItemTemplate="let item">
    <h3>{{item.title}}</h3>
    <data slot="end">{{item.amount}}</data>
  </kirby-item>
  </kirby-list>`,
  }),
};
