import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';
import { CardComponent } from '@kirbydesign/designsystem/card';

// eslint-disable-next-line no-restricted-imports
import {
  gridStyles,
  interactionStates,
  pseudoStatesFor,
  surfaces,
} from '../../.storybook/story-helpers';
import { DataTableExampleComponent } from '~/app/examples/data-table-example/data-table-example.component';

const meta: Meta<TableSortableComponent> = {
  component: TableSortableComponent,
  title: 'Components / Data Table',
  decorators: [
    moduleMetadata({
      imports: [DataTableExampleComponent, TableSortableComponent, CardComponent],
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

const tableStates = interactionStates.filter((state) => state !== 'focus-visible');
const tableIds = surfaces.map((surface) => `table-${surface}`);

export const InteractionStates: Story = {
  parameters: {
    pseudo: pseudoStatesFor(tableIds, ['th.sortable', 'tr.kirby-selectable-row']),
  },
  render: () => ({
    props: { surfaces, states: tableStates },
    template: `
      <div class="grid">
        @for (state of states; track state) {
          <p class="kirby-text-small-light">{{ state }}</p>
        }
        @for (surface of surfaces; track surface) {
          @for (state of states; track state) {
            <kirby-card [variant]="surface">
              <table class="kirby-table" [attr.id]="'table-' + surface + '-' + state">
                <thead>
                  <tr>
                    <th [sortable]="true" [active]="true" sortDirection="asc">Sorted</th>
                    <th [sortable]="true">Sortable</th>
                    <th>Static</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="kirby-selectable-row">
                    <td>Selectable</td>
                    <td>{{ surface }}</td>
                    <td>{{ state }}</td>
                  </tr>
                  <tr>
                    <td>Static</td>
                    <td>{{ surface }}</td>
                    <td>default</td>
                  </tr>
                </tbody>
              </table>
            </kirby-card>
          }
        }
      </div>
    `,
    styles: [gridStyles(tableStates.length, '320px')],
  }),
};
