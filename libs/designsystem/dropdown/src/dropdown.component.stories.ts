import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

import { DropdownExampleModule } from '~/app/examples/dropdown-example/dropdown-example.module';

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'Components / Dropdown',
  decorators: [
    moduleMetadata({
      imports: [DropdownModule, DropdownExampleModule],
    }),
  ],
  argTypes: {
    selectedIndex: {
      options: ['asc', 'desc'],
      control: { type: 'radio' },
    },
    focusedIndex: {
      control: { type: 'number' },
    },
    expand: {
      control: { type: 'text' },
    },
  },
};
export default meta;
type Story = StoryObj<DropdownComponent>;

export const Dropdown: Story = {
  args: {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    placeholder: 'Please select:',
    itemTextProperty: 'text',
    attentionLevel: '3',
    disabled: false,
    hasError: false,
    size: 'md',
    selectedIndex: -1,
    tabindex: 0,
    usePopover: false,
  },
  argTypes: {
    attentionLevel: {
      options: ['1', '2', '3'],
      control: { type: 'radio' },
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'radio' },
    },
    expand: {
      options: [undefined, 'block'],
      control: { type: 'radio' },
    },
    focusedIndex: {
      table: {
        disable: true,
      },
    },
    selectedIndex: {
      control: { type: 'number' },
    },
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-dropdown-example></cookbook-dropdown-example>`,
  }),
};

export const CookbookExampleWithActions: Story = {
  ...CookbookExample,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownBtn = canvas.getByRole('button', {
      name: 'Dropdown with plain text',
    });

    await userEvent.click(dropdownBtn);
  },
};
