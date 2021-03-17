import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers';
import { TestHelper } from '../../testing/test-helper';

import { CheckboxComponent } from './checkbox.component';

const size = DesignTokenHelper.size;
const getColor = DesignTokenHelper.getColor;
const getTextColor = DesignTokenHelper.getTextColor;
const fatFingerSize = DesignTokenHelper.fatFingerSize();
const checkboxIconSize = size('m');
const checkboxSizeXs = size('l');
const checkboxSizeSm = fatFingerSize;
const checkboxSizeMd = size('xxxl');

describe('CheckboxComponent', () => {
  const createComponent = createComponentFactory({
    component: CheckboxComponent,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  let spectator: Spectator<CheckboxComponent>;
  let ionCheckbox: HTMLIonCheckboxElement;
  let label: HTMLSpanElement;

  beforeEach(async () => {
    spectator = createComponent({ props: { text: 'test' } });
    ionCheckbox = spectator.query('ion-checkbox');
    await TestHelper.whenReady(ionCheckbox);
    label = spectator.query('span');
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
        '--size': checkboxIconSize,
        '--checkmark-color': getColor('white'),
        '--background-checked': getColor('black'),
        '--border-color-checked': getColor('black'),
      });
    });

    it('should have correct vertical spacing', () => {
      expect(ionCheckbox).toHaveComputedStyle({
        'margin-left': size('s'),
        'margin-right': size('xs'),
      });
    });

    it('should have minimum fat finger size', () => {
      expect(spectator.element).toHaveComputedStyle({
        height: `>=${fatFingerSize}`,
        width: `>=${fatFingerSize}`,
      });
    });

    it('should have have correct label font-size ', () => {
      expect(label).toHaveComputedStyle({ 'font-size': '16px' });
    });

    it('should have have correct label line-height', () => {
      expect(label).toHaveComputedStyle({ 'line-height': '24px' });
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

    describe('with size', () => {
      it(`should have 'md' size by default`, () => {
        expect(spectator.element).toHaveComputedStyle({
          height: checkboxSizeMd,
        });
      });

      it(`should have correct size when size = 'xs'`, () => {
        spectator.setInput('size', 'xs');
        spectator.detectChanges();

        expect(spectator.element).toHaveComputedStyle({
          height: checkboxSizeXs,
        });
      });

      it(`should have correct size when size = 'sm'`, () => {
        spectator.setInput('size', 'sm');
        spectator.detectChanges();

        expect(spectator.element).toHaveComputedStyle({
          height: checkboxSizeSm,
        });
      });

      it(`should have correct size when size = 'md'`, () => {
        spectator.setInput('size', 'md');
        spectator.detectChanges();

        expect(spectator.element).toHaveComputedStyle({
          height: checkboxSizeMd,
        });
      });
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
