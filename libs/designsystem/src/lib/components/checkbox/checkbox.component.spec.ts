import { Spectator, createHostFactory } from '@ngneat/spectator';
import { IonCheckbox } from '@ionic/angular';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>;
  let checkbox: IonCheckbox;

  const createHost = createHostFactory({
    component: CheckboxComponent,
    declarations: [IonCheckbox],
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-checkbox></kirby-checkbox>`);
    checkbox = spectator.query(IonCheckbox);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('by default', () => {
    it('should have attention level 2', () => {
      expect(spectator.component.attentionLevel).toBe('2');
      expect(spectator.element).toHaveClass('attention-level2');
    });

    it('should not be checked', () => {
      expect(spectator.component.checked).toBe(false);
    });

    it('should not be disabled', () => {
      expect(spectator.component.disabled).toBe(false);
    });

    it('should not have error', () => {
      expect(spectator.component.hasError).toBe(false);
    });
  });

  describe('when configured', () => {
    it('should have class .attention-level1 when attentionLevel is 1', () => {
      spectator.setInput('attentionLevel', '1');
      spectator.detectChanges();

      expect(spectator.element).toHaveClass('attention-level1');
    });

    it('should set the [checked] input on ion-checkbox to true', () => {
      spectator.setInput('checked', true);

      expect(checkbox.checked).toBe(true);
    });

    it('should set the [checked] input on ion-checkbox to false', () => {
      spectator.setInput('checked', false);

      expect(checkbox.checked).toBe(false);
    });

    it('should set the [disabled] input on ion-checkbox to true', () => {
      spectator.setInput('disabled', true);

      expect(checkbox.disabled).toBe(true);
    });

    it('should set the [disabled] input on ion-checkbox to false', () => {
      spectator.setInput('disabled', false);

      expect(checkbox.disabled).toBe(false);
    });

    it('should have error class when [hasError] input is true', () => {
      spectator.setInput('hasError', true);
      spectator.detectChanges();

      expect(spectator.element).toHaveClass('error');
    });

    it('should not have error class when [hasError] input is false', () => {
      spectator.setInput('hasError', false);
      spectator.detectChanges();

      expect(spectator.element).not.toHaveClass('error');
    });
  });

  describe('when checking checkbox', () => {
    it('should emit true with event checkedChange when checked', () => {
      spyOn(spectator.component.checkedChange, 'emit');
      spectator.component.onChecked(true);

      expect(spectator.component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.checkedChange.emit).toHaveBeenCalledWith(true);
    });

    it('should emit false with event checkedChange when unchecked', () => {
      spyOn(spectator.component.checkedChange, 'emit');
      spectator.component.onChecked(false);

      expect(spectator.component.checkedChange.emit).toHaveBeenCalledTimes(1);
      expect(spectator.component.checkedChange.emit).toHaveBeenCalledWith(false);
    });
  });
});
