import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { responsiveModes } from 'tools/storybook-config/shared-config';
import { DropdownExampleComponent } from '~/app/examples/dropdown-example/dropdown-example.component';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'Components / Dropdown',
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
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
  parameters: {
    chromatic: {
      modes: {
        mobile: { disable: true },
      },
    },
  },
  args: {
    items: items,
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-dropdown aria-label="Choose your favorite item" ${argsToTemplate(args)}></kirby-dropdown>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const dropdown = canvas.getByRole('combobox');
    await userEvent.click(dropdown);

    await waitFor(() => {
      expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    });

    const popoverBackdrop = document.querySelector('kirby-popover') as HTMLElement;
    await userEvent.click(popoverBackdrop);

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
      <kirby-dropdown aria-label="Choose your favorite item" ${argsToTemplate(args)}></kirby-dropdown>
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

export const DropdownOpenedPopoutBottomEnd: Story = {
  args: {
    items: items,
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: flex-end; width: 100%;">
        <kirby-dropdown aria-label="Choose your favorite item" ${argsToTemplate(args)}></kirby-dropdown>
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

export const DropdownOpenedPopoutTopStart: Story = {
  args: {
    items: items,
    selectedIndex: 0,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: calc(100vh - var(--kirby-spacing-s) * 2);"> <!-- Adapt to full height of storybook root accounting for padding -->
        <kirby-dropdown aria-label="Choose your favorite item" style="position: absolute; bottom: var(--kirby-spacing-s);" ${argsToTemplate(args)}></kirby-dropdown>
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

export const DropdownOpenedPopoutTopEnd: Story = {
  args: {
    items: items,
    selectedIndex: 0,
    popout: 'left',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: calc(100vh - var(--kirby-spacing-s) * 2);"> <!-- Adapt to full height of storybook root accounting for padding -->
        <kirby-dropdown aria-label="Choose your favorite item" style="position: absolute; bottom: var(--kirby-spacing-s); right: var(--kirby-spacing-s);" ${argsToTemplate(args)}></kirby-dropdown>
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

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-dropdown-example></cookbook-dropdown-example>`,
  }),
};

const createDynamicItemsStory = (direction: 'up' | 'down'): Story => {
  const isUp = direction === 'up';
  return {
    render: () => ({
      props: { dynamicItems: [] as string[] },
      template: `
        <div style="${isUp ? 'height: calc(100vh - var(--kirby-spacing-s) * 2);' : ''}">
          <button (click)="dynamicItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']" style="display: none;">Load items</button>
          <kirby-dropdown aria-label="Choose your favorite item" ${isUp ? 'style="position: absolute; bottom: var(--kirby-spacing-s);"' : ''} [items]="dynamicItems"></kirby-dropdown>
        </div>
      `,
    }),
    play: async ({ canvasElement }) => {
      // Simulate items being added after the dropdown has been initialized.
      // Use native .click() so the Angular event binding fires regardless of display:none.
      (canvasElement.querySelector('button') as HTMLButtonElement).click();

      const canvas = within(canvasElement);
      const dropdown = canvas.getByRole('combobox');
      await userEvent.click(dropdown);

      await waitFor(() => {
        expect(dropdown).toHaveAttribute('aria-expanded', 'true');
      });
    },
  };
};

export const DropdownOpenedPopoutTopStartWithDynamicItems: Story = createDynamicItemsStory('up');

export const DropdownOpenedPopoutBottomStartWithDynamicItems: Story =
  createDynamicItemsStory('down');
