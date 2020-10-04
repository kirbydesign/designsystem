import { IconRegistryService } from './icon-registry.service';
import { Icon, IconSettings } from './icon-settings';

fdescribe('KirbyIconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    service = new IconRegistryService();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  it('should register icons if injected', () => {
    const iconSettings: IconSettings = {
      icons: [
        { name: 'name1', svg: 'svg1' },
        { name: 'name2', svg: 'svg2' },
      ],
    };
    service = new IconRegistryService(iconSettings);
    expect(service.getIcons()).toEqual(iconSettings.icons);
  });

  describe('getIcon', () => {
    it('should return undefined if no icons registered', () => {
      expect(service.getIcon('test')).toBeUndefined();
    });
    it('should return undefined if no icon match name', () => {
      const icons = [
        { name: 'name1', svg: 'svg1' },
        { name: 'name2', svg: 'svg2' },
      ];
      service.addIcons(icons);
      expect(service.getIcon('test')).toBeUndefined();
    });
    it('should return icon if name matches registered icon', () => {
      const icons = [
        { name: 'name1', svg: 'svg1' },
        { name: 'name2', svg: 'svg2' },
      ];
      service.addIcons(icons);
      expect(service.getIcon('name1')).toEqual(icons[0]);
      expect(service.getIcon('name2')).toEqual(icons[1]);
    });
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
      expect(service.getIcons()).toEqual(icon1);
    });
  });
});
