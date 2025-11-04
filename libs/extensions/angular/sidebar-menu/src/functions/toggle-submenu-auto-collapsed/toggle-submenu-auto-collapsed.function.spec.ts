import { SidebarMenuItem } from '../../models';
import { toggleSubmenuAutoCollapsed } from './toggle-submenu-auto-collapsed.function';

const menuItemsMock: SidebarMenuItem[] = [
  {
    id: 'products',
    title: 'Products',
    isExpanded: true,
    children: [
      {
        id: 'product-1',
        title: 'Product 1',
        isExpanded: true,
        children: [
          {
            id: 'sub-product-1',
            title: 'Sub Product 1',
            isExpanded: false,
            children: [{ id: 'deep-sub-product-1', title: 'Deep Sub Product 1' }],
          },
          {
            id: 'sub-product-2',
            title: 'Sub Product 2',
            isExpanded: true,
            children: [{ id: 'deep-sub-product-2', title: 'Deep Sub Product 2' }],
          },
        ],
      },
      {
        id: 'product-2',
        title: 'Product 2',
        isExpanded: false,
        children: [{ id: 'sub-product-2', title: 'Sub Product 2' }],
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

describe('Function: toggleSubmenuAutoCollapsed', () => {
  it('should expand collapsed submenu and collapse all siblings and their children', () => {
    const result = toggleSubmenuAutoCollapsed('product-2', menuItemsMock);

    expect(result[0].children?.[1].isExpanded).toBe(true);
    expect(result[0].children?.[0].isExpanded).toBe(false);
    expect(result[0].children?.[0].children?.[1].isExpanded).toBe(false);
  });

  it('should collapse expanded submenu and its children', () => {
    const result = toggleSubmenuAutoCollapsed('products', menuItemsMock);

    expect(result[0].isExpanded).toBe(false);
    expect(result[0].children?.[0].isExpanded).toBe(false);
    expect(result[0].children?.[0].children?.[1].isExpanded).toBe(false);
  });

  it('should not collapse ancestors when expanding nested submenu', () => {
    const result = toggleSubmenuAutoCollapsed('sub-product-1', menuItemsMock);

    expect(result[0].isExpanded).toBe(true);
    expect(result[0].children?.[0].isExpanded).toBe(true);
    expect(result[0].children?.[0].children?.[0].isExpanded).toBe(true);
  });

  it('should not collapse ancestors when collapsing nested submenu', () => {
    const result = toggleSubmenuAutoCollapsed('sub-product-2', menuItemsMock);

    expect(result[0].isExpanded).toBe(true);
    expect(result[0].children?.[0].isExpanded).toBe(true);
    expect(result[0].children?.[0].children?.[1].isExpanded).toBe(false);
  });

  it('should NOT toggle nested submenu when parent is collapsed', () => {
    const result = toggleSubmenuAutoCollapsed('general', menuItemsMock);

    expect(result[1].children?.[0].isExpanded).toBe(false);
  });
});
