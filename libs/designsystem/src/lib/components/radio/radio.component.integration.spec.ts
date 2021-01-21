import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonRadio, IonItem } from '@ionic/angular';
import { MockComponents } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers';
import { ItemComponent } from '../item';
import { RadioComponent } from './radio.component';

const size = DesignTokenHelper.size;

describe('RadioComponent in Item', () => {
  let spectator: SpectatorHost<RadioComponent>;
  let ionRadio: HTMLIonRadioElement;

  const createHost = createHostFactory({
    component: RadioComponent,
    declarations: MockComponents(ItemComponent, IonItem, IonRadio),
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`
    <kirby-item>
      <kirby-radio></kirby-radio>
    </kirby-item>`);
      ionRadio = spectator.query('ion-radio');
    });

    it(`icon should not have any margin`, () => {
      expect(ionRadio).toHaveComputedStyle({
        margin: '0px',
      });
    });

    it(`should have z-index`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'z-index': '1',
      });
    });
  });

  describe('slotted start', () => {
    beforeEach(() => {
      spectator = createHost(`
    <kirby-item>
      <kirby-radio slot="start"></kirby-radio>
    </kirby-item>`);
    });

    it(`should have correct vertical spacing`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'margin-inline-end': size('xs'),
      });
    });
  });
});
