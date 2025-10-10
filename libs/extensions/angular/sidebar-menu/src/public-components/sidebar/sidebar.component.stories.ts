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
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'home',
    selected: true,
    link: { relativeLink: '/dashboard' },
  },
  {
    id: 'inbox',
    title: 'Inbox',
    icon: 'inbox-outline',
    badge: { value: '5', themeColor: 'danger' },
    link: { relativeLink: '/inbox' },
  },
  {
    id: 'accounts',
    title: 'Accounts',
    icon: 'accounts-outline',
    isExpanded: false,
    children: [],
  },
  {
    id: 'investments',
    title: 'Investments',
    icon: 'investment',
    link: { relativeLink: '/investments' },
  },
  {
    id: 'divider-1',
    isDivider: true,
  },
  {
    id: 'administration',
    title: 'Administration',
    icon: 'person-outline',
    isExpanded: true,
    children: [
      {
        id: 'users',
        title: 'Users',
        link: { relativeLink: '/users' },
      },
      {
        id: 'roles',
        title: 'Roles',
        link: { relativeLink: '/roles' },
      },
      {
        id: 'permissions',
        title: 'Permissions',
        link: { relativeLink: '/permissions' },
      },
    ],
  },
  {
    id: 'divider-2',
    isDivider: true,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'cog',
    isAction: true,
  },
  {
    id: 'help',
    title: 'Help',
    icon: 'support',
    link: { url: 'https://cookbook.kirby.design', target: '_blank' },
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
 * - *Submenus* can be expanded or collapsed, and can contain nested menu items.
 * - *Actions* are menu items that do not navigate but instead trigger an action when clicked.
 * - *Router links* navigate within the application using Angular's Router.
 * - *External links* navigate to an external URL in a new tab or the same tab based on the specified target.
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
    controls: {
      exclude: [
        'expandIconOnHover',
        'menuItemsChanged',
        'vm',
        '#sidebarService',
        '#menuStateService',
        '#setContainerHeight',
        '#setMenuHeight',
        '#setScrollDistance',
      ],
    },
  },
  argTypes: {
    menuItems: {
      description: 'Array of menu items to display in the sidebar',
      control: { type: 'object' },
    },
    autoCollapse: {
      description: 'Whether to auto-collapse other submenus when one is opened',
      control: { type: 'boolean' },
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
      </kirby-x-sidebar>`,
  }),
};

/**
 * Using the sidebar menu alongside a main content area.
 */
export const WithContent: Story = {
  args: {
    menuItems: menuItemsMock,
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
