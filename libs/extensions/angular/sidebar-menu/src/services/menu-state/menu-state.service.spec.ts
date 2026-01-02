import { createServiceFactory } from '@ngneat/spectator/jest';
import { SidebarMenuItem } from '../../models';
import { MenuStateService } from './menu-state.service';

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
  const render = () => {
    const factory = createServiceFactory({ service: MenuStateService });
    const spectator = factory();
    spectator.service.menuItems = menuItemsMock;
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
      const spectator = render();
      spectator.service.autoCollapse = true;

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
      const spectator = render();
      spectator.service.expandedItems = new Set(['item-1', 'item-2', 'item-2.3']);

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
      const spectator = render();
      spectator.service.checkedItems = new Set(['item-1.1', 'item-2.2']);

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
});
