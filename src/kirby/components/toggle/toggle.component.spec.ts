import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleComponent, MockComponent(ionic.IonToggle)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('checked', () => {
    it('should not be checked by default', () => {
      expect(component.checked).not.toBeTruthy();
    });

    it('should not be rendered as checked by default', () => {
      var el = fixture.debugElement.query(By.directive(ionic.IonToggle));
      expect(el.componentInstance.checked).not.toBeTruthy();
    });

    it('should be rendered as checked when checked is set to true', () => {
      component.checked = true;
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonToggle));
      expect(el.componentInstance.checked).toBeTruthy();
    });
  });

  describe('disabled', () => {
    it('should not be disabled by default', () => {
      expect(component.disabled).not.toBeTruthy();
    });

    it('should not be rendered as disabled by default', () => {
      var el = fixture.debugElement.query(By.directive(ionic.IonToggle));
      expect(el.componentInstance.disabled).not.toBeTruthy();
    });

    it('should be rendered as disabled when disabled is set to true', () => {
      component.disabled = true;
      fixture.detectChanges();
      var el = fixture.debugElement.query(By.directive(ionic.IonToggle));
      expect(el.componentInstance.disabled).toBeTruthy();
    });
  });
});
