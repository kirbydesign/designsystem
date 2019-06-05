import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent, MockComponent(ionic.IonIcon)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('icons', () => {
    it('should point to the cog icon by default', () => {
      expect(component.name).toBe('cog');
    });
  });

  describe('color', () => {
    it('should set icon color to undefined by default', () => {
      expect(component.themeColor).toBeUndefined();
    });

    it('should be rendered with no color by default', () => {
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBeUndefined();
    });

    it('should be rendered as primary when color is set to primary', () => {
      component.themeColor = 'primary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('primary');
    });

    it('should be rendered as secondary when color is set to secondary', () => {
      component.themeColor = 'secondary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('secondary');
    });

    it('should be rendered as tertiary when color is set to tertiary', () => {
      component.themeColor = 'tertiary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('tertiary');
    });

    it('should be rendered as warning when color is set to warning', () => {
      component.themeColor = 'warning';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('warning');
    });

    it('should be rendered as success when color is set to success', () => {
      component.themeColor = 'success';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('success');
    });

    it('should be rendered as danger when color is set to danger', () => {
      component.themeColor = 'danger';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('danger');
    });
  });
});
