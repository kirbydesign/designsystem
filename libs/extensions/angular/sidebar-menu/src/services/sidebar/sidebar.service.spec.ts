import { createServiceFactory } from '@ngneat/spectator/jest';
import { fakeAsync, tick } from '@angular/core/testing';
import { SidebarService } from './sidebar.service';

describe(SidebarService.name, () => {
  const render = createServiceFactory({ service: SidebarService });

  describe('Computed : showHeaderBottomBorder', () => {
    it('should be false by default', () => {
      const spectator = render();

      expect(spectator.service.showHeaderBottomBorder()).toBe(false);
    });

    it('should be false when scroll distance is 0', fakeAsync(() => {
      const spectator = render();

      spectator.service.scrollDistance = 0;
      tick();

      expect(spectator.service.showHeaderBottomBorder()).toBe(false);
    }));

    it('should be true when scroll distance is greater than 0', fakeAsync(() => {
      const spectator = render();

      spectator.service.scrollDistance = 1;
      tick();

      expect(spectator.service.showHeaderBottomBorder()).toBe(true);
    }));
  });

  describe('Computed : showFooterTopBorder', () => {
    it('should be false by default', () => {
      const spectator = render();

      expect(spectator.service.showFooterTopBorder()).toBe(false);
    });

    it('should be false when the menu height is not greater than the container height', fakeAsync(() => {
      const spectator = render();

      spectator.service.menuHeight = 50;
      spectator.service.containerHeight = 50;
      tick();

      expect(spectator.service.showFooterTopBorder()).toBe(false);
    }));

    it('should be false when scrolled to the bottom', fakeAsync(() => {
      const spectator = render();

      spectator.service.menuHeight = 100;
      spectator.service.containerHeight = 50;
      spectator.service.scrollDistance = 50;
      tick();

      expect(spectator.service.showFooterTopBorder()).toBe(false);
    }));

    it('should be true while not scrolled to the bottom', fakeAsync(() => {
      const spectator = render();

      spectator.service.menuHeight = 100;
      spectator.service.containerHeight = 50;
      tick();

      expect(spectator.service.showFooterTopBorder()).toBe(true);

      spectator.service.scrollDistance = 49;
      tick();

      expect(spectator.service.showFooterTopBorder()).toBe(true);
    }));
  });
});
