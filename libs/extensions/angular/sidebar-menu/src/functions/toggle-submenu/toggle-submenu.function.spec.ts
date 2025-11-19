import { SidebarMenuItem } from '../../models';
import { toggleSubmenu } from './toggle-submenu.function';

const menuItemsMock: SidebarMenuItem[] = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'products',
    title: 'Products',
    isExpanded: true,
    children: [
      {
        id: 'product-1',
        title: 'Product 1',
      },
      {
        id: 'nested-parent',
        title: 'Nested Parent',
        isExpanded: false,
        children: [
          {
            id: 'nested-child',
            title: 'Nested Child',
          },
        ],
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    isExpanded: false,
    children: [
      {
        id: 'general',
        title: 'General',
        isExpanded: false,
        children: [
          {
            id: 'profile',
            title: 'Profile',
          },
        ],
      },
    ],
  },
];

describe('Function: toggleSubmenu', () => {
  it('should expand collapsed menu', () => {
    const result = toggleSubmenu('home', menuItemsMock);

    expect(result[0].isExpanded).toBe(true);
  });

  it('should collapse expanded menu', () => {
    const result = toggleSubmenu('products', menuItemsMock);

    expect(result[1].isExpanded).toBe(false);
  });

  it('should toggle nested submenu', () => {
    const result = toggleSubmenu('product-1', menuItemsMock);

    expect(result[1].children?.[0].isExpanded).toBe(true);
  });

  it('should NOT toggle nested submenu when parent is collapsed', () => {
    const result = toggleSubmenu('general', menuItemsMock);

    expect(result[2].children?.[0].isExpanded).toBe(false);
  });
});
