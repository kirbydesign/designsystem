import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { ThemeColorDirective } from '@kirbydesign/designsystem/directives/theme-color/theme-color.directive';
import { ColorHelper } from '@kirbydesign/designsystem/helpers/color-helper';
import { IconComponent } from './icon.component';

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
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.className).toBe('kirby-icon');
      const expectedColor = window.getComputedStyle(window.document.body)['color'];
      const actualColor = window.getComputedStyle(el.nativeElement)['color'];
      expect(actualColor).toBe(expectedColor);
    });

    it('should be rendered with primary color when theme color is set to primary', () => {
      const fixture = createTestComponent('<kirby-icon [themeColor]="\'primary\'"></kirby-icon>');
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.classList).toContain('primary');
      const expectedColor = ColorHelper.getThemeColorRgbString('primary');
      const actualColor = window.getComputedStyle(el.nativeElement)['color'];
      expect(actualColor).toBe(expectedColor);
    });

    it('should be rendered with secondary color when theme color is set to secondary', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="secondary"></kirby-icon>');
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.classList).toContain('secondary');
      const expectedColor = ColorHelper.getThemeColorRgbString('secondary');
      const actualColor = window.getComputedStyle(el.nativeElement)['color'];
      expect(actualColor).toBe(expectedColor);
    });

    it('should be rendered with tertiary color when theme color is set to tertiary', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="tertiary"></kirby-icon>');
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.classList).toContain('tertiary');
      const expectedColor = ColorHelper.getThemeColorRgbString('tertiary');
      const actualColor = window.getComputedStyle(el.nativeElement)['color'];
      expect(actualColor).toBe(expectedColor);
    });

    it('should be rendered with warning color when theme color is set to warning', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="warning"></kirby-icon>');
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.classList).toContain('warning');
      const expectedColor = ColorHelper.getThemeColorRgbString('warning');
      const actualColor = window.getComputedStyle(el.nativeElement)['color'];
      expect(actualColor).toBe(expectedColor);
    });

    it('should be rendered with success color when theme color is set to success', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="success"></kirby-icon>');
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.classList).toContain('success');
      const expectedColor = ColorHelper.getThemeColorRgbString('success');
      const actualColor = window.getComputedStyle(el.nativeElement)['color'];
      expect(actualColor).toBe(expectedColor);
    });

    it('should be rendered with danger color when theme color is set to danger', () => {
      const fixture = createTestComponent('<kirby-icon themeColor="danger"></kirby-icon>');
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(IconComponent));
      expect(el.nativeElement.classList).toContain('danger');
      const expectedColor = ColorHelper.getThemeColorRgbString('danger');
      const actualColor = window.getComputedStyle(el.nativeElement)['color'];
      expect(actualColor).toBe(expectedColor);
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
    set: { template: template },
  }).createComponent(TestWrapperComponent);
}
