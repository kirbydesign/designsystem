/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, MockComponent(ionic.IonCheckbox)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('function: onChecked', () => {
    it('should emit true', () => {
      spyOn(component.checkedChange, 'emit');
      const change = { value: true };

      component.onChecked(change);

      expect(component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('DOM: render templates', () => {
    it('should find the ion-checkbox element based on css class .square', () => {
      component.shape = 'square';
      component.ngOnChanges({
        shape: new SimpleChange(null, component.shape, true),
      });
      fixture.detectChanges();
      const checkboxDe: DebugElement = fixture.debugElement;
      const ionCheckboxDe = checkboxDe.query(By.css('.square'));
      const ionCheckbox: HTMLElement = ionCheckboxDe.nativeElement;
      expect(ionCheckbox).not.toBe(null);
    });

    it('should find the ion-checkbox element based on css class .circle', () => {
      component.shape = 'circle';
      component.ngOnChanges({
        shape: new SimpleChange(null, component.shape, true),
      });
      fixture.detectChanges();
      const checkboxDe: DebugElement = fixture.debugElement;
      const ionCheckboxDe = checkboxDe.query(By.css('.circle'));
      const ionCheckbox: HTMLElement = ionCheckboxDe.nativeElement;
      expect(ionCheckbox).not.toBe(null);
    });
  });
});
