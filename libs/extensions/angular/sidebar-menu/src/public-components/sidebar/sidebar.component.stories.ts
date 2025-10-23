import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import {
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarMenuItem,
} from '@kirbydesign/extensions-angular/sidebar-menu';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconModule } from '@kirbydesign/designsystem/icon';

const menuItemsMock: SidebarMenuItem[] = [
  {
    id: 'router-link',
    title: 'Router Link',
    icon: 'home',
    link: { relativeLink: '/' },
  },
  {
    id: 'item-with-badge',
    title: 'Item with Badge',
    icon: 'notification',
    link: { relativeLink: '/notifications' },
    badge: { value: '3', themeColor: 'danger' },
  },
  {
    id: 'submenu-1',
    title: 'Submenu 1',
    icon: 'misc',
    isExpanded: true,
    children: [
      {
        id: 'item-1.1',
        title: 'Item 1.1',
        isAction: true,
      },
      {
        id: 'item-1.2',
        title: 'Item 1.2',
        isExpanded: true,
        children: [
          {
            id: 'item-1.2.1',
            title: 'Item 1.2.1',
            isAction: true,
          },
          {
            id: 'item-1.2.2',
            title: 'Item 1.2.2',
            isExpanded: true,
            children: [
              {
                id: 'item-1.2.2.1',
                title: 'Item 1.2.2.1',
                isAction: true,
              },
              {
                id: 'item-1.2.2.2',
                title: 'Item 1.2.2.2',
                isAction: true,
                selected: true,
              },
              {
                id: 'item-1.2.2.3',
                title: 'Item 1.2.2.3',
                isAction: true,
              },
            ],
          },
          {
            id: 'item-1.2.3',
            title: 'Item 1.2.3',
            isExpanded: false,
            children: [
              {
                id: 'item-1.2.3.1',
                title: 'Item 1.2.3.1',
                isAction: true,
              },
              {
                id: 'item-1.2.3.2',
                title: 'Item 1.2.3.2',
                isAction: true,
              },
              {
                id: 'item-1.2.3.3',
                title: 'Item 1.2.3.3',
                isAction: true,
              },
            ],
          },
          {
            id: 'item-1.2.4',
            title: 'Item 1.2.4',
            isAction: true,
          },
        ],
      },
      {
        id: 'item-1.3',
        title: 'Item 1.3',
        isAction: true,
      },
      {
        id: 'item-1.4',
        title: 'Item 1.4',
        isExpanded: false,
        children: [
          {
            id: 'item-1.4.1',
            title: 'Item 1.4.1',
            isAction: true,
          },
          {
            id: 'item-1.4.2',
            title: 'Item 1.4.2',
            isAction: true,
          },
          {
            id: 'item-1.4.3',
            title: 'Item 1.4.3',
            isAction: true,
          },
        ],
      },
    ],
  },
  {
    id: 'divider-1',
    isDivider: true,
  },
  {
    id: 'submenu',
    title: 'Submenu 2',
    icon: 'misc',
    isExpanded: true,
    children: [
      {
        id: 'item-2.1',
        title: 'Item 2.1',
        isExpanded: false,
        children: [
          {
            id: 'item-2.1.1',
            title: 'Item 2.1.1',
            isAction: true,
          },
          {
            id: 'item-2.1.2',
            title: 'Item 2.1.2',
            isAction: true,
          },
          {
            id: 'item-2.1.3',
            title: 'Item 2.1.3',
            isAction: true,
          },
        ],
      },
      {
        id: 'item-2.2',
        title: 'Item 2.2',
        isExpanded: false,
        children: [
          {
            id: 'item-2.2.1',
            title: 'Item 2.2.1',
            isAction: true,
          },
          {
            id: 'item-2.2.2',
            title: 'Item 2.2.2',
            isExpanded: false,
            children: [
              {
                id: 'item-2.2.2.1',
                title: 'Item 2.2.2.1',
                isAction: true,
              },
              {
                id: 'item-2.2.2.3',
                title: 'Item 2.2.2.3',
                isAction: true,
              },
            ],
          },
          {
            id: 'item-2.2.3',
            title: 'Item 2.2.3',
            isAction: true,
          },
        ],
      },
      {
        id: 'item-2.3',
        title: 'Item 2.3',
        isAction: true,
      },
    ],
  },
  {
    id: 'divider-2',
    isDivider: true,
  },
  {
    id: 'external-link',
    title: 'External Link',
    icon: 'link',
    link: { url: 'https://cookbook.kirby.design', target: '_blank' },
  },
  {
    id: 'action',
    title: 'Action',
    icon: 'contact',
    isAction: true,
  },
];

const menuItemsExample: SidebarMenuItem[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: 'home',
    link: { relativeLink: '/' },
  },
  {
    id: 'guides',
    title: 'Guides',
    icon: 'history',
    link: { relativeLink: '/guides' },
    badge: { value: 'NEW', themeColor: 'danger' },
  },
  {
    id: 'divider-1',
    isDivider: true,
  },
  {
    id: 'extensions',
    title: 'Extensions',
    icon: 'misc',
    isExpanded: true,
    children: [
      {
        id: 'pipes',
        title: 'Pipes',
        isExpanded: false,
        children: [
          {
            id: 'localization-pipe',
            title: 'Localization',
            isExpanded: false,
            children: [
              {
                id: 'localization-pipe-formatting',
                title: 'Formatting',
                isAction: true,
              },
            ],
          },
        ],
      },
      {
        id: 'components',
        title: 'Components',
        isExpanded: true,
        children: [
          {
            id: 'banner',
            title: 'Banner',
            isExpanded: false,
            children: [
              {
                id: 'image-banner',
                title: 'Image Banner',
                isAction: true,
              },
            ],
          },
          {
            id: 'sidebar',
            title: 'Sidebar',
            isExpanded: true,
            children: [
              {
                id: 'sidebar-menu',
                title: 'Sidebar Menu',
                isAction: true,
                selected: true,
              },
            ],
          },
          {
            id: 'loaders',
            title: 'Loaders',
            isExpanded: false,
            children: [
              {
                id: 'skeleton-loader',
                title: 'Skeleton Loader',
                isAction: true,
              },
            ],
          },
          {
            id: 'spot-illustration',
            title: 'Spot Illustration',
            isAction: true,
          },
        ],
      },
      {
        id: 'examples',
        title: 'Examples',
        link: { relativeLink: '/examples' },
      },
    ],
  },
  {
    id: 'divider-2',
    isDivider: true,
  },
  {
    id: 'cookbook',
    title: 'Cookbook',
    icon: 'overview-outline',
    link: { url: 'https://cookbook.kirby.design' },
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: 'contact',
    isAction: true,
  },
];

/**
 * The sidebar menu is meant to be used as the main navigation in an application.
 * While designed with the intention of being used as a vertical sidebar, it is up to the user to provide the correct styling and layout to fit their use case.
 *
 * ## Header and Footer
 * The sidebar component provides slots for a header and footer, allowing for easy customization and branding.
 *
 * ## Menu Items
 * The menu structure is defined by providing a list of items, where each item should be defined as either a submenu, action, router link, external link, or divider.
 *
 * - *Submenus* contain nested menu items.
 * - *Actions* are menu items that do not navigate, and as such can be useful for defining custom behaviour when clicked.
 * - *Router links* navigate within the application using Angular's Router.
 * - *External links* navigate to an external URL, either in the same tab (default) or in a new tab based on the specified target.
 * - *Dividers* are used to separate groups of menu items visually.
 *
 * ## Auto-Collapse
 * The sidebar menu supports an `autoCollapse` feature, which, when enabled, ensures that only one submenu is expanded at a time.
 * When enabled, expanding a submenu will automatically collapse any other expanded submenus that aren't a direct parent of the chosen submenu.
 */
const meta: Meta<SidebarComponent<SidebarMenuItem>> = {
  title: 'Components/Sidebar/Sidebar Menu',
  component: SidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [SidebarHeaderComponent, SidebarFooterComponent, IconModule],
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
      description: 'Array of menu items to display in the sidebar. Can be two-way bound.',
      control: { type: 'object' },
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
  },
};

export default meta;
type Story = StoryObj<SidebarComponent<SidebarMenuItem>>;

/**
 * Using the sidebar menu on its own.
 */
export const Default: Story = {
  args: {
    menuItems: menuItemsMock,
    autoCollapse: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <kirby-x-sidebar [(menuItems)]="menuItems" [autoCollapse]="autoCollapse">
        <kirby-x-sidebar-header>
          <div style="display: flex; align-items: center; padding: 16px;">
            <kirby-icon name="overview-outline"></kirby-icon>
            <span style="font-weight: bold; font-size: 24px; margin-left: 10px;">Kirby_</span>
          </div>
        </kirby-x-sidebar-header>
        <kirby-x-sidebar-footer>
          <div style="padding: 16px; text-align: center; font-size: 12px; color: #666;">
            &copy; 2025 Kirby Design
          </div>
        </kirby-x-sidebar-footer>
      </kirby-x-sidebar>`,
  }),
};

/**
 * Using the sidebar menu alongside a main content area.
 */
export const WithContent: Story = {
  args: {
    menuItems: menuItemsExample,
    autoCollapse: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: grid; grid-template-columns: minmax(252px, 328px) minmax(85%, auto);">
        <kirby-x-sidebar [(menuItems)]="menuItems" [autoCollapse]="autoCollapse" (afterMenuClicked)="afterMenuClicked($event)" (afterMenuToggled)="afterMenuToggled($event)">
          <kirby-x-sidebar-header>
            <div style="display: flex; align-items: center; padding: 16px;">
              <kirby-icon name="overview-outline"></kirby-icon>
              <span style="font-weight: bold; font-size: 24px; margin-left: 10px;">Kirby_</span>
            </div>
          </kirby-x-sidebar-header>
          <kirby-x-sidebar-footer>
            <div style="padding: 16px; text-align: center; font-size: 12px; color: #666;">
              &copy; 2025 Kirby Design
            </div>
          </kirby-x-sidebar-footer>
        </kirby-x-sidebar>
        <div style="padding: 16px;">
          <h1>Welcome to the main content area</h1>
          <p>This is where your main application content would go.</p>
        </div>
      </div>`,
  }),
};
