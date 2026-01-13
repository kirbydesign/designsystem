import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DropdownExampleComponent } from '~/app/examples/dropdown-example/dropdown-example.component';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'Components / Dropdown',
  decorators: [
    moduleMetadata({
      imports: [DropdownComponent, ButtonComponent, DropdownExampleComponent],
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
    size: 'md',
    selectedIndex: -1,
    tabindex: 0,
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

export const DropdownClosedOnOutsideClick: Story = {
  args: {
    items: items,
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-dropdown ${argsToTemplate(args)}></kirby-dropdown>
         <button kirby-button style="position: absolute; top: 0; right: 0;" data-testid="outside-close-btn">
        Outside Close
      </button>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdown = canvas.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    });

    const outsideButton = canvas.getByTestId('outside-close-btn');
    await userEvent.click(outsideButton);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    });
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

    const dropdownToOpen = canvas.getByRole('combobox');

    await userEvent.click(dropdownToOpen);
  },
};

export const DropdownOpenedTopRight: Story = {
  args: {
    items: items,
    selectedIndex: 0,
    popout: 'left',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: flex-end; width: 100%;">
        <kirby-dropdown ${argsToTemplate(args)}></kirby-dropdown>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdown = canvas.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

export const DropdownOpenedAtBottom: Story = {
  args: {
    items: items,
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; justify-content: flex-end; height: 400px;">
        <kirby-dropdown ${argsToTemplate(args)}></kirby-dropdown>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdown = canvas.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

export const DropdownOpenedBlockExpand: Story = {
  args: {
    items: items,
    selectedIndex: 0,
    expand: 'block',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px;">
        <kirby-dropdown ${argsToTemplate(args)}></kirby-dropdown>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdown = canvas.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

export const MultipleDropdowns: Story = {
  args: {
    items: items,
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px;">
        <kirby-dropdown ${argsToTemplate(args)} data-testid="dropdown-1"></kirby-dropdown>
        <kirby-dropdown ${argsToTemplate(args)} data-testid="dropdown-2"></kirby-dropdown>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dropdown1 = canvas.getByTestId('dropdown-1').querySelector('[role="combobox"]');
    await userEvent.click(dropdown1);

    await waitFor(() => {
      expect(dropdown1).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-dropdown-example></cookbook-dropdown-example>`,
  }),
};
