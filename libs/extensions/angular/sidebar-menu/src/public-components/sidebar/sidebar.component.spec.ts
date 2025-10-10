import { createHostFactory } from '@ngneat/spectator/jest';
import { SidebarService } from '../../services/sidebar';
import { MenuStateService } from '../../services/menu-state';
import { SidebarMenuItem } from '../../models';
import { SidebarComponent } from './sidebar.component';

const menuItemMock1 = { id: '1', children: [], isExpanded: false };
const menuItemMock2 = { id: '2' };
const menuItemMock3 = { id: '3', children: [{ id: '3.1', selected: true }], isExpanded: true };
const menuItemsMock: SidebarMenuItem[] = [menuItemMock1, menuItemMock2, menuItemMock3];

type HostProps = {
  menuItems: SidebarMenuItem[];
  autoCollapse: boolean;
};

describe(SidebarComponent.name, () => {
  const createHost = createHostFactory({
    component: SidebarComponent,
    providers: [SidebarService, MenuStateService],
  });

  const render = (propOverrides: Partial<HostProps> = {}) =>
    createHost(
      `<kirby-x-sidebar [menuItems]="menuItems" [autoCollapse]="autoCollapse"></kirby-x-sidebar>`,
      {
        hostProps: {
          menuItems: menuItemsMock,
          ...propOverrides,
        },
      }
    );

  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  describe('Effect : submenu toggled', () => {
    it('should emit the toggled submenu', async () => {
      const spectator = render();
      const stateService = spectator.inject(MenuStateService);
      const emitSpy = jest.spyOn(spectator.component.afterMenuToggled, 'emit');

      stateService.toggledSubmenu = menuItemMock1;

      spectator.detectChanges();
      await spectator.fixture.whenStable();

      expect(emitSpy).toHaveBeenCalledWith(menuItemMock1);
    });

    it('should expand the submenu if it was previously collapsed', async () => {
      const spectator = render();
      const stateService = spectator.inject(MenuStateService);

      stateService.toggledSubmenu = menuItemMock1;

      spectator.detectChanges();
      await spectator.fixture.whenStable();

      expect(spectator.component.menuItems()[0]).toEqual({ ...menuItemMock1, isExpanded: true });
      expect(spectator.component.menuItems()[2]).toEqual({ ...menuItemMock3, isExpanded: true });
    });

    it('should collapse the submenu if it was previously expanded', async () => {
      const spectator = render();
      const stateService = spectator.inject(MenuStateService);

      stateService.toggledSubmenu = menuItemMock3;

      spectator.detectChanges();
      await spectator.fixture.whenStable();

      expect(spectator.component.menuItems()[0]).toEqual({ ...menuItemMock1, isExpanded: false });
      expect(spectator.component.menuItems()[2]).toEqual({ ...menuItemMock3, isExpanded: false });
    });

    it('should expand the submenu and collapse others when autoCollapse is true', async () => {
      const spectator = render({ autoCollapse: true });
      const stateService = spectator.inject(MenuStateService);

      stateService.toggledSubmenu = menuItemMock1;

      spectator.detectChanges();
      await spectator.fixture.whenStable();

      expect(spectator.component.menuItems()[0]).toEqual({ ...menuItemMock1, isExpanded: true });
      expect(spectator.component.menuItems()[2]).toEqual({ ...menuItemMock3, isExpanded: false });
    });
  });

  describe('Effect : menu item selected', () => {
    it('should emit the selected menu item', async () => {
      const spectator = render();
      const stateService = spectator.inject(MenuStateService);
      const emitSpy = jest.spyOn(spectator.component.afterMenuClicked, 'emit');

      stateService.selectedItem = menuItemMock2;

      spectator.detectChanges();
      await spectator.fixture.whenStable();

      expect(emitSpy).toHaveBeenCalledWith(menuItemMock2);
    });

    it('should update the selected status of the menu items', async () => {
      const spectator = render();
      const stateService = spectator.inject(MenuStateService);

      stateService.selectedItem = menuItemMock2;

      spectator.detectChanges();
      await spectator.fixture.whenStable();

      expect(spectator.component.menuItems()[1]).toEqual({ ...menuItemMock2, selected: true });
      expect(spectator.component.menuItems()[2].children?.[0]).toEqual({
        ...menuItemMock3.children[0],
        selected: false,
      });
    });
  });

  describe('Effect : menuItemsChanged backwards compatability', () => {
    it('should emit menuItemsChanged when menu items changes', async () => {
      const spectator = render();
      const emitSpy = jest.spyOn(spectator.component.menuItemsChanged, 'emit');

      spectator.component.menuItems.set([{ id: 'new', children: [] }]);

      spectator.detectChanges();
      await spectator.fixture.whenStable();

      expect(emitSpy).toHaveBeenCalledWith([{ id: 'new', children: [] }]);
    });
  });
});
