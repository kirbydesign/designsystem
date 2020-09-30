import { IconRegistryService } from './kirby-icon-registry.service';
import { Icon, IconSettings } from './icon-settings';

describe('KirbyIconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    service = new IconRegistryService();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getCustomIcons', () => {
    it('get icons from empty map', () => {
      const expectedIcons = [];
      expect(service.getIcons()).toEqual(expectedIcons);
    });
    it('get excisting icons in map', () => {
      const icons = [
        { name: 'name1', svg: 'svg1' },
        { name: 'name2', svg: 'svg2' },
      ];
      service.addIcons(icons);
      expect(service.getIcons()).toEqual(icons);
    });
  });
});
