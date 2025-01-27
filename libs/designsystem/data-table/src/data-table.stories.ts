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

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-data-table-example></cookbook-data-table-example>`,
  }),
};
