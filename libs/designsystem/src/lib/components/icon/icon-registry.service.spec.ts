import { IconRegistryService } from './icon-registry.service';

describe('KirbyIconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    service = new IconRegistryService();
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
  });

  describe('addIcon', () => {
    let consoleWarnSpy: jasmine.Spy;

    beforeAll(() => {
      consoleWarnSpy = spyOn(console, 'warn');
    });

    it('should add the icon to the regitry', () => {
      service.addIcon('name1', 'svg1');
      expect(service.getIcons()).toEqual([{ name: 'name1', svg: 'svg1' }]);
    });

    it('should only add distinct icon names', () => {
      service.addIcon('name1', 'svg1');
      service.addIcon('name1', 'svg2');
      expect(service.getIcons()).toEqual([{ name: 'name1', svg: 'svg1' }]);
    });

    it('should warn when overwriting existing icon name', () => {
      service.addIcon('name1', 'svg1');
      service.addIcon('name1', 'svg2');
      expect(consoleWarnSpy).toHaveBeenCalledWith('Icon with name: "name1" already exists');
    });
  });

  describe('addIcons', () => {
    let consoleWarnSpy: jasmine.Spy;
    const icon1 = { name: 'name1', svg: 'svg1' };
    const icon2 = { name: 'name1', svg: 'svg2' };
    const icon3 = { name: 'name3', svg: 'svg3' };
    const expectedIcons = [icon1, icon3];

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
