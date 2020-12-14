import { Spectator, createHostFactory } from '@ngneat/spectator';
import { IonCheckbox } from '@ionic/angular';

import { CheckboxComponent } from './checkbox.component';

fdescribe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>;
  let checkbox: IonCheckbox;
  let checkboxElement: HTMLIonCheckboxElement;

  const createHost = createHostFactory({
    component: CheckboxComponent,
    declarations: [IonCheckbox],
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-checkbox></kirby-checkbox>`);
    checkbox = spectator.query(IonCheckbox);
    checkboxElement = spectator.query('ion-checkbox');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('event: checkedChange', () => {
    it('should emit true when checked', () => {
      const checked = true;

      spyOn(spectator.component.checkedChange, 'emit');
      spectator.component.onChecked(checked);

      expect(spectator.component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should emit false when unchecked', () => {
      const checked = false;

      spyOn(spectator.component.checkedChange, 'emit');
      spectator.component.onChecked(checked);

      expect(spectator.component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.checkedChange.emit).toHaveBeenCalledWith(false);
    });
  });

  describe('Input', () => {
    it('should not set class .multi on ion-checkbox when no type', () => {
      const type = 'single';

      spectator.setInput('type', type);

      expect(checkboxElement).not.toHaveClass('multi');
    });

    it('should set class .multi on ion-checkbox when type is "multi"', () => {
      const type = 'multi';

      spectator.setInput('type', type);

      expect(checkboxElement).toHaveClass('multi');
    });

    it('should set the [checked] input on ion-checkbox to true', () => {
      const checked = true;

      spectator.setInput('checked', checked);

      expect(checkbox.checked).toBe(true);
    });

    it('should set the [checked] input on ion-checkbox to false', () => {
      const checked = false;

      spectator.setInput('checked', checked);

      expect(checkbox.checked).toBe(false);
    });

    it('should set the [disabled] input on ion-checkbox to true', () => {
      const disabled = true;

      spectator.setInput('disabled', disabled);

      expect(checkbox.disabled).toBe(true);
    });

    it('should set the [disabled] input on ion-checkbox to false', () => {
      const disabled = false;

      spectator.setInput('disabled', disabled);

      expect(checkbox.disabled).toBe(false);
    });

    it('should have error class when [hasError] input is true', () => {
      const hasError = true;

      spectator.setInput('hasError', hasError);
      spectator.detectChanges();

      expect(spectator.element).toHaveClass('error');
    });

    it('should not have error class when [hasError] input is false', () => {
      const hasError = false;

      spectator.setInput('hasError', hasError);
      spectator.detectChanges();

      expect(spectator.element).not.toHaveClass('error');
    });
  });
});
