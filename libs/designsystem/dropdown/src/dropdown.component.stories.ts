import { Component, OnInit, signal } from '@angular/core';
import {
  argsToTemplate,
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { responsiveModes } from 'tools/storybook-config/shared-config';
import { DropdownExampleComponent } from '~/app/examples/dropdown-example/dropdown-example.component';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

@Component({
  selector: 'kirby-dropdown-dynamic-wrapper',
  standalone: true,
  imports: [DropdownComponent],
  template: `
    <kirby-dropdown
      aria-label="Choose your favorite item"
      [items]="items()"
      [placeholder]="items().length ? 'Please select:' : 'Loading...'"
    ></kirby-dropdown>
  `,
})
class DynamicItemsWrapperComponent implements OnInit {
  items = signal<string[]>([]);
  ngOnInit() {
    setTimeout(() => {
      this.items.set(['Async Item 1', 'Async Item 2', 'Async Item 3']);
    });
  }
}

const withPosition = (position: 'top-start' | 'top-end' | 'bottom-end') =>
  componentWrapperDecorator((story) => {
    switch (position) {
      case 'top-start':
        return `
          <div style="height: calc(100vh - var(--kirby-spacing-s) * 2);">
            <div style="position: absolute; bottom: var(--kirby-spacing-s);">
              ${story}
            </div>
          </div>`;
      case 'top-end':
        return `
          <div style="height: calc(100vh - var(--kirby-spacing-s) * 2);">
            <div style="position: absolute; bottom: var(--kirby-spacing-s); right: var(--kirby-spacing-s);">
              ${story}
            </div>
          </div>`;
      case 'bottom-end':
        return `
          <div style="display: flex; justify-content: flex-end; width: 100%;">
            ${story}
          </div>`;
      default:
        return story;
    }
  });

const meta: Meta<DropdownComponent> = {
  component: DropdownComponent,
  title: 'Components / Dropdown',
  parameters: {
    chromatic: { modes: { ...responsiveModes } },
  },
  decorators: [
    moduleMetadata({
      imports: [
        DropdownComponent,
        ButtonComponent,
        DropdownExampleComponent,
        DynamicItemsWrapperComponent,
      ],
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

const openDropdown: Story['play'] = async ({ canvasElement }) => {
  const dropdown = within(canvasElement).getByRole('combobox');
  await userEvent.click(dropdown);
  await waitFor(() => expect(dropdown).toHaveAttribute('aria-expanded', 'true'));
};

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
  decorators: [withPosition('bottom-end')],
  render: (args) => ({
    props: args,
    template: `<kirby-dropdown aria-label="Choose your favorite item" ${argsToTemplate(args)}></kirby-dropdown>`,
  }),
  play: openDropdown,
};

export const DropdownOpenedPopoutTopStart: Story = {
  args: {
    items: items,
    selectedIndex: 0,
  },
  decorators: [withPosition('top-start')],
  render: (args) => ({
    props: args,
    template: `<kirby-dropdown aria-label="Choose your favorite item" ${argsToTemplate(args)}></kirby-dropdown>`,
  }),
  play: openDropdown,
};

export const DropdownOpenedPopoutTopEnd: Story = {
  args: {
    items: items,
    selectedIndex: 0,
    popout: 'left',
  },
  decorators: [withPosition('top-end')],
  render: (args) => ({
    props: args,
    template: `<kirby-dropdown aria-label="Choose your favorite item" ${argsToTemplate(args)}></kirby-dropdown>`,
  }),
  play: openDropdown,
};

export const CookbookExample: Story = {
  render: () => ({
    template: `<cookbook-dropdown-example></cookbook-dropdown-example>`,
  }),
};

export const DropdownOpenedPopoutTopStartWithDynamicItems: Story = {
  decorators: [withPosition('top-start')],
  render: () => ({
    template: `<kirby-dropdown-dynamic-wrapper></kirby-dropdown-dynamic-wrapper>`,
  }),
  play: openDropdown,
};

export const DropdownOpenedPopoutBottomStartWithDynamicItems: Story = {
  render: () => ({
    template: `<kirby-dropdown-dynamic-wrapper></kirby-dropdown-dynamic-wrapper>`,
  }),
  play: openDropdown,
};
