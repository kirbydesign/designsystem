/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';
import { Spectator, createTestComponentFactory } from '@netbasal/spectator';

describe('CheckboxComponent', () => {
  const checked = true;
  const shape = 'square';
  const color = 'primary';

  let spectator: Spectator<CheckboxComponent>;
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  const createHost = createTestComponentFactory({
    component: CheckboxComponent,
    declarations: [MockComponent(ionic.IonCheckbox)]
  });

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [CheckboxComponent, MockComponent(ionic.IonCheckbox)],
  //   }).compileComponents();
  // }));

  beforeEach(() => {
    spectator = createHost({ checked, shape, color });
    // fixture = TestBed.createComponent(CheckboxComponent);
    // component = fixture.componentInstance;
  });

  it('should create', () => {
    // component.shape = 'square';
    // component.ngOnChanges({
    //   shape: new SimpleChange(null, component.shape, true),
    // });
    expect(spectator.component).toBeTruthy();
  });

  describe('function: onChecked', () => {
    it('should emit true', () => {
      spyOn(spectator.component.checkedChange, 'emit');
      const change = { value: true };

      spectator.component.onChecked(change);

      expect(spectator.component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.checkedChange.emit).toHaveBeenCalledWith(true);
    });
  });

  describe('DOM: render templates', () => {
    it('should find the ion-checkbox element based on css class .square', () => {
      spectator.setInput('shape', 'square');

      expect(spectator.query('ion-checkbox')).toHaveClass('square');
    });

    it('should find the ion-checkbox element based on css class .circle', () => {
      spectator.setInput('shape', 'circle');

      expect(spectator.query('ion-checkbox')).toHaveClass('circle');
    });
  });
});
