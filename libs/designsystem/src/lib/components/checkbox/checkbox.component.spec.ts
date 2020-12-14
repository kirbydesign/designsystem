import { Spectator, createHostFactory } from '@ngneat/spectator';
import { IonCheckbox, IonicModule } from '@ionic/angular';

import { CheckboxComponent } from './checkbox.component';

fdescribe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>;

  const createHost = createHostFactory({
    component: CheckboxComponent,
    declarations: [IonCheckbox],
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-checkbox></kirby-checkbox>`);
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

      expect(spectator.query('ion-checkbox')).not.toHaveClass('multi');
    });

    it('should set class .multi on ion-checkbox when type is "multi"', () => {
      const type = 'multi';

      spectator.setInput('type', type);

      expect(spectator.query('ion-checkbox')).toHaveClass('multi');
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

    it('should set the [disabled] input on ion-checkbox to true', () => {
      const disabled = true;

      spectator.setInput('disabled', disabled);

      expect((spectator.query(IonCheckbox) as IonCheckbox).disabled).toBe(true);
    });

    it('should set the [disabled] input on ion-checkbox to false', () => {
      const disabled = false;

      spectator.setInput('disabled', disabled);

      expect((spectator.query(IonCheckbox) as IonCheckbox).disabled).toBe(false);
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
