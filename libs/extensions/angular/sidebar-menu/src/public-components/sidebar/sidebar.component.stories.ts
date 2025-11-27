import {
  applicationConfig,
  argsToTemplate,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import {
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarMenuItem,
} from '@kirbydesign/extensions-angular/sidebar-menu';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

const menuItemsExample: SidebarMenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    icon: 'home',
    link: { relativeLink: '/' },
    selected: true,
  },
  {
    id: 'inbox',
    title: 'Inbox',
    icon: 'inbox-outline',
    link: { relativeLink: '/inbox' },
    badge: { value: '2', themeColor: 'danger' },
  },
  {
    id: 'divider-1',
    isDivider: true,
  },
  {
    id: 'menu-item-1',
    title: 'Menu item 1',
    icon: 'copy',
    children: [
      {
        id: 'menu-item-1-1',
        title: 'Menu item 1.1',
        link: { relativeLink: '/menu-item/1/2' },
      },
      {
        id: 'menu-item-1-2',
        title: 'Menu item 1.2',
        children: [
          {
            id: 'menu-item-1-2-1',
            title: 'Menu item 1.2.1',
            link: { relativeLink: '/menu-1-sub-1-link-1' },
          },
          {
            id: 'menu-item-1-2-2',
            title: 'Menu item 1.2.2',
            children: [
              {
                id: 'menu-item-1-2-2-1',
                title: 'Menu item 1.2.2.1',
                link: { relativeLink: '/menu-1-sub-1-sub-1-link-1' },
              },
              {
                id: 'menu-item-1-2-2-2',
                title: 'Menu item 1.2.2.2',
                link: { relativeLink: '/menu-1-sub-1-sub-1-link-2' },
              },
            ],
          },
          {
            id: 'menu-item-1-2-3',
            title: 'Menu item 1.2.3',
            link: { relativeLink: '/menu-1-sub-1-link-2' },
          },
        ],
      },
      {
        id: 'menu-item-1-3',
        title: 'Menu item 1.3',
        link: { relativeLink: '/menu-1-link-2' },
      },
    ],
  },
  {
    id: 'menu-item-2',
    title: 'Menu Item 2',
    icon: 'copy',
    children: [
      {
        id: 'menu-item-2-1',
        title: 'Menu Item 2.1',
        link: { relativeLink: '/menu-2-link-1' },
      },
      {
        id: 'menu-item-2-2',
        title: 'Menu Item 2.2',
        children: [
          {
            id: 'menu-item-2-2-1',
            title: 'Menu Item 2.2.1',
            link: { relativeLink: '/menu-2-sub-1-link-1' },
          },
          {
            id: 'menu-item-2-2-2',
            title: 'Menu Item 2.2.2',
            children: [
              {
                id: 'menu-item-2-2-2-1',
                title: 'Menu item 2.2.2.1',
                link: { relativeLink: '/menu-2-sub-1-sub-1-link-1' },
              },
              {
                id: 'menu-item-2-2-2-2',
                title: 'Menu item 2.2.2.2',
                link: { relativeLink: '/menu-2-sub-1-sub-1-link-2' },
              },
            ],
          },
          {
            id: 'menu-item-2-2-3',
            title: 'Menu Item 2.2.3',
            children: [
              {
                id: 'menu-item-2-2-3-1',
                title: 'Menu item 2.2.3.1',
                link: { relativeLink: '/menu-2-sub-1-sub-2-link-1' },
              },
              {
                id: 'menu-item-2-2-3-2',
                title: 'Menu item 2.2.3.2',
                link: { relativeLink: '/menu-2-sub-1-sub-2-link-2' },
              },
            ],
          },
        ],
      },
      {
        id: 'menu-item-2-3',
        title: 'Menu item 2.3',
        children: [
          {
            id: 'menu-item-2-3-1',
            title: 'Menu item 2.3.1',
            link: { relativeLink: '/menu-2-sub-2-link-1' },
          },
          {
            id: 'menu-item-2-3-2',
            title: 'Menu item 2.3.2',
            children: [
              {
                id: 'menu-item-2-3-2-1',
                title: 'Menu item 2.3.2.1',
                link: { relativeLink: '/menu-2-sub-2-sub-1-link-1' },
              },
              {
                id: 'menu-item-2-3-2-2',
                title: 'Menu item 2.3.2.2',
                link: { relativeLink: '/menu-2-sub-2-sub-1-link-2' },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'divider-2',
    isDivider: true,
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: 'person-outline',
    link: { relativeLink: '/profile' },
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'settings',
    link: { relativeLink: '/settings' },
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'contact',
    link: { relativeLink: '/contact' },
  },
];

type SidebarPropsAndCustomArgs = SidebarComponent<SidebarMenuItem> & { mainAreaContent?: string };

/**
 *
 * > __Important:__ The design and behavior of this component is still being fine-tuned. <br>
 * > Please consult with Team Kirby before using in production channels.
 *
 * ## Sidebar Menu
 * The Sidebar Menu is designed to serve as the main navigation element in an application.
 * By default, it fills its container, but it is recommended to set a minimum width of 252px
 * and a maximum width of 328px to align with the Kirby Grid in the content area.
 *
 * ## Header and Footer
 * The component provides sticky header and footer, which can be used for elements such as logo and log out buttons.
 *
 * ## Menu Items
 * The menu structure is defined by providing a list of items, where each item should be defined as either a submenu, router link, or divider.
 *
 * - *Submenus* contain nested menu items.
 * - *Router links* navigate within the application using Angular's Router.
 * - *Dividers* are used to separate groups of menu items visually.
 *
 * Note: Items can also be configured as external links, but the design for this feature is not finalized yet.

 *
 */
const meta: Meta<SidebarPropsAndCustomArgs> = {
  title: 'Components/Sidebar',
  component: SidebarComponent<SidebarMenuItem>,
  decorators: [
    moduleMetadata({
      imports: [SidebarHeaderComponent, SidebarFooterComponent, ButtonComponent, IconComponent],
    }),
    applicationConfig({
      providers: [provideRouter([]), provideAnimations()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    menuItems: {
      description:
        'Array of menu items to display in the sidebar. Can be two-way bound. See <a href="https://github.com/kirbydesign/designsystem/blob/develop/libs/extensions/angular/sidebar-menu/src/models/menu-item.ts">SidebarMenuItem</a> interface for more information.',
      control: { type: 'object' },
      table: {
        type: { summary: 'SidebarMenuItem[]' },
      },
    },
    autoCollapse: {
      description: 'Whether to auto-collapse other submenus when one is opened',
      control: { type: 'boolean' },
    },
    menuItemsChange: {
      description: 'Event emitted when the menu items change',
      control: false,
    },
    afterMenuToggled: {
      description: 'Event emitted when a submenu is toggled',
      control: false,
    },
    afterMenuClicked: {
      description: 'Event emitted when a menu item is clicked',
      control: false,
    },
    expandIconOnHover: { table: { disable: true } },
    menuItemsChanged: { table: { disable: true } },
    changeMenuItems: { table: { disable: true } },
    mainAreaContent: { table: { disable: true } },
  },
  render: ({ mainAreaContent, ...args }) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: minmax(252px, 328px) minmax(85%, auto);">
        <kirby-x-sidebar ${argsToTemplate(args)}>
          <kirby-x-sidebar-header>
            <a href="/" slot="logo"><img src="assets/images/kirby-logo.svg" alt="Kirby Design System"/></a>
          </kirby-x-sidebar-header>
          <kirby-x-sidebar-footer>
            <div style="padding: var(--kirby-spacing-s); font-size: var(--kirby-font-size-xs); text-align: center;">
              <button kirby-button attentionLevel="3" size="sm">
                <kirby-icon name="log-out"></kirby-icon>
                Log out
              </button>
            </div>
          </kirby-x-sidebar-footer>
        </kirby-x-sidebar>
        <div style="padding: var(--kirby-spacing-s);">
          ${mainAreaContent}
        </div>
      </div>`,
  }),
};

export default meta;
type Story = StoryObj<SidebarPropsAndCustomArgs>;

/**
 * Using the sidebar menu alongside a main content area.
 */
export const Default: Story = {
  args: {
    menuItems: menuItemsExample,
    mainAreaContent: `<h1>Welcome to the main content area</h1>
    <p>This is where your main application content would go.</p>`,
  },
};

/**
 * The sidebar supports an `autoCollapse` feature, which, when enabled, ensures that only one submenu is expanded at a time.
 * When enabled, expanding a submenu will automatically collapse any other expanded submenus that aren't a direct parent of the chosen submenu.
 */
export const AutoCollapse: Story = {
  ...Default,
  args: {
    ...Default.args,
    autoCollapse: true,
    mainAreaContent: '<h1>Sidebar with Auto Collapse Items</h1>',
  },
};

/**
 * A sidebar with extra action buttons in the header.
 */
export const WithActions: Story = {
  ...Default,
  render: ({ mainAreaContent, ...args }) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: minmax(252px, 328px) minmax(85%, auto);">
        <kirby-x-sidebar ${argsToTemplate(args)}>
          <kirby-x-sidebar-header>
            <a href="/" slot="logo"><img src="assets/images/kirby-logo.svg" alt="Kirby Design System"/></a>
            <button kirby-button size="sm" attentionLevel="3" slot="action" style="display: flex; flex-grow: 1; justify-content: flex-start;">
              <kirby-icon name="search"></kirby-icon>
              <span>Search...</span>
            </button>
            <button kirby-button size="sm" attentionLevel="3" slot="action" aria-label="More settings">
              <kirby-icon name="more"></kirby-icon>
            </button>
          </kirby-x-sidebar-header>
        </kirby-x-sidebar>
        <div style="padding: var(--kirby-spacing-s);">
          ${mainAreaContent}
        </div>
      </div>`,
  }),
  args: {
    ...Default.args,
    mainAreaContent: '<h1>Sidebar with extra action buttons in the header</h1>',
  },
};

/**
 * A sidebar with toggle buttons on its items.
 */
export const WithToggleButtons: Story = {
  ...Default,
  args: {
    ...Default.args,
    menuItems: menuItemsExample.map(convertToToggleButtonsExample),
    mainAreaContent: '<h1>Sidebar with Toggle Buttons</h1>',
  },
};

function convertToToggleButtonsExample(item: SidebarMenuItem): SidebarMenuItem {
  if (item.children) {
    return {
      ...item,
      children: item.children.map(convertToToggleButtonsExample),
    };
  }
  return {
    ...item,
    toggle: {
      isChecked: false,
      uncheckedIcon: 'star',
      checkedIcon: 'star-fill',
    },
  };
}
