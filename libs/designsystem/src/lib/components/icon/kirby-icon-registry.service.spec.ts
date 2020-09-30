import { KirbyIconRegistryService } from './kirby-icon-registry.service';
import { Icon, IconSettings } from './icon-settings';

describe('KirbyIconRegistryService', () => {
  let service: KirbyIconRegistryService;

  beforeEach(() => {
    service = new KirbyIconRegistryService();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getCustomIcons', () => {
    it('get icons from empty map', () => {
      const expectedIcons = [];
      expect(service.getCustomIcons()).toEqual(expectedIcons);
    });
    it('get excisting icons in map', () => {
      const icons = [
        { name: 'name1', svg: 'svg1' },
        { name: 'name2', svg: 'svg2' },
      ];
      service.addIcons(icons);
      expect(service.getCustomIcons()).toEqual(icons);
    });
  });
});
