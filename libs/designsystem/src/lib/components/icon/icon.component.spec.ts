import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { ThemeColorDirective } from '../../directives/theme-color/theme-color.directive';
import { DesignTokenHelper } from '../../helpers/design-token-helper';
import { IconComponent } from './icon.component';
import { IconSettings, ICON_SETTINGS } from './icon-settings';
import { KirbyIconRegistryService } from './kirby-icon-registry.service';

const getColor = DesignTokenHelper.getColor;

describe('IconComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IconComponent,
        ThemeColorDirective,
        TestWrapperComponent,
        MockComponent(ionic.IonIcon),
      ],
    });
  }));

  it('should compile with custom hardcoded directives', () => {
    const fixture = createTestComponent('<kirby-icon themeColor="primary"></kirby-icon>');
    expect(fixture).toBeDefined();
  });

  it('should compile with custom dynamic bound directives', () => {
    const fixture = createTestComponent('<kirby-icon [themeColor]="\'primary\'"></kirby-icon>');
    expect(fixture).toBeDefined();
  });

  it('should create component instance', () => {
    const fixture = createTestComponent('<kirby-icon></kirby-icon>');
    const component = fixture.debugElement.query(By.directive(IconComponent)).componentInstance;
    expect(component).toBeTruthy();
  });

  describe('icons', () => {
    it('should point to the cog icon by default', () => {
      const fixture = createTestComponent('<kirby-icon></kirby-icon>');
      const component = fixture.debugElement.query(By.directive(IconComponent)).componentInstance;
      expect(component.name).toBe(undefined);
      expect(component.icon.name).toBe(component.defaultIcon.name);
    });
  });

  describe('color', () => {
    it('should be rendered with default text color by default', () => {
      const fixture = createTestComponent('<kirby-icon></kirby-icon>');
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.className).toBe('kirby-icon');
      const expectedColor = window.getComputedStyle(window.document.body)['color'];
      expect(el.nativeElement).toHaveComputedStyle({
        color: expectedColor,
      });
    });

    it('should be rendered with primary color when theme color is set to primary', () => {
      const fixture = createTestComponent('<kirby-icon [themeColor]="\'primary\'"></kirby-icon>');
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement).toHaveComputedStyle({
        color: getColor('primary'),
      });
    });

    it('should be rendered with secondary color when theme color is set to secondary', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="secondary"></kirby-icon>');
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement).toHaveComputedStyle({
        color: getColor('secondary'),
      });
    });

    it('should be rendered with tertiary color when theme color is set to tertiary', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="tertiary"></kirby-icon>');
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement).toHaveComputedStyle({
        color: getColor('tertiary'),
      });
    });

    it('should be rendered with warning color when theme color is set to warning', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="warning"></kirby-icon>');
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement).toHaveComputedStyle({
        color: getColor('warning'),
      });
    });

    it('should be rendered with success color when theme color is set to success', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="success"></kirby-icon>');
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement).toHaveComputedStyle({
        color: getColor('success'),
      });
    });

    it('should be rendered with danger color when theme color is set to danger', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="danger"></kirby-icon>');
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement).toHaveComputedStyle({
        color: getColor('danger'),
      });
    });
  });
  describe('multiple icon settings', () => {
    it('should combine multiple provided icons, but use icons from ICON_SETTINGS', () => {
      const fixture = createTestComponent(`<kirby-icon customName="name1"></kirby-icon>`);
      fixture.detectChanges();
      const component = fixture.debugElement.query(By.directive(IconComponent)).componentInstance;
      expect(component.icon.name).toBe('name1');
      expect(component.icon.svg).toBe('svg1');
    });

    it('should combine multiple provided icons, and use icons added with KirbyIconRegistryService', () => {
      const fixture = createTestComponent(`<kirby-icon customName="customName1"></kirby-icon>`);
      fixture.detectChanges();
      const component = fixture.debugElement.query(By.directive(IconComponent)).componentInstance;
      fixture.detectChanges();
      expect(component.icon.name).toBe('customName1');
      expect(component.icon.svg).toBe('customSvg1');
    });
  });
});

/*
 * Shell component that will be used to test with theme-color directive
 */
@Component({
  selector: 'kirby-test-component',
  template: '<span>PlaceHolder HTML to be Replaced</span>',
})
export class TestWrapperComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}

/*
 * Custom Helper function to quickly create a `fixture` instance based on
 * the 'TestWrapperComponent' class
 */

function createTestComponent(template: string): ComponentFixture<TestWrapperComponent> {
  return TestBed.overrideComponent(TestWrapperComponent, {
    set: {
      template: template,
      providers: [
        {
          provide: KirbyIconRegistryService,
          useValue: jasmine.createSpyObj('KirbyIconRegistryService', ['getCustomIcons'], {
            getCustomIcons: () => [{ name: 'customName1', svg: 'customSvg1' }],
          }),
        },
        {
          provide: ICON_SETTINGS,
          useValue: { icons: [{ name: 'name1', svg: 'svg1' }] } as IconSettings,
        },
      ],
    },
  }).createComponent(TestWrapperComponent);
}
