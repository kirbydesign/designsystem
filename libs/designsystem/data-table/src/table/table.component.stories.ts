import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { TableSortableComponent } from '../sortable/sortable.component';

const meta: Meta<TableSortableComponent> = {
  component: TableSortableComponent,
  title: 'Data Table',
  decorators: [
    moduleMetadata({
      imports: [IconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<TableSortableComponent>;

export const TestGrid: Story = {
  argTypes: {
    sortDirection: {
      options: ['asc', 'desc'],
      control: { type: 'radio' },
    },
    iconAlignment: {
      options: ['start', 'end'],
      control: { type: 'radio' },
    },
    alignment: {
      options: ['start', 'center', 'end'],
      control: { type: 'radio' },
    },
  },
  args: {
    sortable: false,
    active: false,
  },
  render: (args: TableSortableComponent) => ({
    props: args,
    template: `<table class="kirby-table layout-fixed">
    <thead>
      <tr>
        <th ${argsToTemplate(args)}>Name</th>
        <th style="text-align:right;">Height (cm)</th>
        <th style="text-align:right;">Weight (kg)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td>Luke Skywalker</td>
          <td style="text-align:right;">172</td>
          <td style="text-align:right;">77</td>
      </tr>
      <tr>
          <td>C-3PO</td>
          <td style="text-align:right;">167</td>
          <td style="text-align:right;">75</td>
      </tr>
      <tr>
          <td>R2-D2</td>
          <td style="text-align:right;">96</td>
          <td style="text-align:right;">32</td>
      </tr>
    </tbody>
  </table>`,
  }),
};
