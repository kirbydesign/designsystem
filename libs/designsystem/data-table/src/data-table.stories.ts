import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';

import { DataTableExampleComponent } from '~/app/examples/data-table-example/data-table-example.component';

const meta: Meta<TableSortableComponent> = {
  component: TableSortableComponent,
  title: 'Components / Data Table',
  decorators: [
    moduleMetadata({
      imports: [DataTableExampleComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<TableSortableComponent>;

export const SortableHeadings: Story = {
  render: () => ({
    props: {
      headings: [
        { title: 'Name', sortable: true, sortDirection: 'asc', active: true },
        { title: 'Eye Color', sortable: true, sortDirection: 'desc', active: true },
        { title: 'Gender' },
        {
          title: 'Hair Color',
          sortable: true,
          sortDirection: 'asc',
          active: true,
          iconAlignment: 'start',
        },
        {
          title: 'Skin Color',
          sortable: true,
          sortDirection: 'desc',
          active: true,
          iconAlignment: 'start',
        },
      ],
    },
    template: `
    <table class="kirby-table">
      <thead>
        <tr>
          @for (heading of headings; track heading.title; let i = $index) {
            <th
              [sortable]="heading.sortable"
              [sortDirection]="heading.sortDirection"
              [iconAlignment]="heading.iconAlignment"
              [active]="heading.active"
            >
             {{heading.title}}
            </th>
          }
        </tr>
      </thead>
    </table>
    `,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-data-table-example></cookbook-data-table-example>`,
  }),
};
