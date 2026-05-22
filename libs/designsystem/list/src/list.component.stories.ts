import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { ItemComponent } from '@kirbydesign/designsystem/item';
import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ButtonComponent, IconComponent } from '@kirbydesign/designsystem';
import {
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
} from '@kirbydesign/designsystem/card';
// eslint-disable-next-line no-restricted-imports
import { focusSelectableItem } from '../../.storybook/story-helpers';
import { ListExampleComponent } from '~/app/examples/list-example/list-example.component';

const meta: Meta<ListComponent> = {
  component: ListComponent,
  title: 'Components / List',
  decorators: [
    moduleMetadata({
      imports: [
        ItemComponent,
        ListComponent,
        ListItemTemplateDirective,
        ButtonComponent,
        IconComponent,
        ListExampleComponent,
        CardComponent,
        CardHeaderComponent,
        CardFooterComponent,
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<ListComponent>;

export const List: Story = {
  args: {
    items: [
      {
        id: 0,
        title: 'Vestas Wind Systems has a very long name',
        subTitle: '2000 pcs',
        amount: '5.587.218.309 DKK',
        detail: 225,
        color: 'default',
      },
      {
        id: 1,
        title: 'Cypress Semiconductor Corporation',
        subTitle: '1827 pcs',
        amount: '76.980 DKK',
        detail: -3,
        color: 'light',
      },
      {
        id: 2,
        title: 'Ultragenyx Pharmaceutical Inc.',
        subTitle: '787 pcs',
        amount: '83.004 DKK',
        detail: -115,
        color: 'white',
      },
      {
        id: 3,
        title: 'Trans World Entertainment Corp.',
        subTitle: '467 pcs',
        amount: '60.963 DKK',
        detail: 6,
        color: 'light',
      },
      {
        id: 4,
        title: 'Astronics Corporation',
        subTitle: '791 pcs',
        amount: '33.830 DKK',
        detail: -154,
        color: 'white',
        isStandAlone: true,
      },
      {
        id: 5,
        title: 'Riverview Bancorp Inc',
        subTitle: '206 pcs',
        amount: '60.775 DKK',
        detail: 98,
        color: 'light',
        isStandAlone: true,
      },
      {
        id: 6,
        title: 'Haemonetics Corporation',
        subTitle: '988 pcs',
        amount: '61.196 DKK',
        detail: 220,
        color: 'white',
      },
      {
        id: 7,
        title: 'PJT Partners Inc.',
        subTitle: '1706 pcs',
        amount: '52.441 DKK',
        detail: 129,
        color: 'light',
      },
      {
        id: 8,
        title: 'Total S.A.',
        subTitle: '827 pcs',
        amount: '62.276 DKK',
        detail: 53,
        color: 'white',
      },
      {
        id: 9,
        title: 'Northrop Grumman Corporation',
        subTitle: '443 pcs',
        amount: '95.190 DKK',
        detail: -135,
        color: 'white',
      },
      {
        id: 10,
        title: 'Rudolph Technologies, Inc.',
        subTitle: '1799 pcs',
        amount: '18.442 DKK',
        detail: 86,
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
  render: (args) => ({
    props: args,
    template: `<kirby-list ${argsToTemplate(args)}>
    <kirby-item *kirbyListItemTemplate="let item">
      <p class="kirby-item-title">{{item.title}}</p>
      <data slot="end">{{item.amount}}</data>
    </kirby-item>
  </kirby-list>`,
  }),
};

export const ListWithIcons: Story = {
  args: {
    items: [
      {
        title: 'Vestas Wind Systems has a very long name',
      },
      {
        title: 'Cypress Semiconductor Corporation',
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
  render: (args) => ({
    props: args,
    template: `
    <kirby-list ${argsToTemplate(args)}>
      <kirby-item *kirbyListItemTemplate="let item">
        <p class="kirby-item-title">{{item.title}}</p>
        <div slot="end">
          <button kirby-button size="sm" attentionLevel="3" aria-label="More settings">
            <kirby-icon name="see"></kirby-icon>
          </button>
          <button kirby-button size="sm" attentionLevel="3" aria-label="More settings">
            <kirby-icon name="edit"></kirby-icon>
          </button>
          <button kirby-button size="sm" attentionLevel="3" aria-label="More settings">
            <kirby-icon name="tractor"></kirby-icon>
          </button>
        </div>
      </kirby-item>
    </kirby-list>`,
  }),
};

export const ListWithSelectableItemsFirstFocused: Story = {
  name: 'List with Selectable Items - First Focused',
  args: {
    items: [
      {
        title: 'First selectable item',
      },
      {
        title: 'Second selectable item',
      },
      {
        title: 'Third selectable item',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<kirby-list ${argsToTemplate(args)}>
    <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
      <p class="kirby-item-title">{{item.title}}</p>
    </kirby-item>
  </kirby-list>`,
  }),
  play: focusSelectableItem(0),
};

export const ListWithSelectableItemsSecondFocused: Story = {
  name: 'List with Selectable Items - Second Focused',
  ...ListWithSelectableItemsFirstFocused,
  play: focusSelectableItem(1),
};

export const ListWithSelectableItemsLastFocused: Story = {
  name: 'List with Selectable Items - Last Focused',
  ...ListWithSelectableItemsFirstFocused,
  play: focusSelectableItem(2),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-list-example></cookbook-list-example>`,
  }),
};

export const ListWithSelectableItemsInCardFirstFocused: Story = {
  name: 'List with Selectable Items in Card - First Focused',
  args: {
    items: [
      {
        title: 'First selectable item',
      },
      {
        title: 'Second selectable item',
      },
      {
        title: 'Third selectable item',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<kirby-card><kirby-list shape="none" ${argsToTemplate(args)}>
    <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
      <p class="kirby-item-title">{{item.title}}</p>
    </kirby-item>
  </kirby-list></kirby-card>`,
  }),
  play: focusSelectableItem(0),
};

export const ListWithSelectableItemsInCardSecondFocused: Story = {
  name: 'List with Selectable Items in Card - Second Focused',
  ...ListWithSelectableItemsInCardFirstFocused,
  play: focusSelectableItem(1),
};

export const ListWithSelectableItemsInCardLastFocused: Story = {
  name: 'List with Selectable Items in Card - Last Focused',
  ...ListWithSelectableItemsInCardFirstFocused,
  play: focusSelectableItem(2),
};

export const ListWithSelectableItemsInCardWithHeaderFirstFocused: Story = {
  name: 'List with Selectable Items in Card with Header - First Focused',
  args: {
    items: [
      {
        title: 'First selectable item',
      },
      {
        title: 'Second selectable item',
      },
      {
        title: 'Third selectable item',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<kirby-card><kirby-card-header>Header</kirby-card-header><kirby-list shape="none" ${argsToTemplate(args)}>
    <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
      <p class="kirby-item-title">{{item.title}}</p>
    </kirby-item>
  </kirby-list></kirby-card>`,
  }),
  play: focusSelectableItem(0),
};

export const ListWithSelectableItemsInCardWithHeaderSecondFocused: Story = {
  name: 'List with Selectable Items in Card with Header - Second Focused',
  ...ListWithSelectableItemsInCardWithHeaderFirstFocused,
  play: focusSelectableItem(1),
};

export const ListWithSelectableItemsInCardWithHeaderLastFocused: Story = {
  name: 'List with Selectable Items in Card with Header - Last Focused',
  ...ListWithSelectableItemsInCardWithHeaderFirstFocused,
  play: focusSelectableItem(2),
};

export const ListWithSelectableItemsInCardWithFooterFirstFocused: Story = {
  name: 'List with Selectable Items in Card with Footer - First Focused',
  args: {
    items: [
      {
        title: 'First selectable item',
      },
      {
        title: 'Second selectable item',
      },
      {
        title: 'Third selectable item',
      },
    ],
  },
  render: (args) => ({
    props: args,
    template: `<kirby-card><kirby-card-footer>Footer</kirby-card-footer><kirby-list shape="none" ${argsToTemplate(args)}>
    <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
      <p class="kirby-item-title">{{item.title}}</p>
    </kirby-item>
  </kirby-list></kirby-card>`,
  }),
  play: focusSelectableItem(0),
};

export const ListWithSelectableItemsInCardWithFooterSecondFocused: Story = {
  name: 'List with Selectable Items in Card with Footer - Second Focused',
  ...ListWithSelectableItemsInCardWithFooterFirstFocused,
  play: focusSelectableItem(1),
};

export const ListWithSelectableItemsInCardWithFooterLastFocused: Story = {
  name: 'List with Selectable Items in Card with Footer - Last Focused',
  ...ListWithSelectableItemsInCardWithFooterFirstFocused,
  play: focusSelectableItem(2),
};

export const ListWithSelectableItemsInCardWithContentAboveFirstFocused: Story = {
  name: 'List with Selectable Items in Card with Content Above - First Focused',
  args: {
    items: [{ title: 'First item' }, { title: 'Second item' }, { title: 'Third item' }],
  },
  render: (args) => ({
    props: args,
    template: `
    <kirby-card>
      <div style="padding: 16px;">
        <p>Some arbitrary content above the list.</p>
      </div>
      <kirby-list shape="none" ${argsToTemplate(args)}>
        <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
          <p class="kirby-item-title">{{item.title}}</p>
        </kirby-item>
      </kirby-list>
    </kirby-card>`,
  }),
  play: focusSelectableItem(0),
};

export const ListWithSelectableItemsInCardWithContentBelowLastFocused: Story = {
  name: 'List with Selectable Items in Card with Content Below - Last Focused',
  args: {
    items: [{ title: 'First item' }, { title: 'Second item' }, { title: 'Third item' }],
  },
  render: (args) => ({
    props: args,
    template: `
    <kirby-card>
      <kirby-list shape="none" ${argsToTemplate(args)}>
        <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
          <p class="kirby-item-title">{{item.title}}</p>
        </kirby-item>
      </kirby-list>
      <div style="padding: 16px;">
        <p>Some arbitrary content below the list.</p>
      </div>
    </kirby-card>`,
  }),
  play: focusSelectableItem(2),
};
