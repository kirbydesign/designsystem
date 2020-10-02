import { IconRegistryService } from './icon-registry.service';
import { Icon, IconSettings } from './icon-settings';

describe('KirbyIconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    service = new IconRegistryService();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getIcons', () => {
    it('should return empty map by default', () => {
      const expectedIcons = [];
      expect(service.getIcons()).toEqual(expectedIcons);
    });
    it('should return registed icons', () => {
      const icons = [
        { name: 'name1', svg: 'svg1' },
        { name: 'name2', svg: 'svg2' },
      ];
      service.addIcons(icons);
      expect(service.getIcons()).toEqual(icons);
    });
    it('should only add distinct icon names', () => {
      const icon1 = [{ name: 'name1', svg: 'svg1' }];
      const icon2 = [{ name: 'name1', svg: 'svg2' }];
      service.addIcons(icon1);
      service.addIcons(icon2);
      expect(service.getIcons()).toEqual(icon2);
    });
  });
});
