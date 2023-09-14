import { IconRegistryService } from './icon-registry.service';
import { Icon } from './icon-settings';
import { kirbyIconSettings } from './kirby-icon-settings';

describe('KirbyIconRegistryService', () => {
  let service: IconRegistryService;
  const icon1 = { name: 'name1', svg: 'svg1' };
  const icon2 = { name: 'name1', svg: 'svg2' };
  const icon3 = { name: 'name3', svg: 'svg3' };

  let defaultIcons: Icon[];
  beforeEach(() => {
    service = new IconRegistryService();
    defaultIcons = kirbyIconSettings.icons;
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
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
    it('should return defaultIcons by default', () => {
      expect(service.getIcons()).toEqual(defaultIcons);
    });

    it('should return registed icons', () => {
      const customIcons = [
        { name: 'name1', svg: 'svg1' },
        { name: 'name2', svg: 'svg2' },
      ];
      const expectedIcons = [...defaultIcons, ...customIcons];
      service.addIcons(customIcons);

      expect(service.getIcons()).toEqual(expectedIcons);
    });
  });

  describe('addIcon', () => {
    let consoleWarnSpy: jasmine.Spy;

    beforeAll(() => {
      consoleWarnSpy = spyOn(console, 'warn');
    });

    it('should return icon added to the registry', () => {
      service.addIcon('name1', 'svg1');
      const expectedIcon = { name: 'name1', svg: 'svg1' };

      expect(service.getIcon('name1')).toEqual(expectedIcon);
    });

    it('should only add distinct icon names', () => {
      service.addIcon('name1', 'svg1');
      service.addIcon('name1', 'svg2');
      const expectedIcons = [...defaultIcons, { name: 'name1', svg: 'svg1' }];
      expect(service.getIcons()).toEqual(expectedIcons);
    });

    it('should warn when overwriting existing icon name', () => {
      service.addIcon('name1', 'svg1');
      service.addIcon('name1', 'svg2');
      expect(consoleWarnSpy).toHaveBeenCalledWith('Icon with name: "name1" already exists');
    });
  });

  describe('addIcons', () => {
    let consoleWarnSpy: jasmine.Spy;
    defaultIcons = kirbyIconSettings.icons;
    const expectedIcons = [...defaultIcons, icon1, icon3];

    beforeAll(() => {
      consoleWarnSpy = spyOn(console, 'warn');
    });

    it('should only add distinct icon names from same set', () => {
      service.addIcons([icon1, icon2, icon3]);
      expect(service.getIcons()).toEqual(expectedIcons);
    });

    it('should only add distinct icon names from different sets', () => {
      service.addIcons([icon1]);
      service.addIcons([icon2, icon3]);
      expect(service.getIcons()).toEqual(expectedIcons);
    });

    it('should warn when overwriting existing icon name', () => {
      service.addIcons([icon1, icon2, icon3]);
      expect(consoleWarnSpy).toHaveBeenCalledWith('Icon with name: "name1" already exists');
    });
  });
});
