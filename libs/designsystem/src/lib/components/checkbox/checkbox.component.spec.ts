import { Spectator, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import { CheckboxComponent } from './checkbox.component';
import { DesignTokenHelper } from '../../helpers';

const getColor = DesignTokenHelper.getColor;
const getTextColor = DesignTokenHelper.getTextColor;

describe('CheckboxComponent', () => {
  let spectator: Spectator<CheckboxComponent>;
  let ionCheckbox: HTMLIonCheckboxElement;

  const createHost = createHostFactory({
    component: CheckboxComponent,
    imports: [IonicModule.forRoot({ _testing: true })],
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-checkbox></kirby-checkbox>`);
    ionCheckbox = spectator.query('ion-checkbox');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('by default', () => {
    it('should have attention level 2', () => {
      expect(spectator.component.attentionLevel).toBe('2');
      expect(spectator.element).toHaveClass('attention-level2');
    });

    it('should have correct icon styling', () => {
      expect(ionCheckbox).toHaveComputedStyle({
        '--checkmark-color': getColor('white'),
        '--background-checked': getColor('black'),
        '--border-color-checked': getColor('black'),
      });
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
    it('should have correct icon styling when attentionLevel is 1', () => {
      spectator.setInput('attentionLevel', '1');
      spectator.detectChanges();
      expect(ionCheckbox).toHaveComputedStyle({
        '--checkmark-color': getColor('black'),
        '--background-checked': getColor('success'),
        '--border-color-checked': getColor('success'),
      });
    });

    it('should set the [checked] input on ion-checkbox', () => {
      spectator.setInput('checked', true);
      expect(ionCheckbox.checked).toBe(true);

      spectator.setInput('checked', false);
      expect(ionCheckbox.checked).toBe(false);
    });

    describe('when disabled', () => {
      it('should set the [disabled] input on ion-checkbox', () => {
        spectator.setInput('disabled', true);
        expect(ionCheckbox.disabled).toBe(true);

        spectator.setInput('disabled', false);
        expect(ionCheckbox.disabled).toBe(false);
      });

      it('should have correct text styling', () => {
        spectator.setInput('disabled', true);
        spectator.detectChanges();
        expect(spectator.element).toHaveComputedStyle({
          color: getTextColor('semi-dark'),
        });
      });

      it('should have correct icon styling', () => {
        spectator.setInput('disabled', true);
        spectator.detectChanges();
        expect(ionCheckbox).toHaveComputedStyle({
          '--checkmark-color': getColor('semi-dark'),
          '--background': getColor('semi-light'),
          '--background-checked': getColor('semi-light'),
          '--border-color': getColor('medium'),
          '--border-color-checked': getColor('semi-light'),
        });
      });
    });

    it('should have correct icon styling when checkbox has error', () => {
      spectator.setInput('hasError', true);
      spectator.detectChanges();
      expect(ionCheckbox).toHaveComputedStyle({
        '--border-color': getColor('danger'),
      });
    });

    it('should have the text when [text] input is set', () => {
      spectator.setInput('text', 'test');
      expect(spectator.element).toHaveText('test');
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
