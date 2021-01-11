import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';
import { DesignTokenHelper } from '../../helpers';

import { RadioComponent } from './radio.component';

const fatFingerSize = DesignTokenHelper.fatFingerSize();
const getColor = DesignTokenHelper.getColor;
const getElevation = DesignTokenHelper.getElevation;
const size = DesignTokenHelper.size;

describe('RadioComponent', () => {
  const createComponent = createComponentFactory({
    component: RadioComponent,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  let spectator: Spectator<RadioComponent>;
  let ionRadioElement: HTMLIonRadioElement;
  let radioIcon: HTMLElement;
  let radioCheckmark: HTMLElement;

  beforeEach(async () => {
    spectator = createComponent({ props: { text: 'test' } });
    ionRadioElement = spectator.query('ion-radio');
    await TestHelper.whenReady(ionRadioElement);
    radioIcon = ionRadioElement.shadowRoot.querySelector('[part=container]');
    radioCheckmark = ionRadioElement.shadowRoot.querySelector('[part=mark]');
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('by default', () => {
    it('should not be checked', () => {
      expect(ionRadioElement.classList.contains('radio-checked')).toBe(false);
    });

    it('should not be disabled', () => {
      expect(spectator.component.disabled).toBe(undefined);
    });

    it('should not have error', () => {
      expect(spectator.component.hasError).toBe(false);
    });
  });

  describe('when configured with', () => {
    describe('value', () => {
      it('should be bound to "value"-property of ion-radio', () => {
        const value = 'some random value';
        spectator.setInput('value', value);
        expect(ionRadioElement.value).toBe(value);
      });
    });

    describe('disabled', () => {
      it('should be bound to "disabled"-property of ion-radio', () => {
        const disabled = true;
        spectator.setInput('disabled', disabled);
        expect(ionRadioElement.disabled).toBe(disabled);
      });
    });
  });

  describe('presentation', () => {
    describe('by default', () => {
      it('should be that of material design (traditional round radio button) and not an iOS checkmark', () => {
        expect(ionRadioElement.mode).toBe('md');
      });

      it('should have correct icon size', () => {
        expectIconSize();
      });

      it('should have correct icon styling', () => {
        expect(radioIcon).toHaveComputedStyle({
          'border-width': '1px',
          'border-color': getColor('semi-dark'),
          'background-color': getColor('white'),
        });
      });

      it('should have minimum fat finger size', () => {
        expect(spectator.element).toHaveComputedStyle({
          height: `>=${fatFingerSize}`,
          width: `>=${fatFingerSize}`,
        });
      });
    });

    describe('when configured with size', () => {
      it(`should have correct size when size = 'xs'`, () => {
        spectator.setInput('size', 'xs');
        spectator.detectChanges();

        expectIconSize();
        expect(spectator.element).toHaveComputedStyle({
          height: size('l'),
        });
      });

      it(`should have correct size when size = 'sm'`, () => {
        spectator.setInput('size', 'sm');
        spectator.detectChanges();

        expectIconSize();
        expect(spectator.element).toHaveComputedStyle({
          height: fatFingerSize,
        });
      });

      it(`should have correct size when size = 'md'`, () => {
        spectator.setInput('size', 'md');
        spectator.detectChanges();

        expectIconSize();
        expect(spectator.element).toHaveComputedStyle({
          height: size('xxxl'),
        });
      });
    });

    describe('when state is', () => {
      describe('checked', () => {
        beforeEach(() => {
          ionRadioElement.classList.add('radio-checked');
        });

        it('should have correct icon styling', () => {
          expect(radioIcon).toHaveComputedStyle({
            'background-color': getColor('white'),
            'border-width': '0px',
            'box-shadow': getElevation(2),
          });
        });

        it('should have correct checkmark styling', () => {
          expect(radioCheckmark).toHaveComputedStyle({
            width: '12px',
            height: '12px',
            'background-color': getColor('success'),
          });
        });
      });

      describe('disabled', () => {
        beforeEach(async () => {
          spectator.setInput('disabled', true);
          spectator.detectChanges();
          await TestHelper.whenTrue(() => ionRadioElement.classList.contains('radio-disabled'));
        });

        it('should have correct icon styling', () => {
          expect(ionRadioElement).toHaveComputedStyle({
            opacity: '1',
          });
          expect(radioIcon).toHaveComputedStyle({
            'background-color': getColor('semi-light'),
            'border-width': '1px',
            'border-color': getColor('medium'),
            'box-shadow': 'none',
          });
        });

        it('should have correct checkmark styling', () => {
          expect(radioCheckmark).toHaveComputedStyle({
            'background-color': getColor('medium'),
          });
        });
      });

      describe('checked and disabled', () => {
        beforeEach(async () => {
          spectator.setInput('disabled', true);
          spectator.detectChanges();
          ionRadioElement.classList.add('radio-checked');
          await TestHelper.whenTrue(() => ionRadioElement.classList.contains('radio-disabled'));
        });

        it('should have correct icon styling', () => {
          expect(ionRadioElement).toHaveComputedStyle({
            opacity: '1',
          });
          expect(radioIcon).toHaveComputedStyle({
            'background-color': getColor('semi-light'),
            'border-width': '0px',
            'box-shadow': 'none',
          });
        });

        it('should have correct checkmark styling', () => {
          expect(radioCheckmark).toHaveComputedStyle({
            'background-color': getColor('medium'),
          });
        });
      });

      describe('error', () => {
        it('should have correct border style', () => {
          spectator.setInput('hasError', true);
          spectator.detectChanges();
          expect(radioIcon).toHaveComputedStyle({
            'border-width': '1px',
            'border-color': getColor('danger'),
          });
        });
      });
    });
  });

  function expectIconSize() {
    const radioIconOuterSize = size('m');
    const radioPadding = size('xxxxs');
    const radioIconInnerSize = `${parseInt(radioIconOuterSize) - parseInt(radioPadding) * 2}px`;

    expect(ionRadioElement).toHaveComputedStyle({
      width: radioIconOuterSize,
      height: radioIconOuterSize,
      padding: radioPadding,
    });
    expect(radioIcon).toHaveComputedStyle({
      width: radioIconInnerSize,
      height: radioIconInnerSize,
    });
  }
});
