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
    it('should set icon color to primary by default', () => {
      expect(component.colorType).toBe('primary');
    });

    it('should be rendered as primary color by default', () => {
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('primary');
    });

    it('should be rendered as secondary when color is set to secondary', () => {
      component.colorType = 'secondary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('secondary');
    });

    it('should be rendered as tertiary when color is set to tertiary', () => {
      component.colorType = 'tertiary';
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonIcon));
      expect(el.componentInstance.color).toBe('tertiary');
    });
  });
});
