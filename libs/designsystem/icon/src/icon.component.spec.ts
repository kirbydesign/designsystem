import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonIcon } from '@ionic/angular/standalone';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { ThemeColorDirective } from '../../src/lib';

import { IconRegistryService } from './icon-registry.service';
import { IconComponent, IconSize } from './icon.component';

const { getColor, iconFontSize } = DesignTokenHelper;

describe('IconComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        IconComponent,
        ThemeColorDirective,
        TestWrapperComponent,
        MockComponent(IonIcon),
      ],
      providers: [IconRegistryService],
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
    it('should set default icon by default', () => {
      const fixture = createTestComponent('<kirby-icon></kirby-icon>');
      const component = fixture.debugElement.query(By.directive(IconComponent)).componentInstance;

      expect(component.name).toBe(undefined);
      expect(component.icon.name).toBe(component.defaultIcon.name);
    });

    it('should set default icon if icon name not found', () => {
      const noExistingIconName = 'no-existing-icon-name';
      const fixture = createTestComponent(`<kirby-icon name="${noExistingIconName}"></kirby-icon>`);
      const component = fixture.debugElement.query(By.directive(IconComponent)).componentInstance;

      expect(component.name).toBe(noExistingIconName);
      expect(component.icon.name).toBe(component.defaultIcon.name);
    });

    it('should warn if icon name not found', () => {
      spyOn(console, 'warn');
      const noExistingIconName = 'no-existing-icon-name';
      const fixture = createTestComponent(`<kirby-icon name="${noExistingIconName}"></kirby-icon>`);

      fixture.detectChanges();

      expect(console.warn).toHaveBeenCalledWith(
        `Icon with name "${noExistingIconName}" was not found. 
Do you have a typo in 'name' for a built-in icon or
forgot to configure the custom icon through the 'IconRegistryService'?`
      );
    });

    it('should use default icons from Kirby icon settings', () => {
      const fixture = createTestComponent('<kirby-icon name="verify"></kirby-icon>');
      fixture.detectChanges();
      const component = fixture.debugElement.query(By.directive(IconComponent)).componentInstance;

      expect(component.icon.name).toBe('verify');
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

  it('should default to size = sm', () => {
    const fixture = createTestComponent('<kirby-icon></kirby-icon>');
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(IconComponent));

    expect(el.nativeElement).toHaveComputedStyle({
      'font-size': iconFontSize('sm'),
    });
  });

  const sizes = Object.values(IconSize);

  sizes.forEach((size) => {
    it(`should render with correct font-size for size = ${size}`, () => {
      const fixture = createTestComponent(`<kirby-icon size="${size}"></kirby-icon>`);
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.directive(IconComponent));

      expect(el.nativeElement).toHaveComputedStyle({
        'font-size': iconFontSize(size),
      });
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
export class TestWrapperComponent {}

/*
 * Custom Helper function to quickly create a `fixture` instance based on
 * the 'TestWrapperComponent' class
 */

function createTestComponent(template: string): ComponentFixture<TestWrapperComponent> {
  return TestBed.overrideComponent(TestWrapperComponent, {
    set: {
      template: template,
    },
  }).createComponent(TestWrapperComponent);
}
