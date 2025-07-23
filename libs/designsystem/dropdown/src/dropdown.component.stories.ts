import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { userEvent, within } from '@storybook/test';

import { DropdownComponent, DropdownModule } from '@kirbydesign/designsystem/dropdown';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownExampleComponent } from '~/app/examples/dropdown-example/dropdown-example.component';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'Components / Dropdown',
  decorators: [
    moduleMetadata({
      imports: [DropdownModule, ButtonComponent, DropdownExampleComponent],
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
    items: items,
    placeholder: 'Please select:',
    itemTextProperty: 'text',
    attentionLevel: '3',
    disabled: false,
    hasError: false,
    errorMessage: '',
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

export const DropdownOpened: Story = {
  args: {
    items: items,
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-dropdown ${argsToTemplate(args)}></kirby-dropdown>
      <br />
      <button kirby-button>Button - below</button>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdownToOpen = canvas.getByRole('button', {
      name: 'Item 1',
    });

    await userEvent.click(dropdownToOpen);
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-dropdown-example></cookbook-dropdown-example>`,
  }),
};
