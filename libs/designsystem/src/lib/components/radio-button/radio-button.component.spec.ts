import { IonicModule, IonRadio } from '@ionic/angular';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { RadioButtonComponent } from './radio-button.component';
import { TestHelper } from '../../testing/test-helper';

describe('RadioButtonComponent', () => {
  const createComponent = createComponentFactory({
    component: RadioButtonComponent,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  let spectator: Spectator<RadioButtonComponent>;
  let component: RadioButtonComponent;
  let ionRadio: IonRadio;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    ionRadio = spectator.query(IonRadio);
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('input property', () => {
    describe('value', () => {
      it('should be bound to "value"-property of ion-radio', () => {
        const value = 'some random value';
        spectator.setInput('value', value);
        expect(ionRadio.value).toBe(value);
      });
    });

    describe('disabled', () => {
      it('should be bound to "disabled"-property of ion-radio', () => {
        const disabled = true;
        spectator.setInput('disabled', disabled);
        expect(ionRadio.disabled).toBe(disabled);
      });
    });
  });

  describe('event', () => {
    describe('focusChange', () => {
      it('should be emitted as true (focused) when ionRadio emits ionFocus-event', () => {
        spyOn(component.focusChange, 'emit');
        spectator.dispatchFakeEvent('ion-radio', 'ionFocus');
        expect(component.focusChange.emit).toHaveBeenCalledWith(true);
      });

      it('should be emitted as false (blurred) when ionRadio emits ionBlur-event', () => {
        spyOn(component.focusChange, 'emit');
        spectator.dispatchFakeEvent('ion-radio', 'ionBlur');
        expect(component.focusChange.emit).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('presentation', () => {
    it('should be that of material design (traditional radio button) and not an iOS checkmark', () => {
      expect(ionRadio.mode).toBe('md');
    });

    it('should be 44px x 44px', () => {
      expect(spectator.element).toHaveComputedStyle({ width: '44px', height: '44px' });
    });
  });

  describe('interaction', () => {
    it('should delegate click events to the ion-radio element', async () => {
      const ionRadioElement = spectator.query<HTMLElement>('ion-radio');
      await TestHelper.whenHydrated(ionRadioElement);

      spyOn(ionRadioElement, 'click');
      spectator.click();
      expect(ionRadioElement.click).toHaveBeenCalled();
    });
  });
});
