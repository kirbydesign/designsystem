import { createServiceFactory } from '@ngneat/spectator/jest';
import { SidebarMenuItem, SubmenuItem } from '../../models';
import { MenuStateService } from './menu-state.service';

type MenuStateServiceProps = {
  menuItems: SidebarMenuItem[];
  selectedItem: string;
  expandedItems: Set<string>;
  checkedItems: Set<string>;
  autoCollapse: boolean;
};

const menuItemsMock: SidebarMenuItem[] = [
  {
    type: 'submenu',
    id: 'item-1',
    title: 'Item 1',
    children: [
      { type: 'router-link', id: 'item-1.1', title: 'Item 1.1', route: '/item-1.1' },
      { type: 'router-link', id: 'item-1.2', title: 'Item 1.2', route: '/item-1.2' },
    ],
  },
  {
    type: 'submenu',
    id: 'item-2',
    title: 'Item 2',
    children: [
      { type: 'router-link', id: 'item-2.1', title: 'Item 2.1', route: '/item-2.1' },
      { type: 'router-link', id: 'item-2.2', title: 'Item 2.2', route: '/item-2.2' },
      {
        type: 'submenu',
        id: 'item-2.3',
        title: 'Item 2.3',
        children: [
          { type: 'router-link', id: 'item-2.3.1', title: 'Item 2.3.1', route: '/item-2.3.1' },
          { type: 'router-link', id: 'item-2.3.2', title: 'Item 2.3.2', route: '/item-2.3.2' },
        ],
      },
    ],
  },
];

describe(MenuStateService.name, () => {
  const factory = createServiceFactory({ service: MenuStateService });
  const render = (props: Partial<MenuStateServiceProps> = {}) => {
    const spectator = factory();
    spectator.service.menuItems = props.menuItems ?? menuItemsMock;
    spectator.service.selectedItem = props.selectedItem ?? '';
    spectator.service.expandedItems = props.expandedItems ?? new Set<string>();
    spectator.service.checkedItems = props.checkedItems ?? new Set<string>();
    spectator.service.autoCollapse = props.autoCollapse ?? false;
    return spectator;
  };

  describe('Method : expandItem', () => {
    it('should expand the specified submenu item', () => {
      const spectator = render();

      spectator.service.expandItem('item-1');
      spectator.service.expandItem('item-2');
      spectator.service.expandItem('item-2.3');

      expect(spectator.service.expandedItems()).toContain('item-1');
      expect(spectator.service.expandedItems()).toContain('item-2');
      expect(spectator.service.expandedItems()).toContain('item-2.3');
    });

    it('should collapse non-ancestor submenu items when autoCollapse is enabled', () => {
      const spectator = render({ autoCollapse: true });

      spectator.service.expandItem('item-1');
      spectator.service.expandItem('item-2');
      spectator.service.expandItem('item-2.3');

      expect(spectator.service.expandedItems()).not.toContain('item-1');
      expect(spectator.service.expandedItems()).toContain('item-2');
      expect(spectator.service.expandedItems()).toContain('item-2.3');
    });

    it('should emit an expand event when a submenu item is expanded', (done) => {
      const spectator = render();

      spectator.service.expandEvents.subscribe((event) => {
        try {
          expect(event).toEqual({ id: 'item-1', isExpanded: true });
          done();
        } catch (error) {
          done(error);
        }
      });

      spectator.service.expandItem('item-1');
    });
  });

  describe('Method : collapseItem', () => {
    it('should collapse the specified submenu item', () => {
      const spectator = render({ expandedItems: new Set(['item-1', 'item-2', 'item-2.3']) });

      spectator.service.collapseItem('item-1');

      expect(spectator.service.expandedItems()).not.toContain('item-1');
      expect(spectator.service.expandedItems()).toContain('item-2');
      expect(spectator.service.expandedItems()).toContain('item-2.3');
    });

    it('should emit an expand event when a submenu item is collapsed', (done) => {
      const spectator = render();

      spectator.service.expandEvents.subscribe((event) => {
        try {
          expect(event).toEqual({ id: 'item-1', isExpanded: false });
          done();
        } catch (error) {
          done(error);
        }
      });

      spectator.service.collapseItem('item-1');
    });
  });

  describe('Method : checkItem', () => {
    it('should check the specified item', () => {
      const spectator = render();

      spectator.service.checkItem('item-1.1');
      spectator.service.checkItem('item-2.2');

      expect(spectator.service.checkedItems()).toContain('item-1.1');
      expect(spectator.service.checkedItems()).toContain('item-2.2');
    });

    it('should emit a check event when an item is checked', (done) => {
      const spectator = render();

      spectator.service.checkEvents.subscribe((event) => {
        try {
          expect(event).toEqual({ id: 'item-1.1', isChecked: true });
          done();
        } catch (error) {
          done(error);
        }
      });

      spectator.service.checkItem('item-1.1');
    });
  });

  describe('Method : uncheckItem', () => {
    it('should uncheck the specified item', () => {
      const spectator = render({ checkedItems: new Set(['item-1.1', 'item-2.2']) });

      spectator.service.uncheckItem('item-1.1');

      expect(spectator.service.checkedItems()).not.toContain('item-1.1');
      expect(spectator.service.checkedItems()).toContain('item-2.2');
    });

    it('should emit a check event when an item is unchecked', (done) => {
      const spectator = render();

      spectator.service.checkEvents.subscribe((event) => {
        try {
          expect(event).toEqual({ id: 'item-1.1', isChecked: false });
          done();
        } catch (error) {
          done(error);
        }
      });

      spectator.service.uncheckItem('item-1.1');
    });
  });

  describe('Method : selectItem', () => {
    it('should select the specified item', () => {
      const spectator = render();

      spectator.service.selectItem('item-2.3.1');

      expect(spectator.service.selectedItem()).toBe('item-2.3.1');
    });

    it('should emit a select event when an item is selected', (done) => {
      const spectator = render();

      spectator.service.selectEvents.subscribe((selectedItemId) => {
        try {
          expect(selectedItemId).toBe('item-2.3.1');
          done();
        } catch (error) {
          done(error);
        }
      });

      spectator.service.selectItem('item-2.3.1');
    });
  });

  describe('Method : reorderItems', () => {
    it('should emit a reorder event when a menu is reordered', (done) => {
      const spectator = render();

      spectator.service.reorderEvents.subscribe((event) => {
        try {
          expect(event).toEqual({
            parentId: 'item-1',
            itemId: 'item-1.1',
            previousIndex: 0,
            currentIndex: 1,
            reorderedItemIds: ['item-1.2', 'item-1.1'],
          });
          done();
        } catch (error) {
          done(error);
        }
      });

      spectator.service.reorderItems(menuItemsMock[0] as SubmenuItem, 'item-1.1', 0, 1);
    });
  });
});
