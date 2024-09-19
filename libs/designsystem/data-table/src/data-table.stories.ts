import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { TableSortableComponent } from '@kirbydesign/designsystem/data-table';

import { DataTableExampleModule } from '~/app/examples/data-table-example/table-example.module';

const meta: Meta<TableSortableComponent> = {
  component: TableSortableComponent,
  title: 'Components / Data Table',
  decorators: [
    moduleMetadata({
      imports: [DataTableExampleModule],
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
