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

  describe('size', () => {
    it('should set size to small by default', () => {
      expect(component.size).toBe('small');
    });

    it('should be rendered as small by default', () => {
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.size).toBe('small');
    });

    it('should be rendered as large when size is set to large', () => {
      component.size = 'large';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.size).toBe('large');
    });
  });

  describe('color', () => {
    it('should set icon color to undefined by default', () => {
      expect(component.colortype).toBeUndefined();
    });

    it('should be rendered with no color by default', () => {
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBeUndefined();
    });

    it('should be rendered as primary when color is set to primary', () => {
      component.colortype = 'primary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('primary');
    });

    it('should be rendered as secondary when color is set to secondary', () => {
      component.colortype = 'secondary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('secondary');
    });

    it('should be rendered as tertiary when color is set to tertiary', () => {
      component.colortype = 'tertiary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('tertiary');
    });

    it('should be rendered as alert when color is set to alert', () => {
      component.colortype = 'alert';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('alert');
    });

    it('should be rendered as success when color is set to success', () => {
      component.colortype = 'success';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('success');
    });

    it('should be rendered as danger when color is set to danger', () => {
      component.colortype = 'danger';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('danger');
    });
  });
});
