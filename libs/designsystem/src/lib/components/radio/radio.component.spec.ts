import { IonicModule } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { TestHelper } from '../../testing/test-helper';
import { DesignTokenHelper } from '../../helpers';

import { RadioComponent } from './radio.component';

const getColor = DesignTokenHelper.getColor;
const getElevation = DesignTokenHelper.getElevation;

describe('RadioComponent', () => {
  const createComponent = createComponentFactory({
    component: RadioComponent,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  let spectator: Spectator<RadioComponent>;
  let component: RadioComponent;
  let ionRadioElement: HTMLIonRadioElement;
  let radioIcon: HTMLElement;
  let radioCheckmark: HTMLElement;

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    ionRadioElement = spectator.query('ion-radio');
    await TestHelper.whenReady(ionRadioElement);
    radioIcon = ionRadioElement.shadowRoot.querySelector('[part=container]');
    radioCheckmark = ionRadioElement.shadowRoot.querySelector('[part=mark]');
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('input property', () => {
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
    it('should be that of material design (traditional round radio button) and not an iOS checkmark', () => {
      expect(ionRadioElement.mode).toBe('md');
    });

    it('should have correct size', () => {
      expect(ionRadioElement).toHaveComputedStyle({ width: '44px', height: '44px' });
      expect(radioIcon).toHaveComputedStyle({ width: '20px', height: '20px' });
    });

    it('should have correct border style', () => {
      expect(radioIcon).toHaveComputedStyle({
        'border-width': '1px',
        'border-color': getColor('semi-dark'),
      });
    });

    it('should have correct background color', () => {
      expect(radioIcon).toHaveComputedStyle({
        'background-color': getColor('white'),
      });
    });

    describe('when selected', () => {
      beforeEach(() => {
        ionRadioElement.classList.add('radio-checked');
      });

      it('should not have any border', () => {
        expect(radioIcon).toHaveComputedStyle({
          'border-width': '0px',
        });
      });

      it('should have correct background color', () => {
        expect(radioIcon).toHaveComputedStyle({
          'background-color': getColor('white'),
        });
      });

      it('should have correct elevation', () => {
        expect(radioIcon).toHaveComputedStyle({
          'box-shadow': getElevation(2),
        });
      });

      it('should have correct checkmark styling', () => {
        expect(radioCheckmark).toHaveComputedStyle({
          width: '12px',
          height: '12px',
        });
      });

      it('should have correct elevation + color + no border', () => {
        expect(ionRadioElement).toHaveComputedStyle({ width: '44px', height: '44px' });
      });
    });
  });
});
