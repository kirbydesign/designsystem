import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { NgTemplateOutlet } from '@angular/common';

import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import {
  ListComponent,
  ListFooterDirective,
  ListHeaderComponent,
  ListHeaderDirective,
  ListItemTemplateDirective,
  ListSectionHeaderDirective,
  ListShape,
} from '@kirbydesign/designsystem/list';
import { ButtonComponent, IconComponent } from '@kirbydesign/designsystem';
import {
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardVariant,
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
        LabelComponent,
        ListComponent,
        ListItemTemplateDirective,
        ListHeaderComponent,
        ListHeaderDirective,
        ListFooterDirective,
        ListSectionHeaderDirective,
        ButtonComponent,
        IconComponent,
        ListExampleComponent,
        CardComponent,
        CardHeaderComponent,
        CardFooterComponent,
        NgTemplateOutlet,
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

export const ListWithItemsFirstFocused: Story = {
  name: 'List with Items - First Focused',
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

export const ListWithItemsSecondFocused: Story = {
  name: 'List with Items - Second Focused',
  ...ListWithItemsFirstFocused,
  play: focusSelectableItem(1),
};

export const ListWithItemsLastFocused: Story = {
  name: 'List with Items - Last Focused',
  ...ListWithItemsFirstFocused,
  play: focusSelectableItem(2),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-list-example></cookbook-list-example>`,
  }),
};

export const ListInCardFirstFocused: Story = {
  name: 'List in Card - First Focused',
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

export const ListInCardSecondFocused: Story = {
  name: 'List in Card - Second Focused',
  ...ListInCardFirstFocused,
  play: focusSelectableItem(1),
};

export const ListInCardLastFocused: Story = {
  name: 'List in Card - Last Focused',
  ...ListInCardFirstFocused,
  play: focusSelectableItem(2),
};

export const ListInCardWithHeaderFirstFocused: Story = {
  name: 'List in Card with Header - First Focused',
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

export const ListInCardWithHeaderLastFocused: Story = {
  name: 'List in Card with Header - Last Focused',
  ...ListInCardWithHeaderFirstFocused,
  play: focusSelectableItem(2),
};

export const ListInCardWithFooterFirstFocused: Story = {
  name: 'List in Card with Footer - First Focused',
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

export const ListInCardWithFooterLastFocused: Story = {
  name: 'List in Card with Footer - Last Focused',
  ...ListInCardWithFooterFirstFocused,
  play: focusSelectableItem(2),
};

export const ListInCardWithContentAboveFirstFocused: Story = {
  name: 'List in Card with Content Above - First Focused',
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

export const ListInCardWithContentBelowLastFocused: Story = {
  name: 'List in Card with Content Below - Last Focused',
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

export const ListWithStandAloneItemFocused: Story = {
  name: 'List with Stand Alone Item - Focused',
  args: {
    items: [
      { title: 'First item', isStandAlone: false },
      { title: 'Second item', isStandAlone: false },
      { title: 'Stand alone item', isStandAlone: true },
    ],
    getStandAloneByProperty: 'isStandAlone',
    showDivider: true,
    shape: 'rounded',
  },
  render: (args) => ({
    props: args,
    template: `<kirby-list ${argsToTemplate(args)}>
    <kirby-item *kirbyListItemTemplate="let item" [selectable]="true">
      <p class="kirby-item-title">{{item.title}}</p>
    </kirby-item>
  </kirby-list>`,
  }),
  play: focusSelectableItem(2),
};

type ListLayout = {
  label: string;
  shape: ListShape;
  hasSections?: boolean;
  hasStandAlone?: boolean;
};

const listLayouts: ListLayout[] = [
  { label: 'rounded', shape: 'rounded' },
  { label: 'square', shape: 'square' },
  { label: 'sections', shape: 'rounded', hasSections: true },
  { label: 'stand-alone', shape: 'rounded', hasStandAlone: true },
];

const noneInCard: ListLayout = { label: 'shape none', shape: 'none', hasSections: true };

const roundedInCard: ListLayout = { label: 'rounded', shape: 'rounded' };

const cardVariants: CardVariant[] = ['base', 'raised', 'brand'];

const surfaceItems = [
  { title: 'First item', amount: '1.234,56', section: 'Section A' },
  { title: 'Second item', amount: '78,90', section: 'Section A' },
  { title: 'Stand-alone item', amount: '12,34', section: 'Section B', isStandAlone: true },
  { title: 'Last item', amount: '567,89', section: 'Section B' },
];

export const ListOnSurfaces: Story = {
  render: () => ({
    props: {
      layouts: listLayouts,
      noneInCard,
      roundedInCard,
      cardVariants,
      items: surfaceItems,
      getSectionName: (item: (typeof surfaceItems)[number]) => item.section,
    },
    template: `
      <ng-template #list let-layout="layout">
        <kirby-list
          [items]="items"
          [shape]="layout.shape"
          [getSectionName]="layout.hasSections ? getSectionName : undefined"
          [getStandAloneByProperty]="layout.hasStandAlone ? 'isStandAlone' : undefined"
        >
          <kirby-list-header *kirbyListHeader><p>List header</p></kirby-list-header>
          <p *kirbyListSectionHeader="let section" class="kirby-text-small">{{ section }}</p>
          <kirby-item *kirbyListItemTemplate="let item">
            <kirby-label><p class="kirby-item-title">{{ item.title }}</p></kirby-label>
            <data slot="end">{{ item.amount }}</data>
          </kirby-item>
          <div class="footer" *kirbyListFooter><p>List footer</p></div>
        </kirby-list>
      </ng-template>

      <div class="grid">
        <span class="row-start"></span>
        @for (layout of layouts; track layout.label) {
          <p class="kirby-text-small-light">{{ layout.label }}</p>
        }
        <p class="row-start kirby-text-small-light">raised</p>
        @for (layout of layouts; track layout.label) {
          <ng-container *ngTemplateOutlet="list; context: { layout }"></ng-container>
        }

        <span class="row-start"></span>
        @for (cardVariant of cardVariants; track cardVariant) {
          <p class="kirby-text-small-light">{{ cardVariant }} card</p>
        }
        <p class="row-start kirby-text-small-light">{{ noneInCard.label }}</p>
        @for (cardVariant of cardVariants; track cardVariant) {
          <kirby-card [variant]="cardVariant">
            <ng-container *ngTemplateOutlet="list; context: { layout: noneInCard }"></ng-container>
          </kirby-card>
        }
        <p class="row-start kirby-text-small-light">{{ roundedInCard.label }}</p>
        @for (cardVariant of cardVariants; track cardVariant) {
          <kirby-card [variant]="cardVariant">
            <ng-container *ngTemplateOutlet="list; context: { layout: roundedInCard }"></ng-container>
          </kirby-card>
        }
      </div>
    `,
    styles: [
      `
        .grid {
          display: grid;
          grid-template-columns: 1fr repeat(${listLayouts.length}, 260px);
          gap: var(--kirby-spacing-s);
          padding: var(--kirby-spacing-s);
          align-items: start;
        }

        .row-start { grid-column: 1; }
        p { margin: 0; }
        .footer p { margin-inline-start: var(--kirby-spacing-s);}
      `,
    ],
  }),
};
