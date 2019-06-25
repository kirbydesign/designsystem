import { Spectator, createTestComponentFactory } from '@netbasal/spectator';
import { IonCheckbox } from '@ionic/angular';

import { MockComponent } from 'ng-mocks';
import * as ionic from '@ionic/angular';
import { SimpleChange } from '@angular/core';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  const checked = true;
  const shape = 'square';
  const color = 'primary';

  let spectator: Spectator<CheckboxComponent>;

  const createHost = createTestComponentFactory({
    component: CheckboxComponent,
    declarations: [MockComponent(ionic.IonCheckbox)],
  });

  beforeEach(() => {
    spectator = createHost({ checked, shape, color });
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('event: checkedChange', () => {
    it('should emit true', () => {
      spyOn(spectator.component.checkedChange, 'emit');
      const change = true;

      spectator.component.onChecked(change);

      expect(spectator.component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should emit false', () => {
      spyOn(spectator.component.checkedChange, 'emit');
      const change = false;

      spectator.component.onChecked(change);

      expect(spectator.component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.checkedChange.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('Inputs', () => {
    it('should bind the class .square to ion-checkbox', () => {
      const squareShape = 'square';
      spectator.component.ngOnChanges({
        shape: new SimpleChange(null, squareShape, false),
      });

      spectator.setInput('shape', squareShape);

      expect(spectator.query('ion-checkbox')).toHaveClass('square');
      expect(spectator.query('ion-checkbox')).not.toHaveClass('circle');
    });

    it('should bind the class .circle to ion-checkbox', () => {
      const circleShape = 'circle';
      spectator.component.ngOnChanges({
        shape: new SimpleChange(null, circleShape, false),
      });

      spectator.setInput('shape', circleShape);

      expect(spectator.query('ion-checkbox')).toHaveClass('circle');
      expect(spectator.query('ion-checkbox')).not.toHaveClass('square');
    });

    it('should bind the class .primary to ion-checkbox', () => {
      const color = 'primary';
      spectator.component.ngOnChanges({
        color: new SimpleChange(null, color, false),
      });

      spectator.setInput('color', color);

      expect(spectator.query('ion-checkbox')).toHaveClass('primary');
      expect(spectator.query('ion-checkbox')).not.toHaveClass('secondary');
    });

    it('should set the [checked] input on ion-checkbox to true', () => {
      const checked = true;

      spectator.setInput('checked', checked);

      expect((spectator.query(IonCheckbox) as IonCheckbox).checked).toBe(true);
    });

    it('should set the [checked] input on ion-checkbox to false', () => {
      const checked = false;

      spectator.setInput('checked', checked);

      expect((spectator.query(IonCheckbox) as IonCheckbox).checked).toBe(false);
    });
  });
});
