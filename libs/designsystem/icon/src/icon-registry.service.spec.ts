import { TestBed } from '@angular/core/testing';
import {
  BUILT_IN_ICONS_URL,
  DEFAULT_BUILT_IN_ICONS_URL,
  IconRegistryService,
} from './icon-registry.service';
import { Icon } from './icon-settings';
import { kirbyIconSettings } from './kirby-icon-settings';

describe('KirbyIconRegistryService', () => {
  const icon1 = { name: 'name1', svg: 'svg1' };
  const icon2 = { name: 'name1', svg: 'svg2' };
  const icon3 = { name: 'name3', svg: 'svg3' };
  const icon4 = { name: 'name2', svg: 'svg2' };

  const expectedDefaultIcons: Icon[] = kirbyIconSettings.icons.map(({ name, svg }) => ({
    name,
    svg: `${DEFAULT_BUILT_IN_ICONS_URL}${svg}`,
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [IconRegistryService] });
  });

  it('should create service', () => {
    expect(TestBed.inject(IconRegistryService)).toBeTruthy();
  });

  describe('getIcon', () => {
    it('should return undefined if no icons registered', () => {
      expect(TestBed.inject(IconRegistryService).getIcon('test')).toBeUndefined();
    });

    it('should return undefined if no icon match name', () => {
      const service = TestBed.inject(IconRegistryService);
      const icons = [icon1, icon2];
      service.addIcons(icons);
      expect(service.getIcon('test')).toBeUndefined();
    });

    it('should return icon if name matches registered icon', () => {
      const service = TestBed.inject(IconRegistryService);
      const icons = [icon1, icon4];
      service.addIcons(icons);
      expect(service.getIcon('name1')).toEqual(icons[0]);
      expect(service.getIcon('name2')).toEqual(icons[1]);
    });
  });

  describe('getIcons', () => {
    it('should return defaultIcons by default', () => {
      const service = TestBed.inject(IconRegistryService);
      expect(service.getIcons()).toEqual(expectedDefaultIcons);
    });

    it('should return registed icons', () => {
      const service = TestBed.inject(IconRegistryService);
      const customIcons = [icon1, icon4];
      const expectedIcons = [...expectedDefaultIcons, ...customIcons];
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
      const service = TestBed.inject(IconRegistryService);
      service.addIcon('name1', 'svg1');
      expect(service.getIcon('name1')).toEqual(icon1);
    });

    it('should only add distinct icon names', () => {
      const service = TestBed.inject(IconRegistryService);
      service.addIcon('name1', 'svg1');
      service.addIcon('name1', 'svg2');
      const expectedIcons = [...expectedDefaultIcons, icon1];
      expect(service.getIcons()).toEqual(expectedIcons);
    });

    it('should warn when overwriting existing icon name', () => {
      const service = TestBed.inject(IconRegistryService);
      service.addIcon('name1', 'svg1');
      service.addIcon('name1', 'svg2');
      expect(consoleWarnSpy).toHaveBeenCalledWith('Icon with name: "name1" already exists');
    });
  });

  describe('addIcons', () => {
    let consoleWarnSpy: jasmine.Spy;

    const expectedIcons = [...expectedDefaultIcons, icon1, icon3];
    beforeAll(() => {
      consoleWarnSpy = spyOn(console, 'warn');
    });

    it('should only add distinct icon names from same set', () => {
      const service = TestBed.inject(IconRegistryService);
      service.addIcons([icon1, icon2, icon3]);
      expect(service.getIcons()).toEqual(expectedIcons);
    });

    it('should only add distinct icon names from different sets', () => {
      const service = TestBed.inject(IconRegistryService);
      service.addIcons([icon1]);
      service.addIcons([icon2, icon3]);
      expect(service.getIcons()).toEqual(expectedIcons);
    });

    it('should warn when overwriting existing icon name', () => {
      const service = TestBed.inject(IconRegistryService);
      service.addIcons([icon1, icon2, icon3]);
      expect(consoleWarnSpy).toHaveBeenCalledWith('Icon with name: "name1" already exists');
    });
  });

  describe('Customized icon url', () => {
    it('Should use the customized icon url when registering service', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: BUILT_IN_ICONS_URL, useValue: 'https://example.org/foo' }],
      });
      const service = TestBed.inject(IconRegistryService);
      const kirbyIcon = service.getIcon('kirby');
      expect(kirbyIcon.svg).toBe('https://example.org/foo/kirby.svg');
    });

    it('Does not add extra slash when custom URL has trailing slash', () => {
      TestBed.configureTestingModule({
        providers: [{ provide: BUILT_IN_ICONS_URL, useValue: 'https://example.org/foo/' }],
      });
      const service = TestBed.inject(IconRegistryService);
      const kirbyIcon = service.getIcon('kirby');
      expect(kirbyIcon.svg).toBe('https://example.org/foo/kirby.svg');
    });
  });
});
