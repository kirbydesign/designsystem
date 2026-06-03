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
  SidebarMenuContentComponent,
  SidebarMenuItem,
} from '@kirbydesign/extensions-angular/sidebar-menu';
import { SkeletonLoaderComponent } from '@kirbydesign/extensions-angular/skeleton-loader';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';

const menuItemsExample: SidebarMenuItem[] = [
  {
    type: 'router-link',
    id: 'home',
    title: 'Home',
    icon: 'home',
    route: '/',
  },
  {
    type: 'router-link',
    id: 'inbox',
    title: 'Inbox',
    icon: 'inbox-outline',
    route: '/inbox',
    badge: { value: '2', themeColor: 'danger' },
  },
  {
    type: 'divider',
    id: 'divider-1',
  },
  {
    type: 'submenu',
    id: 'favorites',
    title: 'Favorites',
    icon: 'copy',
    children: [
      {
        type: 'router-link',
        id: 'menu-item-apple',
        title: 'Apple',
        route: '/menu-item/apple',
      },
      {
        type: 'router-link',
        id: 'menu-item-banana',
        title: 'Banana',
        route: '/menu-item/banana',
      },
      {
        type: 'router-link',
        id: 'menu-item-lemon',
        title: 'Lemon',
        route: '/menu-item/lemon',
      },
      {
        type: 'router-link',
        id: 'menu-item-pear',
        title: 'Pear',
        route: '/menu-item/pear',
      },
    ],
  },
  {
    type: 'divider',
    id: 'divider-2',
  },
  {
    type: 'submenu',
    id: 'menu-item-1',
    title: 'Menu item 1',
    icon: 'copy',
    children: [
      {
        type: 'router-link',
        id: 'menu-item-1-1',
        title: 'Menu item 1.1',
        route: '/menu-item/1/2',
      },
      {
        type: 'submenu',
        id: 'menu-item-1-2',
        title: 'Menu item 1.2',
        children: [
          {
            type: 'router-link',
            id: 'menu-item-1-2-1',
            title: 'Menu item 1.2.1',
            route: '/menu-1-sub-1-link-1',
          },
          {
            type: 'submenu',
            id: 'menu-item-1-2-2',
            title: 'Menu item 1.2.2',
            children: [
              {
                type: 'router-link',
                id: 'menu-item-1-2-2-1',
                title: 'Menu item 1.2.2.1',
                route: '/menu-1-sub-1-sub-1-link-1',
              },
              {
                type: 'router-link',
                id: 'menu-item-1-2-2-2',
                title: 'Menu item 1.2.2.2',
                route: '/menu-1-sub-1-sub-1-link-2',
              },
            ],
          },
          {
            type: 'router-link',
            id: 'menu-item-1-2-3',
            title: 'Menu item 1.2.3',
            route: '/menu-1-sub-1-link-2',
          },
        ],
      },
      {
        type: 'router-link',
        id: 'menu-item-1-3',
        title: 'Menu item 1.3',
        route: '/menu-1-link-2',
      },
    ],
  },
  {
    type: 'submenu',
    id: 'menu-item-2',
    title: 'Menu Item 2',
    icon: 'copy',
    children: [
      {
        type: 'router-link',
        id: 'menu-item-2-1',
        title: 'Menu Item 2.1',
        route: '/menu-2-link-1',
      },
      {
        type: 'submenu',
        id: 'menu-item-2-2',
        title: 'Menu Item 2.2',
        children: [
          {
            type: 'router-link',
            id: 'menu-item-2-2-1',
            title: 'Menu Item 2.2.1',
            route: '/menu-2-sub-1-link-1',
          },
          {
            type: 'submenu',
            id: 'menu-item-2-2-2',
            title: 'Menu Item 2.2.2',
            children: [
              {
                type: 'router-link',
                id: 'menu-item-2-2-2-1',
                title: 'Menu item 2.2.2.1',
                route: '/menu-2-sub-1-sub-1-link-1',
              },
              {
                type: 'router-link',
                id: 'menu-item-2-2-2-2',
                title: 'Menu item 2.2.2.2',
                route: '/menu-2-sub-1-sub-1-link-2',
              },
            ],
          },
          {
            type: 'submenu',
            id: 'menu-item-2-2-3',
            title: 'Menu Item 2.2.3',
            children: [
              {
                type: 'router-link',
                id: 'menu-item-2-2-3-1',
                title: 'Menu item 2.2.3.1',
                route: '/menu-2-sub-1-sub-2-link-1',
              },
              {
                type: 'router-link',
                id: 'menu-item-2-2-3-2',
                title: 'Menu item 2.2.3.2',
                route: '/menu-2-sub-1-sub-2-link-2',
              },
            ],
          },
        ],
      },
      {
        type: 'submenu',
        id: 'menu-item-2-3',
        title: 'Menu item 2.3',
        children: [
          {
            type: 'router-link',
            id: 'menu-item-2-3-1',
            title: 'Menu item 2.3.1',
            route: '/menu-2-sub-2-link-1',
          },
          {
            type: 'submenu',
            id: 'menu-item-2-3-2',
            title: 'Menu item 2.3.2',
            children: [
              {
                type: 'router-link',
                id: 'menu-item-2-3-2-1',
                title: 'Menu item 2.3.2.1',
                route: '/menu-2-sub-2-sub-1-link-1',
              },
              {
                type: 'router-link',
                id: 'menu-item-2-3-2-2',
                title: 'Menu item 2.3.2.2',
                route: '/menu-2-sub-2-sub-1-link-2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'divider',
    id: 'divider-3',
  },
  {
    type: 'router-link',
    id: 'profile',
    title: 'Profile',
    icon: 'person-outline',
    route: '/profile',
  },
  {
    type: 'router-link',
    id: 'settings',
    title: 'Settings',
    icon: 'cog',
    route: '/settings',
  },
  {
    type: 'router-link',
    id: 'contact',
    title: 'Contact',
    icon: 'contact',
    route: '/contact',
  },
];
const menuItemsWithExternalLinks: SidebarMenuItem[] = [
  ...menuItemsExample,
  {
    type: 'external-link',
    id: 'external-link-1',
    title: 'External Link 1',
    icon: 'balloon',
    url: 'https://example.com/external-link-1',
  },
];

type SidebarPropsAndCustomArgs = SidebarComponent &
  Partial<SidebarMenuContentComponent> & { mainAreaContent?: string };

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
 * - *External links* navigate to external URLs and can open in a new tab. They have an external link icon at the end to indicate that they lead to an external destination.
 *
 *
 */
const meta: Meta<SidebarPropsAndCustomArgs> = {
  title: 'Components/Sidebar',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        SidebarHeaderComponent,
        SidebarFooterComponent,
        SidebarMenuContentComponent,
        SkeletonLoaderComponent,
        ButtonComponent,
        IconComponent,
      ],
    }),
    applicationConfig({
      providers: [provideRouter([]), provideAnimations()],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['#stateService'],
    },
  },
  argTypes: {
    menuItems: {
      description: 'Array of menu items to display in the sidebar.',
      control: { type: 'object' },
    },
    selectedItem: {
      description: 'The id of the selected menu item. Can be two-way bound.',
      control: { type: 'text' },
    },
    expandedItems: {
      description: 'The ids of the expanded submenu items. Can be two-way bound.',
      control: { type: 'object' },
    },
    checkedItems: {
      description: 'The ids of the menu items with checked toggle buttons. Can be two-way bound.',
      control: { type: 'object' },
    },
    autoCollapse: {
      description: 'Whether to auto-collapse other submenus when one is opened',
      control: { type: 'boolean' },
    },
    selectedItemChange: {
      description: 'Event emitted when a new menu item is selected',
      control: false,
    },
    expandedItemsChange: {
      description: 'Event emitted when the set of expanded submenu items changes',
      control: false,
    },
    checkedItemsChange: {
      description: 'Event emitted when the set of checked menu item toggles changes',
      control: false,
    },
    expandChange: {
      description: 'Event emitted when a submenu item is expanded/collapsed',
      control: false,
    },
    checkChange: {
      description: 'Event emitted when a menu item toggle is checked/unchecked',
      control: false,
    },
    itemReorder: {
      description: 'Event emitted when menu items are reordered',
      control: false,
    },
    itemSelect: {
      description: 'Event emitted when a menu item is selected',
      control: false,
    },
    menuItemsChange: {
      description: 'Event emitted when the menu items input changes',
      control: false,
    },
    mainAreaContent: { table: { disable: true } },
  },
  render: ({ mainAreaContent, ...args }) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: minmax(252px, 328px) minmax(85%, auto);">
        <kirby-x-sidebar>
          <kirby-x-sidebar-header>
            <a href="/" slot="logo"><img src="assets/images/kirby-logo.svg" alt="Kirby Design System"/></a>
          </kirby-x-sidebar-header>
          <kirby-x-sidebar-menu ${argsToTemplate(args)}></kirby-x-sidebar-menu>
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
    selectedItem: 'home',
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
 * A sidebar with extra action buttons in the header but no logo link.
 */
export const WithActions: Story = {
  ...Default,
  render: ({ mainAreaContent, ...args }) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: minmax(252px, 328px) minmax(85%, auto);">
        <kirby-x-sidebar>
          <kirby-x-sidebar-header>
            <img slot="logo" src="assets/images/kirby-logo.svg" alt="Kirby Design System"/>
            <button kirby-button size="sm" attentionLevel="3" slot="action" style="display: flex; flex-grow: 1; justify-content: flex-start;">
              <kirby-icon name="search"></kirby-icon>
              <span>Search...</span>
            </button>
            <button kirby-button size="sm" attentionLevel="3" slot="action" aria-label="More settings">
              <kirby-icon name="more"></kirby-icon>
            </button>
          </kirby-x-sidebar-header>
          <kirby-x-sidebar-menu ${argsToTemplate(args)}></kirby-x-sidebar-menu>
        </kirby-x-sidebar>
        <div style="padding: var(--kirby-spacing-s);">
          ${mainAreaContent}
        </div>
      </div>`,
  }),
  args: {
    ...Default.args,
    mainAreaContent: '<h1>Sidebar with extra action buttons in the header but no logo link</h1>',
  },
};

/**
 * A sidebar that highlights external-link and action items which display an external link icon.
 */
export const WithExternalLinkIcons: Story = {
  ...Default,
  args: {
    ...Default.args,
    menuItems: menuItemsWithExternalLinks,
    mainAreaContent:
      '<h1>Sidebar with External Link Icons</h1><p>External link and action items display an external link icon.</p>',
  },
};

/**
 * A sidebar with toggle buttons on its items.
 *
 * > __Important:__ The current implementation of toggle buttons in the sidebar menu is not WCAG compliant.
 * > It is therefore recommended to avoid using this feature in consumer-facing solutions that should adhere to accessibility standards.
 */
export const WithToggleButtons: Story = {
  ...Default,
  args: {
    ...Default.args,
    menuItems: menuItemsWithExternalLinks.map(convertToToggleButtonsExample),
    mainAreaContent: '<h1>Sidebar with Toggle Buttons</h1>',
  },
};

function convertToToggleButtonsExample(item: SidebarMenuItem): SidebarMenuItem {
  if (item.type === 'divider') {
    return item;
  }
  if (item.type === 'submenu') {
    return {
      ...item,
      children: item.children.map(convertToToggleButtonsExample),
    };
  }
  return {
    ...item,
    toggle: {
      uncheckedIcon: 'star',
      checkedIcon: 'star-fill',
    },
  };
}

/**
 * A sidebar with menu items that can be re-ordered. Re-ordering should be limited to the top-level items inside a sub-menu, demonstrated in this example through the "Favorites" menu item.
 *
 * > __Important:__ The current implementation of reorderable items in the sidebar menu is not WCAG compliant.
 * > It is therefore recommended to avoid using this feature in consumer-facing solutions that should adhere to accessibility standards.
 */
export const WithReorderableMenuItems: Story = {
  ...Default,
  args: {
    ...Default.args,
    menuItems: menuItemsExample.map(convertToReorderableExample),
    mainAreaContent: '<h1>Sidebar with reorderable favorites submenu items</h1>',
  },
};

function convertToReorderableExample(item: SidebarMenuItem): SidebarMenuItem {
  if (item.type === 'submenu' && item.id === 'favorites') {
    return {
      ...item,
      isReorderable: true,
      children: item.children.map(convertToReorderableExample),
    };
  }
  return {
    ...item,
  };
}

/**
 * Simulates the menu items loading slowly. A skeleton loader is shown
 * inside the menu content area while the items are being fetched, and
 * is replaced by the real menu items once they arrive.
 */
export const SlowLoadingMenuItems: Story = {
  render: ({ mainAreaContent, ...args }) => {
    const menuItems = signal<SidebarMenuItem[] | null>(null);
    setTimeout(() => menuItems.set(menuItemsExample), 2000);
    return {
      props: {
        ...args,
        expandedItems: args.expandedItems ?? new Set<string>(),
        checkedItems: args.checkedItems ?? new Set<string>(),
        autoCollapse: args.autoCollapse ?? false,
        menuItems,
        mainAreaContent,
      },
      template: `
        <div style="display: grid; grid-template-columns: minmax(252px, 328px) minmax(85%, auto);">
          <kirby-x-sidebar>
            <kirby-x-sidebar-header>
              <a href="/" slot="logo"><img src="assets/images/kirby-logo.svg" alt="Kirby Design System"/></a>
            </kirby-x-sidebar-header>
            @if (menuItems(); as loadedItems) {
              <kirby-x-sidebar-menu
                [menuItems]="loadedItems"
                [selectedItem]="selectedItem"
                [expandedItems]="expandedItems"
                [checkedItems]="checkedItems"
                [autoCollapse]="autoCollapse">
              </kirby-x-sidebar-menu>
            } @else {
              <kirby-x-sidebar-menu>
                <div style="display: flex; flex-direction: column; gap: var(--kirby-spacing-xs); padding: var(--kirby-spacing-xs);">
                  <kirby-x-skeleton-loader theme="dark" shape="pill" style="width: 100%; height: 32px;"></kirby-x-skeleton-loader>
                  <kirby-x-skeleton-loader theme="dark" shape="pill" style="width: 100%; height: 32px;"></kirby-x-skeleton-loader>
                  <kirby-x-skeleton-loader theme="dark" shape="pill" style="width: 100%; height: 32px;"></kirby-x-skeleton-loader>
                  <kirby-x-skeleton-loader theme="dark" shape="pill" style="width: 100%; height: 32px;"></kirby-x-skeleton-loader>
                  <kirby-x-skeleton-loader theme="dark" shape="pill" style="width: 100%; height: 32px;"></kirby-x-skeleton-loader>
                </div>
              </kirby-x-sidebar-menu>
            }<kirby-x-sidebar-footer>
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
    };
  },
  args: {
    ...Default.args,
    mainAreaContent:
      '<h1>Sidebar with slow loading menu items</h1><p>The skeleton loader is shown until the menu items arrive.</p>',
  },
};
