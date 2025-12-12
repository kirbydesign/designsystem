import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { ReorderListComponent } from '@kirbydesign/designsystem/reorder-list';
import { ListComponent, ListItemTemplateDirective } from '@kirbydesign/designsystem/list';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-team-list-item',
  standalone: true,
  imports: [ItemComponent, LabelComponent],
  template: `
    <kirby-item [reorderable]="true" [size]="'md'">
      <kirby-label>
        <h3 class="kirby-text-bold">Name: {{ team.name }}</h3>
        <p detail>Detail Team</p>
      </kirby-label>
    </kirby-item>
  `,
})
export class TeamComponent {
  @Input() team: any | null = null;
}

@Component({
  selector: 'kirby-employee-list-item',
  standalone: true,
  imports: [ItemComponent, LabelComponent],
  template: `
    <kirby-item [reorderable]="true" [size]="'md'">
      <kirby-label>
        <h3 class="kirby-text-bold">Name: {{ employee.name }}</h3>
        <p detail>Detail employee</p>
      </kirby-label>
    </kirby-item>
  `,
})
export class EmployeeComponent {
  @Input() employee: any | null = null;
}

const meta: Meta<ReorderListComponent> = {
  component: ReorderListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ListComponent,
        ListItemTemplateDirective,
        ItemComponent,
        LabelComponent,
        ToggleComponent,
        TeamComponent,
        EmployeeComponent,
      ],
    }),
  ],
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
        <p class="kirby-item-title" [ngClass]="{ 'kirby-text-bold': !isSubItem }">{{ reorderItem.title }}</p>
        @if (!reorderItem.isOwnAccount) {
          <p class="kirby-item-detail">{{ reorderItem.ownerName }}</p>
        }
      </kirby-label>
      <kirby-toggle slot="end" checked="true"></kirby-toggle>
    </kirby-item>`,
  }),
};

const teams = [
  {
    name: 'team1',
    employees: [
      {
        name: 'e1',
      },
      {
        name: 'e2',
      },
    ],
  },
  {
    name: 'team2',
    employees: [
      {
        name: 'e3',
      },
      {
        name: 'e4',
      },
    ],
  },
];

export const CustomItemTemplateReorderList: Story = {
  args: {
    subItemsName: 'employees',
    items: teams,
  },
  render: (args) => ({
    props: { ...args },
    template: `
    <kirby-reorder-list ${argsToTemplate(args)} [getItemTextDefault]="getItemTextDefault">
      <ng-container *kirbyListItemTemplate="let item; let isSubItem = isSubItem">
        @if (isSubItem) {
          <kirby-employee-list-item [employee]="item"  />
        } @else {
          <kirby-team-list-item [team]="item"></kirby-team-list-item>
        }
      </ng-container>
    </kirby-reorder-list>`,
  }),
};
