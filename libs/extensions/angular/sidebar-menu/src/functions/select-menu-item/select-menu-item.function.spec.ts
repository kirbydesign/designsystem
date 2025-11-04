import { SidebarMenuItem } from '../../models';
import { selectMenuItem } from './select-menu-item.function';

const menuItemsMock: SidebarMenuItem[] = [
  {
    id: 'home',
    title: 'Home',
    selected: false,
  },
  {
    id: 'products',
    title: 'Products',
    isExpanded: false,
    children: [
      {
        id: 'product-1',
        title: 'Product 1',
        selected: false,
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    isExpanded: true,
    children: [
      {
        id: 'advanced',
        title: 'Advanced',
        isExpanded: false,
        children: [
          {
            id: 'nested-setting',
            title: 'Nested Setting',
            selected: true,
          },
        ],
      },
    ],
  },
];

describe('Function: selectMenuItem', () => {
  it('should select the item with the given id', () => {
    const result = selectMenuItem('home', menuItemsMock);

    expect(result[0].selected).toBe(true);
  });

  it('should deselect any previously selected item', () => {
    const result = selectMenuItem('home', menuItemsMock);

    expect(result[2].children?.[0].children?.[0].selected).toBe(false);
  });
});
